import { IBorderOptions } from "../../../file/border";
import { IShadingAttributesProperties } from "../../../file/shading";
import { IChangedAttributesProperties } from "../../../file/track-revision/track-revision";
import { IgnoreIfEmptyXmlComponent, XmlComponent } from "../../../file/xml-components";
import { PositiveUniversalMeasure, UniversalMeasure } from "../../../util/values";
import { EmphasisMarkType } from "./emphasis-mark";
import { ILanguageOptions } from "./language";
import { IFontAttributesProperties } from "./run-fonts";
import { UnderlineType } from "./underline";
interface IFontOptions {
    readonly name: string;
    readonly hint?: string;
}
export declare enum TextEffect {
    BLINK_BACKGROUND = "blinkBackground",
    LIGHTS = "lights",
    ANTS_BLACK = "antsBlack",
    ANTS_RED = "antsRed",
    SHIMMER = "shimmer",
    SPARKLE = "sparkle",
    NONE = "none"
}
export interface IRunStylePropertiesOptions {
    readonly bold?: boolean;
    readonly boldComplexScript?: boolean;
    readonly italics?: boolean;
    readonly italicsComplexScript?: boolean;
    readonly underline?: {
        readonly color?: string;
        readonly type?: UnderlineType;
    };
    readonly effect?: TextEffect;
    readonly emphasisMark?: {
        readonly type?: EmphasisMarkType;
    };
    readonly color?: string;
    readonly kern?: number | PositiveUniversalMeasure;
    readonly position?: UniversalMeasure;
    readonly size?: number | PositiveUniversalMeasure;
    readonly sizeComplexScript?: boolean | number | PositiveUniversalMeasure;
    readonly rightToLeft?: boolean;
    readonly smallCaps?: boolean;
    readonly allCaps?: boolean;
    readonly strike?: boolean;
    readonly doubleStrike?: boolean;
    readonly subScript?: boolean;
    readonly superScript?: boolean;
    readonly font?: string | IFontOptions | IFontAttributesProperties;
    readonly highlight?: string;
    readonly highlightComplexScript?: boolean | string;
    readonly characterSpacing?: number;
    readonly shading?: IShadingAttributesProperties;
    readonly emboss?: boolean;
    readonly imprint?: boolean;
    readonly revision?: IRunPropertiesChangeOptions;
    readonly language?: ILanguageOptions;
    readonly border?: IBorderOptions;
    readonly snapToGrid?: boolean;
    readonly vanish?: boolean;
    readonly specVanish?: boolean;
    readonly scale?: number;
    readonly math?: boolean;
}
export interface IRunPropertiesOptions extends IRunStylePropertiesOptions {
    readonly style?: string;
}
export interface IRunPropertiesChangeOptions extends IRunPropertiesOptions, IChangedAttributesProperties {
}
export declare class RunProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options?: IRunPropertiesOptions);
    push(item: XmlComponent): void;
}
export declare class RunPropertiesChange extends XmlComponent {
    constructor(options: IRunPropertiesChangeOptions);
}
export {};
