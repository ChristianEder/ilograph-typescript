import { RelationalPerspective, Resource, SequencePerspective, Workspace } from "ilograph-typescript";

const workspace = new Workspace();

const resourceA = new Resource({
    name: "A",
    color: 'Azure',
    icon: 'Azure/Internet of Things/Azure Digital Twins.svg'
});

const resourceB = new Resource({
    name: "B",
    color: 'Azure',
    icon: 'Azure/Internet of Things/Azure Digital Twins.svg'
});

workspace.resources.push(resourceA);
workspace.resources.push(resourceB);

const relationalPerspective = new RelationalPerspective({
    name: "relations"
});
relationalPerspective.addRelation(resourceA, resourceB, { label: "uses"});
workspace.perspectives.push(relationalPerspective);


const sequencePerspective = new SequencePerspective({name: "sequence"});
sequencePerspective.start(resourceA);
sequencePerspective.to(resourceB);
workspace.perspectives.push(sequencePerspective);

console.log(workspace.toYAML());

