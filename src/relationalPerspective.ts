import { ArrowColor } from "./colors";
import { Perspective, PerspectiveProperties } from "./perspective";
import { Resource } from "./resource";

interface RelationalPerspectiveRelation {
    from: string;
    to: string;
    arrowDirection?: 'forward' | 'backward' | 'bidirectional';
    label?: string;
    description?: string;
    color?: ArrowColor;
}

interface RelationalPerspectiveProperties extends PerspectiveProperties {
    relations?: RelationalPerspectiveRelation[];
}

export class RelationalPerspective extends Perspective<RelationalPerspectiveProperties> {

    public addRelation(fromResource: Resource, toResource: Resource, relationProperties?: Omit<RelationalPerspectiveRelation, 'from' | 'to'>): void {
        if (!this.properties.relations) {
            this.properties.relations = [];
        }

        const optionalProperties = relationProperties ?? {};
        const relation: RelationalPerspectiveRelation = {
            from: this.getAliasOrEffectiveId(fromResource),
            to: this.getAliasOrEffectiveId(toResource),
            ...optionalProperties
        };

        this.properties.relations.push(relation);
    }
}
