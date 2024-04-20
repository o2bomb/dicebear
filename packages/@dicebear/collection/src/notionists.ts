import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/notionists.json" with {
    type: "json"
};

type NotionistsOptions = {
        base?: Array<'variant01'>;
        beard?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12'>;
        beardProbability?: number;
        body?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25'>;
        bodyIcon?: Array<'electric' | 'galaxy' | 'saturn'>;
        bodyIconProbability?: number;
        brows?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13'>;
        eyes?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05'>;
        gesture?: Array<'hand' | 'handPhone' | 'ok' | 'okLongArm' | 'point' | 'pointLongArm' | 'waveLongArm' | 'waveLongArms' | 'waveOkLongArms' | 'wavePointLongArms'>;
        gestureProbability?: number;
        glasses?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11'>;
        glassesProbability?: number;
        hair?: Array<'hat' | 'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25' | 'variant26' | 'variant27' | 'variant28' | 'variant29' | 'variant30' | 'variant31' | 'variant32' | 'variant33' | 'variant34' | 'variant35' | 'variant36' | 'variant37' | 'variant38' | 'variant39' | 'variant40' | 'variant41' | 'variant42' | 'variant43' | 'variant44' | 'variant45' | 'variant46' | 'variant47' | 'variant48' | 'variant49' | 'variant50' | 'variant51' | 'variant52' | 'variant53' | 'variant54' | 'variant55' | 'variant56' | 'variant57' | 'variant58' | 'variant59' | 'variant60' | 'variant61' | 'variant62' | 'variant63'>;
        lips?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25' | 'variant26' | 'variant27' | 'variant28' | 'variant29' | 'variant30'>;
        nose?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20'>;
    };

const notionists = createStyle<NotionistsOptions>(definition as Definition);

export { notionists };
