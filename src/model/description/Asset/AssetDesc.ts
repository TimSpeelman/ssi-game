export interface AssetDesc {
    id: string;
    parentId: string | undefined;
    canHaveChildren?: boolean;
    isInitial: boolean;
    type: string;
    title: string;
    sub: string;
}
