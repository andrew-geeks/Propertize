import { XmlAttributeComponent, XmlComponent } from "../../../file/xml-components";
import { PositiveUniversalMeasure } from "../../../util/values";
export declare enum HeightRule {
    AUTO = "auto",
    ATLEAST = "atLeast",
    EXACT = "exact"
}
export declare class TableRowHeightAttributes extends XmlAttributeComponent<{
    readonly value: number | string;
    readonly rule: HeightRule;
}> {
    protected readonly xmlKeys: {
        value: string;
        rule: string;
    };
}
export declare class TableRowHeight extends XmlComponent {
    constructor(value: number | PositiveUniversalMeasure, rule: HeightRule);
}
