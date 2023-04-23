import { XmlComponent } from "../../../file/xml-components";
export declare enum PositionalTabAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}
export declare enum PositionalTabRelativeTo {
    MARGIN = "margin",
    INDENT = "indent"
}
export declare enum PositionalTabLeader {
    NONE = "none",
    DOT = "dot",
    HYPHEN = "hyphen",
    UNDERSCORE = "underscore",
    MIDDLE_DOT = "middleDot"
}
export interface PositionalTabOptions {
    readonly alignment: PositionalTabAlignment;
    readonly relativeTo: PositionalTabRelativeTo;
    readonly leader: PositionalTabLeader;
}
export declare class PositionalTab extends XmlComponent {
    constructor(options: PositionalTabOptions);
}
