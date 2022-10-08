import { BackgroundColor, ResourceColor } from "./colors";
import { Icon } from "./icons";


export interface ResourceLayout {
    compactness: number;
    sizes: 'auto' | 'proportional' | 'uniform'
}

interface ResourceProperties {
    name: string;
    subtitle?: string;
    description?: string;
    color?: ResourceColor;
    backgroundColor?: BackgroundColor;
    style?: 'default' | 'plural' | 'dashed' | 'outline' | 'flat';
    icon?: Icon;
    iconStyle?: 'default' | 'silhouette';
    url?: string;
    abstract?: boolean;
    instanceOf?: string;
    layout?: ResourceLayout;
    id?: string;
}

export class Resource {
    constructor(public properties: ResourceProperties) {
    }

    public isInstanceOf(abstractBaseResource: Resource): void {
        if(!abstractBaseResource.properties.abstract){
            throw new Error('Only abstract resources can be inherited from');
        }
        this.properties.instanceOf = abstractBaseResource.effectiveId;
    }

    public get effectiveId(): string {
        return this.properties.id ?? this.properties.name;
    }
}
