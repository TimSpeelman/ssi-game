export interface AssetDesc {
    id: string;
    parentId: string | undefined;
    isInitial: boolean;
    type: string;
    title: string;
    sub: string;
}
