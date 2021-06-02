/** A plain object describing an Action */
export interface ActionDef<Props = any> {
    id: string;
    props: Props;
    typeName: string;
}
