import { XmlComponent } from "../../../file/xml-components";
import { PositiveUniversalMeasure, UniversalMeasure } from "../../../util/values";
export declare enum TableAnchorType {
    MARGIN = "margin",
    PAGE = "page",
    TEXT = "text"
}
export declare enum RelativeHorizontalPosition {
    CENTER = "center",
    INSIDE = "inside",
    LEFT = "left",
    OUTSIDE = "outside",
    RIGHT = "right"
}
export declare enum RelativeVerticalPosition {
    CENTER = "center",
    INSIDE = "inside",
    BOTTOM = "bottom",
    OUTSIDE = "outside",
    INLINE = "inline",
    TOP = "top"
}
export declare enum OverlapType {
    NEVER = "never",
    OVERLAP = "overlap"
}
export type ITableFloatOptions = {
    readonly horizontalAnchor?: TableAnchorType;
    readonly absoluteHorizontalPosition?: number | UniversalMeasure;
    readonly relativeHorizontalPosition?: RelativeHorizontalPosition;
    readonly verticalAnchor?: TableAnchorType;
    readonly absoluteVerticalPosition?: number | UniversalMeasure;
    readonly relativeVerticalPosition?: RelativeVerticalPosition;
    readonly bottomFromText?: number | PositiveUniversalMeasure;
    readonly topFromText?: number | PositiveUniversalMeasure;
    readonly leftFromText?: number | PositiveUniversalMeasure;
    readonly rightFromText?: number | PositiveUniversalMeasure;
    readonly overlap?: OverlapType;
};
export declare class TableFloatProperties extends XmlComponent {
    constructor({ horizontalAnchor, verticalAnchor, absoluteHorizontalPosition, relativeHorizontalPosition, absoluteVerticalPosition, relativeVerticalPosition, bottomFromText, topFromText, leftFromText, rightFromText, overlap, }: ITableFloatOptions);
}
