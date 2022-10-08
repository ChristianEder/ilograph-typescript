import { RelationalPerspective } from "./relationalPerspective";
import { Resource } from "./resource";
import { SequencePerspective } from "./sequencePerspective";
import {stringify} from 'yaml';

export class Workspace {
    public resources: Resource[] = [];
    public perspectives: (RelationalPerspective | SequencePerspective)[] = [];

    public toYAML(): string {
        return stringify({
            resources: this.resources.map(r => r.properties),
            perspectives : this.perspectives.map(r => r.properties)
        });
    }
}