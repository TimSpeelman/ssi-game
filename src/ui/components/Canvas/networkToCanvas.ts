import { ActorDesc } from '../../../model/description/Actor/ActorDesc';
import { ImageOrIconDefinition } from '../../../model/description/ImageOrIconDefinition';
import { StateDesc } from '../../../model/description/State/StateDesc';
import { ActionDesc, Locality } from '../../../model/description/Step/ActionDesc';
import { StepDesc } from '../../../model/description/Step/StepDesc';
import { pointsOnCircleEquidistant, pointsOnCircleFixedRangeCentered } from '../../../util/circle';
import { scaleQuadraticBezierCurve } from '../../../util/curve';
import { add, avg, eq, fractionOfLine, fractionOfQuadBezier, scale, Vec } from '../../../util/vec';
import { w1th } from '../../../util/w1th';
import { ActorEl } from './data/ActorEl';
import { AssetEl } from './data/AssetEl';
import { CanvasElem } from './data/CanvasElem';
import { ConnectionEl } from './data/ConnectionEl';
import { PseudonymEl } from './data/PseudonymEl';
import { SlotEl } from './data/SlotEl';

interface NetworkProps {
    width: number;
    height: number;
    actors: ActorDesc[];
    modes: Record<string, string | undefined>;
    state: StateDesc;
    step?: StepDesc;
    selectedActorId?: string;
    selectedAssetId?: string;
    hoveredElemId?: string;
}

const config = {
    /** Angle of the first actor's position, relative to the canvas center (0: starting East, -Pi/2: starting North) */
    networkRotation: -Math.PI / 2,

    /** The relative size of the actor circle (on which actors are positioned) (1: equal to the canvas width) */
    relativeSlotRingSize: 0.6,

    /** The radius of an actor slot */
    slotRadius: 50,

    /** The radius of a pseudonym shape */
    pseudonymRadius: 20,

    /** The radius of an asset shape */
    assetRadius: 20,

    /** The radius of the circle of assets around the actor slot */
    assetRingRadius: 80,

    /** The angle between asset shapes, around the actor shape */
    radialAssetSpacing: (Math.PI / 6) * 1.2,

    /** To what extent the edges bend towards the center (0: straight line, 1: curved towards center) */
    connectionCurveFraction: 0.5,

    /** When actors move towards each other, they move this fraction of the way (0: no movement, 1: the other actor) */
    fractionActorMovesToOther: 0.7,

    /** The relative position of the pseudonym shape on the interaction-edge */
    relativePseudonymPosition: 0.25,
};

export function createNetworkCanvasData(props: NetworkProps): CanvasElem[] {
    const { actors } = props;

    const numberOfSlots = actors.length;

    // In cases with 3 slots, we move the center slightly down
    const center: Vec =
        numberOfSlots === 3 ? [props.width / 2, props.height * 0.55] : [props.width / 2, props.height / 2];
    const interactionData = makeInteractionViewData(props);
    const actorData = makeActorViewData({ actors, center, numberOfSlots, interactionData, props });

    const pseudonymEls = makePseudonymEls({ interactionData, actorData, center, props });
    const slotEls = makeSlotEls({ actorData });
    const actorEls = makeActorEls({ actorData });
    const connectionEls = makeConnectionEls({ interactionData, slotEls, center });
    const assetEls = makeAssetEls({ actorData, numberOfSlots, props });

    // Combine all elems
    const elems: CanvasElem[] = [...connectionEls, ...slotEls, ...actorEls, ...assetEls, ...pseudonymEls];

    return elems.map((e) => (e.id === props.hoveredElemId ? { ...e, hovered: true } : e));
}

/** A contextually meaningful description of an actor */
interface ActorViewData {
    actor: ActorDesc;
    selected: boolean;
    involvedInStep: boolean;
    isHome: boolean;
    normalImage: ImageOrIconDefinition;
    activeModeImage: ImageOrIconDefinition;
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

function makeInteractionViewData(props: NetworkProps): InteractionViewData {
    return {
        action: props.step?.action,
        fromIndex: !!props.step ? props.actors.findIndex((a) => a.id === props.step!.action.from.id) : -1,
        toIndex: !!props.step ? props.actors.findIndex((a) => a.id === props.step!.action.to.id) : -1,
    };
}

function makeSlotEls(p: { actorData: ActorViewData[] }) {
    return p.actorData.map(function makeActorSlot(actor: ActorViewData, i: number): SlotEl {
        return {
            type: 'slot',
            id: actor.actor.id + '-slot',
            selected: actor.selected,
            involvedInStep: actor.involvedInStep,
            c: actor.homePosition,
            r: config.slotRadius,
            showImage: !actor.isHome,
            image: actor.normalImage,
        };
    });
}

function makeActorEls(p: { actorData: ActorViewData[] }) {
    return p.actorData.map(function makeActorEl(actor: ActorViewData, i: number): ActorEl {
        return {
            type: 'actor',
            id: actor.actor.id,
            selected: actor.selected,
            involvedInStep: actor.involvedInStep,
            c: actor.position,
            r: config.slotRadius,
            image: actor.activeModeImage,
        };
    });
}

function makeConnectionEls(p: {
    interactionData: InteractionViewData;
    center: Vec;
    slotEls: SlotEl[];
}): ConnectionEl[] {
    const locality = !!p.interactionData.action ? p.interactionData.action.locality : Locality.REMOTE;

    return p.slotEls.reduce(
        (acc, slot1, i) => [
            ...acc,
            ...p.slotEls.reduce(
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

function makeAssetEls(p: { actorData: ActorViewData[]; numberOfSlots: number; props: NetworkProps }) {
    return p.actorData.reduce((all, actorV, actorIndex): AssetEl[] => {
        const actor = actorV.actor;
        const assets = p.props.state.actors[actor.id].assetTrees;
        const numAssets = assets.length;

        const actorCenter = p.actorData[actorIndex].homePosition;
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
                numberOfChildren: a.children.length,
                image: a.asset.image,
            }),
        );

        return [...all, ...assetsEls];
    }, []);
}

function makeActorViewData(p: {
    actors: ActorDesc[];
    center: Vec;
    numberOfSlots: number;
    interactionData: InteractionViewData;
    props: NetworkProps;
}): ActorViewData[] {
    const actorHomePos = actorBasePositions({
        center: p.center,
        ringRadius: (p.props.width / 2) * config.relativeSlotRingSize,
        numberOfSlots: p.numberOfSlots,
        startAtRad: config.networkRotation,
    });

    // Compute the actor's positions
    const actorPos = actorHomePos.slice();

    if (!!p.interactionData.action) {
        // Move actors that interact locally

        const [fromPos, toPos] = computeInteractingActorsLocation(
            actorHomePos[p.interactionData.fromIndex],
            actorHomePos[p.interactionData.toIndex],
            p.interactionData.action.locality,
            config.fractionActorMovesToOther,
        );
        actorPos[p.interactionData.fromIndex] = fromPos;
        actorPos[p.interactionData.toIndex] = toPos;
    }

    return p.actors.map(
        (actor, i): ActorViewData => ({
            actor,
            selected: actor.id === p.props.selectedActorId,
            involvedInStep: i === p.interactionData.fromIndex || i === p.interactionData.toIndex,
            isHome: eq(actorHomePos[i], actorPos[i]),
            normalImage: actor.image,
            activeModeImage: w1th(p.props.modes[p.actors[i].id], (mode) =>
                mode && actor.modeImages && mode in actor.modeImages ? actor.modeImages![mode as string] : actor.image,
            ),
            homePosition: actorHomePos[i],
            position: actorPos[i],
        }),
    );
}

function makePseudonymEls(p: {
    interactionData: InteractionViewData;
    actorData: ActorViewData[];
    center: Vec;
    props: NetworkProps;
}): PseudonymEl[] {
    const _nyms: PseudonymEl[] = [];

    const { action, fromIndex, toIndex } = p.interactionData;

    // Compute the pseudonyms
    if (!!action) {
        // Move actors that interact locally
        const p0 = p.actorData[fromIndex].homePosition;
        const p2 = p.actorData[toIndex].homePosition;
        const q = scaleQuadraticBezierCurve(p0, p.center, p2, config.connectionCurveFraction);
        const sourceNymPos = fractionOfQuadBezier(p0, q, p2, config.relativePseudonymPosition);
        const targetNymPos = fractionOfQuadBezier(p0, q, p2, 1 - config.relativePseudonymPosition);

        if (action.from_nym) {
            const asset = p.props.state.assets[action.from_nym].asset;
            _nyms.push({
                c: sourceNymPos,
                id: p.actorData[fromIndex].actor.id + '-nym',
                r: config.pseudonymRadius,
                type: 'pseudonym',
                image: asset.image,
            });
        }
        if (action.to_nym) {
            const asset = p.props.state.assets[action.to_nym].asset;
            _nyms.push({
                c: targetNymPos,
                id: p.actorData[toIndex].actor.id + '-nym',
                r: config.pseudonymRadius,
                type: 'pseudonym',
                image: asset.image,
            });
        }
    }
    return _nyms;
}
