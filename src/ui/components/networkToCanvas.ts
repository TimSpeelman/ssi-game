import { pointsOnCircle } from '../../util/circle';
import { add, scale, Vec } from '../../util/vec';
import gov1 from '../assets/img/gov1.png';
import office1 from '../assets/img/office1.png';
import office2 from '../assets/img/office2.png';
import office3 from '../assets/img/office3.png';
import person1 from '../assets/img/person1.png';
import person2 from '../assets/img/person2.png';
import person3 from '../assets/img/person3.png';
import shop1 from '../assets/img/shop1.png';
import { CanvasElem, Connection, Interaction, Slot } from './SVGNetworkCanvas';

const images = {
    office1,
    office2,
    office3,
    person1,
    person2,
    person3,
    gov1,
    shop1,
};

export type ImgName = keyof typeof images;

export interface Actor {
    image: ImgName;
}

export interface IInteraction {
    from: number;
    to: number;
}

interface NetworkProps {
    width: number;
    height: number;
    actors: Actor[];
    interaction?: IInteraction;
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
    const slots: Slot[] = slotPositionsAbs.map((p, i) => ({
        type: 'slot',
        id: `slot-${i}`,
        lit: false,
        c: p,
        r: slotRadius,
        url: images[actors[i].image],
        active: !!props.interaction && (props.interaction.from === i || props.interaction.to === i),
    }));

    // Create connections between all actors
    const connectionCurveFraction = 0.5; // 0: straight line, 1: curved towards center
    const conns: CanvasElem[] = slots.reduce(
        (acc, slot1, i) => [
            ...acc,
            ...slots.reduce(
                (acc2, slot2, j): Connection[] =>
                    i >= j
                        ? []
                        : [
                              ...acc2,
                              {
                                  type: 'connection',
                                  id: `conn-${i}-${j}`,
                                  from: slot1.c,
                                  to: slot2.c,
                                  q: center,
                                  curve: connectionCurveFraction,
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
    const interaction: Interaction | undefined = props.interaction
        ? { type: 'interaction' as const, id: 'interaction', c: center, radius: interactionRadius }
        : undefined;

    // Combine all elems
    const elems: CanvasElem[] = [...conns, ...slots, ...(!interaction ? [] : [interaction])];

    return elems;
}
