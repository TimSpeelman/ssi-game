export interface PlainAction<Props = any> {
    id: string;
    props: Props;
    typeName: string;
}
