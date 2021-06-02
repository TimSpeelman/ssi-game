import { actorImage } from '../../config/actorImage';
import { Locality } from '../../content/actions/InteractionDescription';
import { Actor } from '../../model/game/Actor/Actor';
import { ScenarioStateDescription } from '../../model/view/ScenarioStateDescription';
import { ScenarioStepDescription } from '../../model/view/ScenarioStepDescription';
import { pointsOnCircleEquidistant, pointsOnCircleFixedRangeCentered } from '../../util/circle';
import { scaleQuadraticBezierCurve } from '../../util/curve';
import { add, avg, eq, fractionOfLine, scale, Vec } from '../../util/vec';
import { ActorEl, AssetEl, CanvasElem, ConnectionEl, SlotEl } from './SVGNetworkCanvas';

interface NetworkProps {
    width: number;
    height: number;
    actors: Actor[];
    modes: Record<string, string | undefined>;
    state: ScenarioStateDescription;
    step?: ScenarioStepDescription;
    selectedActorId?: string;
    hoveredElemId?: string;
}

function getActorImage(actor: Actor, mode?: string) {
    if (mode && actor.modeImages && actor.modeImages[mode]) return actor.modeImages[mode];
    else return actor.image;
}

export function createNetworkCanvasData(props: NetworkProps): CanvasElem[] {
    const networkRotation = -Math.PI / 2; // 0: starting East, -Pi/2: starting North

    const { width, height, actors } = props;

    const currentStep = props.step?.action;
    const fromIndex = !!currentStep ? actors.findIndex((a) => a.id === currentStep.from.id) : -1;
    const toIndex = !!currentStep ? actors.findIndex((a) => a.id === currentStep.to.id) : -1;

    const numberOfSlots = actors.length;
    const center: Vec = [width / 2, height / 2];

    // Compute the actor's base positions (along a circle)
    const actorHomePosUnit = pointsOnCircleEquidistant(numberOfSlots, networkRotation);
    const slotRingRadius = (width / 2) * 0.6;
    const actorHomePos = actorHomePosUnit.map((p) => add(center, scale(slotRingRadius)(p)));

    // Compute the actor's positions
    const actorPos = actorHomePos.slice();
    if (!!currentStep) {
        // Move actors that interact locally
        const fractionActorMovesToOther = 0.7;
        const [fromPos, toPos] = computeInteractingActorsLocation(
            actorHomePos[fromIndex],
            actorHomePos[toIndex],
            currentStep.locality,
            fractionActorMovesToOther,
        );
        actorPos[fromIndex] = fromPos;
        actorPos[toIndex] = toPos;
    }

    const _actors: ActorViewData[] = actors.map(
        (actor, i): ActorViewData => ({
            actor,
            selected: actor.id === props.selectedActorId,
            involvedInStep: i === fromIndex || i === toIndex,
            isHome: eq(actorHomePos[i], actorPos[i]),
            normalUrl: getActorImage(actor),
            activeModeUrl: getActorImage(actor, props.modes[actors[i].id]),
            homePosition: actorHomePos[i],
            position: actorPos[i],
        }),
    );

    const slotRadius = 50;

    const slots: SlotEl[] = _actors.map(
        (actor, i): SlotEl => ({
            type: 'slot',
            id: actor.actor.id + '-slot',
            selected: actor.selected,
            involvedInStep: actor.involvedInStep,
            c: actor.homePosition,
            r: slotRadius,
            showImage: !actor.isHome,
            url: actorImage(actor.normalUrl),
        }),
    );

    const locality = !!currentStep ? currentStep.locality : Locality.REMOTE;
    const actorEls = _actors.map(
        (actor, i): ActorEl => ({
            type: 'actor',
            id: actor.actor.id,
            selected: actor.selected,
            involvedInStep: actor.involvedInStep,
            c: actor.position,
            r: slotRadius,
            url: actorImage(actor.activeModeUrl),
        }),
    );

    // Create connections between all actors
    const connectionCurveFraction = 0.5; // 0: straight line, 1: curved towards center
    const conns: CanvasElem[] = slots.reduce(
        (acc, slot1, i) => [
            ...acc,
            ...slots.reduce(
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
                                  q: scaleQuadraticBezierCurve(slot1.c, center, slot2.c, connectionCurveFraction),
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

    // The assets
    const assetRadius = 10;
    const assets = actors.reduce((all, actor, actorIndex): AssetEl[] => {
        const assets = props.state.actors[actor.id].assets;
        const numAssets = assets.length;

        const actorCenter = actorHomePos[actorIndex];
        const actorAngle = networkRotation + ((2 * Math.PI) / numberOfSlots) * actorIndex; // center the range
        const spaceInRad = Math.PI / 6;
        const assetPositionsUnit = pointsOnCircleFixedRangeCentered(numAssets, actorAngle, spaceInRad);
        const assetRingRadius = slotRadius + 30;
        const assetPositionsAbs = assetPositionsUnit.map((p) => add(actorCenter, scale(assetRingRadius)(p)));
        const assetsEls = assets.map(
            (a, assetIndex): AssetEl => ({
                type: 'asset',
                active: false,
                c: assetPositionsAbs[assetIndex],
                id: `asset-${actorIndex}-${assetIndex}`, // todo fixme
                lit: false,
                r: assetRadius,
                url: '',
            }),
        );

        return [...all, ...assetsEls];
    }, []);

    // Combine all elems
    const elems: CanvasElem[] = [...conns, ...slots, ...actorEls, ...assets];

    return elems.map((e) => (e.id === props.hoveredElemId ? { ...e, hovered: true } : e));
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
