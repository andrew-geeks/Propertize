import { XmlComponent } from "../../file/xml-components";
import { Percentage, UniversalMeasure } from "../../util/values";
export declare enum WidthType {
    AUTO = "auto",
    DXA = "dxa",
    NIL = "nil",
    PERCENTAGE = "pct"
}
export type ITableWidthProperties = {
    readonly size: number | Percentage | UniversalMeasure;
    readonly type?: WidthType;
};
export declare class TableWidthElement extends XmlComponent {
    constructor(name: string, { type, size }: ITableWidthProperties);
}
