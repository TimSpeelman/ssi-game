import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder } from '../../util/util';

export function TestDND() {
    const [l, s] = useState(['1', '2', '3', '4']);
    return (
        <DragDropContext onDragEnd={(x) => s(reorder(l, x.source!.index, x.destination!.index))}>
            <Droppable droppableId={'d123'}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                        {l.map((step, i) => (
                            <Draggable draggableId={step} index={i} key={step}>
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        {step}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
