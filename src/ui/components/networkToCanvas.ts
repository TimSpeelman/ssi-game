import { actorImage } from '../../config/actorImage';
import { Actor } from '../../data/actor/Actor';
import { ScenarioStateDescription, ScenarioStepDescription } from '../../data/scenario/Scenario';
import { pointsOnCircleEquidistant, pointsOnCircleFixedRangeCentered } from '../../util/circle';
import { scaleQuadraticBezierCurve } from '../../util/curve';
import { add, scale, Vec } from '../../util/vec';
import { AssetEl, CanvasElem, ConnectionEl, InteractionEl, SlotEl } from './SVGNetworkCanvas';

interface NetworkProps {
    width: number;
    height: number;
    actors: Actor[];
    state: ScenarioStateDescription;
    step?: ScenarioStepDescription;
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
    const slots: SlotEl[] = slotPositionsAbs.map((p, i) => ({
        type: 'slot',
        id: actors[i].id,
        // id: `slot-${i}`,
        lit: false,
        c: p,
        r: slotRadius,
        url: actorImage(actors[i].image),
        active: !!currentStep && (currentStep.from.id === actors[i].id || currentStep.to.id === actors[i].id),
    }));

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
                                  active: slot1.active && slot2.active,
                              },
                          ],
                [],
            ),
        ],
        [],
    );

    // The interaction
    const interactionRadius = width / 5;
    const interaction: InteractionEl | undefined = props.step
        ? { type: 'interaction' as const, id: 'interaction', c: center, radius: interactionRadius }
        : undefined;

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

    console.log(assets.length, 'assets rendered');

    // Combine all elems
    const elems: CanvasElem[] = [...conns, ...slots, ...(!interaction ? [] : [interaction]), ...assets];

    return elems;
}
