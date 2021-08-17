export type CanvasEvent =
    | SlotClickEvent
    | SlotEnterEvent
    | SlotLeaveEvent
    | AssetEnterEvent
    | AssetClickEvent
    | AssetLeaveEvent
    | PseudonymEnterEvent
    | PseudonymClickEvent
    | PseudonymLeaveEvent
    | ConnEnterEvent
    | ConnLeaveEvent
    | ConnClickEvent
    | SlotDeleteEvent;

export interface SlotEnterEvent {
    type: 'slot-enter';
    id: string;
}
export interface SlotClickEvent {
    type: 'slot-click';
    id: string;
}
export interface SlotLeaveEvent {
    type: 'slot-leave';
    id: string;
}
export interface ConnEnterEvent {
    type: 'conn-enter';
    id: string;
}
export interface ConnLeaveEvent {
    type: 'conn-leave';
    id: string;
}
export interface ConnClickEvent {
    type: 'conn-click';
    id: string;
}
export interface SlotDeleteEvent {
    type: 'slot-delete';
    id: string;
}
export interface AssetEnterEvent {
    type: 'asset-enter';
    id: string;
}
export interface AssetClickEvent {
    type: 'asset-click';
    id: string;
}
export interface AssetLeaveEvent {
    type: 'asset-leave';
    id: string;
}
export interface PseudonymEnterEvent {
    type: 'pseudonym-enter';
    id: string;
}
export interface PseudonymClickEvent {
    type: 'pseudonym-click';
    id: string;
}
export interface PseudonymLeaveEvent {
    type: 'pseudonym-leave';
    id: string;
}
