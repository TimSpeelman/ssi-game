import { actorImage } from '../../config/actorImage';
import { Locality } from '../../content/actions/InteractionDescription';
import { Actor } from '../../model/game/Actor';
import { ScenarioStateDescription } from '../../model/view/ScenarioStateDescription';
import { ScenarioStepDescription } from '../../model/view/ScenarioStepDescription';
import { pointsOnCircleEquidistant, pointsOnCircleFixedRangeCentered } from '../../util/circle';
import { scaleQuadraticBezierCurve } from '../../util/curve';
import { add, avg, fractionOfLine, scale, Vec } from '../../util/vec';
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
    const { width, height, actors } = props;

    // To position all slots along a circle, we need to compute n points on that circle
    const numberOfSlots = actors.length;
    const center: Vec = [width / 2, height / 2];
    const slotPositionsUnit = pointsOnCircleEquidistant(numberOfSlots);
    const slotRingRadius = (width / 2) * 0.6;
    const slotPositionsAbs = slotPositionsUnit.map((p) => add(center, scale(slotRingRadius)(p)));

    const slotRadius = 50;
    const currentStep = props.step?.action;

    const fromIndex = !!currentStep ? actors.findIndex((a) => a.id === currentStep.from.id) : -1;
    const toIndex = !!currentStep ? actors.findIndex((a) => a.id === currentStep.to.id) : -1;

    const slots: SlotEl[] = slotPositionsAbs.map(
        (p, i): SlotEl => ({
            type: 'slot',
            id: actors[i].id + '-slot',
            // id: `slot-${i}`,
            selected: actors[i].id === props.selectedActorId,
            involvedInStep: !!currentStep && (i === fromIndex || i === toIndex),
            c: p,
            r: slotRadius,
        }),
    );

    // Depending on the locality of the interaction, move the actors
    const fractionActorMovesToOther = 0.7;
    const locality = !!currentStep ? currentStep.locality : Locality.REMOTE;
    let actorEls = slotPositionsAbs.map(
        (p, i): ActorEl => ({
            type: 'actor',
            id: actors[i].id,
            selected: actors[i].id === props.selectedActorId,
            involvedInStep: !!currentStep && (i === fromIndex || i === toIndex),
            c: p,
            r: slotRadius,
            url: actorImage(getActorImage(actors[i], props.modes[actors[i].id])),
        }),
    );
    if (!!currentStep && locality !== Locality.REMOTE) {
        const ctr = avg(slots[fromIndex].c, slots[toIndex].c);
        const frm = slots[fromIndex].c;
        const to = slots[toIndex].c;
        const locs = {
            [Locality.AT_CENTER]: [
                fractionOfLine(frm, ctr, fractionActorMovesToOther),
                fractionOfLine(to, ctr, fractionActorMovesToOther),
            ],
            [Locality.AT_FROM]: [frm, fractionOfLine(to, frm, fractionActorMovesToOther)],
            [Locality.AT_TO]: [fractionOfLine(frm, to, fractionActorMovesToOther), to],
        };
        const [fromLoc, toLoc] = locs[locality];
        actorEls = actorEls.map((s, i) => ({
            ...s,
            c: i === fromIndex ? fromLoc : i === toIndex ? toLoc : s.c,
        }));
    }

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
                                  involvedInStep: slot1.involvedInStep && slot2.involvedInStep,
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

        const actorCenter = slotPositionsAbs[actorIndex];
        const actorAngle = ((2 * Math.PI) / numberOfSlots) * actorIndex; // center the range
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
