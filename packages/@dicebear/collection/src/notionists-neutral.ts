import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/notionists-neutral.json" with {
    type: "json"
};

type NotionistsNeutralOptions = {
        brows?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13'>;
        eyes?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05'>;
        glasses?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11'>;
        glassesProbability?: number;
        lips?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25' | 'variant26' | 'variant27' | 'variant28' | 'variant29' | 'variant30'>;
        nose?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20'>;
    };

const notionistsNeutral = createStyle<NotionistsNeutralOptions>(definition as Definition);

export { notionistsNeutral };
