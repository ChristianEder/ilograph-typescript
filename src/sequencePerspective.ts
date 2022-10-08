import { ArrowColor } from "./colors";
import { Perspective, PerspectiveProperties } from "./perspective";
import { Resource } from "./resource";

interface ToStep {
    to: string;
}

interface ToAndBackStep {
    toAndBack: string;
}

interface ToAsyncStep {
    toAsync: string;
}

interface RestartAtStep {
    restartAt: string;
}

interface OptionalStepProperties {
    label?: string;
    description?: string;
    bidirectional?: boolean;
    color?: ArrowColor;
}

type Step = (ToStep | ToAndBackStep | ToAsyncStep | RestartAtStep) & OptionalStepProperties;

interface Sequence {
    start: string;
    steps?: Step[];
}

interface SequencePerspectiveProperties extends PerspectiveProperties {
    sequence?: Sequence;
}

export class SequencePerspective extends Perspective<SequencePerspectiveProperties> {

    public start(start: Resource): void {
        if (!this.properties.sequence) {
            this.properties.sequence = {
                start: this.getAliasOrEffectiveId(start)
            };
        }
        else {
            this.properties.sequence.start = this.getAliasOrEffectiveId(start);
        }
    }

    public to(to: Resource, optionalStepProperties?: OptionalStepProperties) {
        this.addStep({
            to: this.getAliasOrEffectiveId(to)
        }, optionalStepProperties);
    }

    public toAndBack(toAndBack: Resource, optionalStepProperties?: OptionalStepProperties) {
        this.addStep({
            toAndBack: this.getAliasOrEffectiveId(toAndBack)
        }, optionalStepProperties);
    }

    public toAsync(toAsync: Resource, optionalStepProperties?: OptionalStepProperties) {
        this.addStep({
            toAsync: this.getAliasOrEffectiveId(toAsync)
        }, optionalStepProperties);
    }

    public restartAt(restartAt: Resource, optionalStepProperties?: OptionalStepProperties) {
        this.addStep({
            restartAt: this.getAliasOrEffectiveId(restartAt)
        }, optionalStepProperties);
    }

    private addStep(step: Step, optionalStepProperties?: OptionalStepProperties){
        if(!this.properties.sequence){
            throw new Error('You need to set the start resource before adding steps');
        }

        if(!this.properties.sequence.steps){
            this.properties.sequence.steps = [];
        }

        const optionalProperties = optionalStepProperties ?? {};

        this.properties.sequence.steps.push({
            ...step,
            ...optionalProperties
        });
    }
}