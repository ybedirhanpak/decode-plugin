import { DesignComponent, Layer, LayerType } from "./model/Design";

function createLayersFromNode(node: SceneNode): Layer[] {
    const layers: Layer[] = [];

    if ("children" in node) {
        const group = node as GroupNode;
        for (const child of group.children) {
            layers.push(...createLayersFromNode(child));
        }
    } else {
        const layer: Layer = {
            id: node.id,
            name: node.name,
            type: node.type as unknown as LayerType,
            properties: {},
        };

        layers.push(layer);
    }

    return layers;
}

function createDesignComponentFromNode(node: SceneNode): DesignComponent {
    const layers = createLayersFromNode(node);

    return {
        id: node.id,
        name: node.name,
        layers: layers,
    };
}

export { createDesignComponentFromNode };
