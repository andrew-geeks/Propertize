import { XmlComponent } from "../../../../../file/xml-components";
import { PositiveUniversalMeasure } from "../../../../../util/values";
export declare enum LineNumberRestartFormat {
    NEW_PAGE = "newPage",
    NEW_SECTION = "newSection",
    CONTINUOUS = "continuous"
}
export interface ILineNumberAttributes {
    readonly countBy?: number;
    readonly start?: number;
    readonly restart?: LineNumberRestartFormat;
    readonly distance?: number | PositiveUniversalMeasure;
}
export declare class LineNumberType extends XmlComponent {
    constructor({ countBy, start, restart, distance }: ILineNumberAttributes);
}
