import { actorImage } from '../../config/actorImage';
import { Actor } from '../../data/actor/Actor';
import { ScenarioStepDescription } from '../../data/scenario/Scenario';
import { pointsOnCircle } from '../../util/circle';
import { scaleQuadraticBezierCurve } from '../../util/curve';
import { add, scale, Vec } from '../../util/vec';
import { CanvasElem, ConnectionEl, InteractionEl, SlotEl } from './SVGNetworkCanvas';

interface NetworkProps {
    width: number;
    height: number;
    actors: Actor[];
    interaction?: ScenarioStepDescription;
}

export function createNetworkCanvasData(props: NetworkProps): CanvasElem[] {
    const { width, height, actors } = props;

    // To position all slots along a circle, we need to compute n points on that circle
    const numberOfSlots = actors.length;
    const center: Vec = [width / 2, height / 2];
    const slotPositionsUnit = pointsOnCircle(numberOfSlots);
    const slotRingRadius = (width / 2) * 0.6;
    const slotPositionsAbs = slotPositionsUnit.map((p) => add(center, scale(slotRingRadius)(p)));

    const slotRadius = 50;
    const currentStep = props.interaction?.action;
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
    const interaction: InteractionEl | undefined = props.interaction
        ? { type: 'interaction' as const, id: 'interaction', c: center, radius: interactionRadius }
        : undefined;

    // Combine all elems
    const elems: CanvasElem[] = [...conns, ...slots, ...(!interaction ? [] : [interaction])];

    return elems;
}
