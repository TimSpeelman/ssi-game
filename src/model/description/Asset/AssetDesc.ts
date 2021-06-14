export interface AssetDesc<Props = any> {
    id: string;
    parentId: string | undefined;
    canHaveChildren?: boolean;
    isInitial: boolean;
    props: Props;
    type: string;
    title: string;
    sub: string;
}
