/** A plain object describing an Action */
export interface PlainAction<Props = any> {
    id: string;
    props: Props;
    typeName: string;
}
