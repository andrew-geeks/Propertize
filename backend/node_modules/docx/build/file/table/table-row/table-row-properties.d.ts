import { IgnoreIfEmptyXmlComponent } from "../../../file/xml-components";
import { PositiveUniversalMeasure } from "../../../util/values";
import { HeightRule } from "./table-row-height";
export interface ITableRowPropertiesOptions {
    readonly cantSplit?: boolean;
    readonly tableHeader?: boolean;
    readonly height?: {
        readonly value: number | PositiveUniversalMeasure;
        readonly rule: HeightRule;
    };
}
export declare class TableRowProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options: ITableRowPropertiesOptions);
}
