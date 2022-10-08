import { ArrowColor, PerspectiveColor } from "./colors";
import { Resource } from "./resource";

interface PerspectiveResourceAlias {
    alias: string;
    for: string;
}

export interface PerspectiveProperties {
    name: string;
    id?: string;
    notes?: string;
    color?: PerspectiveColor;
    defaultArrowLabel?: string;
    defaultArrowColor?: ArrowColor;
    arrowDirection?: 'forward' | 'backward' | 'bidirectional';
    orientation?: 'leftToRight' | 'topToBottom' | 'ring';
    hidden?: boolean;
    deduplicateImportedResources?: boolean;
    unwrapContext?: boolean;
    aliases?: PerspectiveResourceAlias[];
}

export abstract class Perspective<TProperties extends PerspectiveProperties> {
    constructor(public properties: TProperties) {
    }

    public addAlias(alias: string, forResource: Resource): void {
        if (!this.properties.aliases) {
            this.properties.aliases = [];
        }

        this.properties.aliases.push({ alias, for: forResource.effectiveId });
    }

    protected getAliasOrEffectiveId(resource: Resource): string{
        if(this.properties.aliases){
            for (let index = 0; index < this.properties.aliases.length; index++) {
                const alias = this.properties.aliases[index];
                if(alias.for === resource.effectiveId){
                    return alias.alias;
                }                
            }
        }
        return resource.effectiveId;
    }

}