# Ilograph for TypeScript

This library allows you to define [Ilograph](https://www.ilograph.com/) workspaces using TypeScript, and to get the corresponding YAML workspace definition as an export. This exported YAML can then be used to either update your workspace in the Ilograph Web-UI or as an input to the [Ilograph CLI](https://www.ilograph.com/docs/cli-and-export-api/).

## Usage

First, you'll need to create an instance of the `Workspace` class:

```TypeScript
const workspace = new Workspace();
```

Next, you can define your resource model:

```TypeScript
const resourceA = new Resource({
    name: 'A'
});

const resourceB = new Resource({
    name: 'B',
});

workspace.resources.push(resourceA);
workspace.resources.push(resourceB);
```

Now you can add either relational perspectives:

```TypeScript
const relationalPerspective = new RelationalPerspective({
    name: "relations"
});
relationalPerspective.addRelation(resourceA, resourceB, { label: "uses"});
workspace.perspectives.push(relationalPerspective);
```

Or sequence perspectives:

```TypeScript
const sequencePerspective = new SequencePerspective({name: "sequence"});
sequencePerspective.start(resourceA);
sequencePerspective.to(resourceB);
workspace.perspectives.push(sequencePerspective);
```

And finally, you can export the resulting yaml using the `toYAML` function on the `workspace`:

```TypeScript
console.log(workspace.toYAML());
```

A full example can be found under [sample](./sample/index.ts)