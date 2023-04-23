import { XmlComponent } from "../../../file/xml-components";
export interface ILanguageOptions {
    readonly value?: string;
    readonly eastAsia?: string;
    readonly bidirectional?: string;
}
export declare const createLanguageComponent: (options: ILanguageOptions) => XmlComponent;
