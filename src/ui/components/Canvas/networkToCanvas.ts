import { actorImage } from '../../../config/actorImage';
import { Actor } from '../../../model/definition/Actor/Actor';
import { StateDesc } from '../../../model/description/State/StateDesc';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { StepDesc } from '../../../model/description/Step/StepDesc';
import { pointsOnCircleEquidistant, pointsOnCircleFixedRangeCentered } from '../../../util/circle';
import { scaleQuadraticBezierCurve } from '../../../util/curve';
import { add, avg, eq, fractionOfLine, fractionOfQuadBezier, scale, Vec } from '../../../util/vec';
import { ActorEl } from './data/ActorEl';
import { AssetEl } from './data/AssetEl';
import { CanvasElem } from './data/CanvasElem';
import { ConnectionEl } from './data/ConnectionEl';
import { PseudonymEl } from './data/PseudonymEl';
import { SlotEl } from './data/SlotEl';

interface NetworkProps {
    width: number;
    height: number;
    actors: Actor[];
    modes: Record<string, string | undefined>;
    state: StateDesc;
    step?: StepDesc;
    selectedActorId?: string;
    selectedAssetId?: string;
    hoveredElemId?: string;
}

function getActorImage(actor: Actor, mode?: string) {
    if (mode && actor.modeImages && actor.modeImages[mode]) return actor.modeImages[mode];
    else return actor.image;
}

const config = {
    /** Angle of the first actor's position, relative to the canvas center (0: starting East, -Pi/2: starting North) */
    networkRotation: -Math.PI / 2,

    /** The relative size of the actor circle (on which actors are positioned) (1: equal to the canvas width) */
    relativeSlotRingSize: 0.6,

    /** The radius of an actor slot */
    slotRadius: 50,

    /** The radius of a pseudonym shape */
    pseudonymRadius: 50,

    /** The radius of an asset shape */
    assetRadius: 20,

    /** The radius of the circle of assets around the actor slot */
    assetRingRadius: 80,

    /** The angle between asset shapes, around the actor shape */
    radialAssetSpacing: Math.PI / 6,

    /** To what extent the edges bend towards the center (0: straight line, 1: curved towards center) */
    connectionCurveFraction: 0.5,

    /** When actors move towards each other, they move this fraction of the way (0: no movement, 1: the other actor) */
    fractionActorMovesToOther: 0.7,

    /** The relative position of the pseudonym shape on the interaction-edge */
    relativePseudonymPosition: 0.25,
};

export function createNetworkCanvasData(props: NetworkProps): CanvasElem[] {
    const { width, height, actors } = props;

    const center: Vec = [width / 2, height / 2];

    const numberOfSlots = actors.length;

    const interaction: InteractionViewData = {
        action: props.step?.action,
        fromIndex: !!props.step ? actors.findIndex((a) => a.id === props.step!.action.from.id) : -1,
        toIndex: !!props.step ? actors.findIndex((a) => a.id === props.step!.action.to.id) : -1,
    };

    const actorData = makeActorViewData({ actors, center, width, numberOfSlots, interaction, props });
    const nyms = makePseudonyms({ interaction, actors: actorData, center, props });
    const slots = makeActorSlots(actorData);
    const actorEls = makeActorEls(actorData);
    const conns = makeConnectionsBetweenSlots({ interaction, slots, center });
    const assets = makeAssets({ actors: actorData, numberOfSlots, props });

    // Combine all elems
    const elems: CanvasElem[] = [...conns, ...slots, ...actorEls, ...assets, ...nyms];

    return elems.map((e) => (e.id === props.hoveredElemId ? { ...e, hovered: true } : e));
}

/** A contextually meaningful description of an actor */
interface ActorViewData {
    actor: Actor;
    selected: boolean;
    involvedInStep: boolean;
    isHome: boolean;
    normalUrl: string;
    activeModeUrl: string;
    homePosition: Vec;
    position: Vec;
}

/** A contextually meaningful description of an actor */
interface InteractionViewData {
    action: ActionDesc | undefined;
    fromIndex: number;
    toIndex: number;
}

/** When actors interact locally, we move one or both towards the other */
function computeInteractingActorsLocation(
    frm: Vec,
    to: Vec,
    locality: Locality,
    fractionActorMovesToOther: number,
): [Vec, Vec] {
    const ctr = avg(frm, to);
    const locs: Record<Locality, [Vec, Vec]> = {
        [Locality.AT_CENTER]: [
            fractionOfLine(frm, ctr, fractionActorMovesToOther),
            fractionOfLine(to, ctr, fractionActorMovesToOther),
        ],
        [Locality.AT_FROM]: [frm, fractionOfLine(to, frm, fractionActorMovesToOther)],
        [Locality.AT_TO]: [fractionOfLine(frm, to, fractionActorMovesToOther), to],
        [Locality.REMOTE]: [frm, to],
    };
    return locs[locality];
}

function actorBasePositions(props: { center: Vec; ringRadius: number; numberOfSlots: number; startAtRad: number }) {
    const actorHomePosUnit = pointsOnCircleEquidistant(props.numberOfSlots, props.startAtRad);
    return actorHomePosUnit.map((p) => add(props.center, scale(props.ringRadius)(p)));
}

function makeActorSlots(actorData: ActorViewData[]) {
    return actorData.map(function makeActorSlot(actor: ActorViewData, i: number): SlotEl {
        return {
            type: 'slot',
            id: actor.actor.id + '-slot',
            selected: actor.selected,
            involvedInStep: actor.involvedInStep,
            c: actor.homePosition,
            r: config.slotRadius,
            showImage: !actor.isHome,
            url: actorImage(actor.normalUrl),
        };
    });
}

function makeActorEls(actorData: ActorViewData[]) {
    return actorData.map(function makeActorEl(actor: ActorViewData, i: number): ActorEl {
        return {
            type: 'actor',
            id: actor.actor.id,
            selected: actor.selected,
            involvedInStep: actor.involvedInStep,
            c: actor.position,
            r: config.slotRadius,
            url: actorImage(actor.activeModeUrl),
        };
    });
}

function makeConnectionsBetweenSlots(p: {
    interaction: InteractionViewData;
    center: Vec;
    slots: SlotEl[];
}): ConnectionEl[] {
    const locality = !!p.interaction.action ? p.interaction.action.locality : Locality.REMOTE;

    return p.slots.reduce(
        (acc, slot1, i) => [
            ...acc,
            ...p.slots.reduce(
                (acc2, slot2, j): ConnectionEl[] =>
                    i >= j
                        ? []
                        : [
                              ...acc2,
                              {
                                  type: 'connection',
                                  id: `conn-${i}-${j}`,
                                  from: slot1.c,
                                  to: slot2.c,
                                  q: scaleQuadraticBezierCurve(
                                      slot1.c,
                                      p.center,
                                      slot2.c,
                                      config.connectionCurveFraction,
                                  ),
                                  lit: false,
                                  // Only show connection when interacting remotely
                                  involvedInStep:
                                      slot1.involvedInStep && slot2.involvedInStep && locality === Locality.REMOTE,
                              },
                          ],
                [],
            ),
        ],
        [],
    );
}

function makeAssets(p: { actors: ActorViewData[]; numberOfSlots: number; props: NetworkProps }) {
    return p.actors.reduce((all, actorV, actorIndex): AssetEl[] => {
        const actor = actorV.actor;
        const assets = p.props.state.actors[actor.id].assetTrees;
        const numAssets = assets.length;

        const actorCenter = p.actors[actorIndex].homePosition;
        const actorAngle = config.networkRotation + ((2 * Math.PI) / p.numberOfSlots) * actorIndex; // center the range
        const spaceInRad = config.radialAssetSpacing;
        const assetPositionsUnit = pointsOnCircleFixedRangeCentered(numAssets, actorAngle, spaceInRad);
        const assetPositionsAbs = assetPositionsUnit.map((p) => add(actorCenter, scale(config.assetRingRadius)(p)));
        const assetsEls = assets.map(
            (a, assetIndex): AssetEl => ({
                type: 'asset',
                active: false,
                selected: a.asset.id === p.props.selectedAssetId,
                hovered: a.asset.id === p.props.hoveredElemId,
                c: assetPositionsAbs[assetIndex],
                // id: `asset-${actorIndex}-${assetIndex}`, // todo fixme
                id: a.asset.id,
                lit: false,
                r: config.assetRadius,
                url: a.asset.iconUrl || '',
                numberOfChildren: a.children.length,
                image: a.asset.image,
            }),
        );

        return [...all, ...assetsEls];
    }, []);
}

function makeActorViewData(p: {
    actors: Actor[];
    center: Vec;
    width: number;
    numberOfSlots: number;
    interaction: InteractionViewData;
    props: NetworkProps;
}): ActorViewData[] {
    const actorHomePos = actorBasePositions({
        center: p.center,
        ringRadius: (p.width / 2) * config.relativeSlotRingSize,
        numberOfSlots: p.numberOfSlots,
        startAtRad: config.networkRotation,
    });

    // Compute the actor's positions
    const actorPos = actorHomePos.slice();

    if (!!p.interaction.action) {
        // Move actors that interact locally

        const [fromPos, toPos] = computeInteractingActorsLocation(
            actorHomePos[p.interaction.fromIndex],
            actorHomePos[p.interaction.toIndex],
            p.interaction.action.locality,
            config.fractionActorMovesToOther,
        );
        actorPos[p.interaction.fromIndex] = fromPos;
        actorPos[p.interaction.toIndex] = toPos;
    }

    return p.actors.map(
        (actor, i): ActorViewData => ({
            actor,
            selected: actor.id === p.props.selectedActorId,
            involvedInStep: i === p.interaction.fromIndex || i === p.interaction.toIndex,
            isHome: eq(actorHomePos[i], actorPos[i]),
            normalUrl: getActorImage(actor),
            activeModeUrl: getActorImage(actor, p.props.modes[p.actors[i].id]),
            homePosition: actorHomePos[i],
            position: actorPos[i],
        }),
    );
}

function makePseudonyms(p: {
    interaction: InteractionViewData;
    actors: ActorViewData[];
    center: Vec;
    props: NetworkProps;
}): PseudonymEl[] {
    const _nyms: PseudonymEl[] = [];

    const { action, fromIndex, toIndex } = p.interaction;

    // Compute the pseudonyms
    if (!!action) {
        // Move actors that interact locally
        const p0 = p.actors[fromIndex].homePosition;
        const p2 = p.actors[toIndex].homePosition;
        const q = scaleQuadraticBezierCurve(p0, p.center, p2, config.connectionCurveFraction);
        const sourceNymPos = fractionOfQuadBezier(p0, q, p2, config.relativePseudonymPosition);
        const targetNymPos = fractionOfQuadBezier(p0, q, p2, 1 - config.relativePseudonymPosition);

        if (action.from_nym) {
            const asset = p.props.state.assets[action.from_nym].asset;
            _nyms.push({
                c: sourceNymPos,
                id: p.actors[fromIndex].actor.id + '-nym',
                r: config.pseudonymRadius,
                type: 'pseudonym',
                image: asset.image,
            });
        }
        if (action.to_nym) {
            const asset = p.props.state.assets[action.to_nym].asset;
            _nyms.push({
                c: targetNymPos,
                id: p.actors[toIndex].actor.id + '-nym',
                r: config.pseudonymRadius,
                type: 'pseudonym',
                image: asset.image,
            });
        }
    }
    return _nyms;
}
