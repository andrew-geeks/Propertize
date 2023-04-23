import { XmlComponent } from "../../../../../file/xml-components";
import { PositiveUniversalMeasure } from "../../../../../util/values";
export declare enum PageOrientation {
    PORTRAIT = "portrait",
    LANDSCAPE = "landscape"
}
export type IPageSizeAttributes = {
    readonly width?: number | PositiveUniversalMeasure;
    readonly height?: number | PositiveUniversalMeasure;
    readonly orientation?: PageOrientation;
};
export declare class PageSize extends XmlComponent {
    constructor(width: number | PositiveUniversalMeasure, height: number | PositiveUniversalMeasure, orientation: PageOrientation);
}
