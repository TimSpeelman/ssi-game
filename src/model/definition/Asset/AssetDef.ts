/** A plain object describing an Asset */
export interface AssetDef<Props = any> {
    id: string;
    props: Props;
    typeName: string;
}
