/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DesignComponent,
    Layer,
    LayerType,
    LayerProperties,
} from "./model/Design";

function getPositioning(node: SceneNode): Pick<LayerProperties, "positioning"> {
    return {
        positioning: {
            x: node.x,
            y: node.y,
        },
    };
}

function getSize(node: FrameNode): Pick<LayerProperties, "size"> {
    return {
        size: {
            width: node.width,
            height: node.height,
            minWidth: node.minWidth ?? undefined,
            minHeight: node.minHeight ?? undefined,
            maxWidth: node.maxWidth ?? undefined,
            maxHeight: node.maxHeight ?? undefined,
        },
    };
}

function getAutoLayout(node: FrameNode): Pick<LayerProperties, "autoLayout"> {
    return {
        autoLayout: {
            layoutMode: node.layoutMode,
            layoutWrap: node.layoutWrap,
            paddingLeft: node.paddingLeft,
            paddingRight: node.paddingRight,
            paddingTop: node.paddingTop,
            paddingBottom: node.paddingBottom,
            horizontalPadding: node.horizontalPadding,
            verticalPadding: node.verticalPadding,
            primaryAxisSizingMode: node.primaryAxisSizingMode,
            counterAxisSizingMode: node.counterAxisSizingMode,
            primaryAxisAlignItems: node.primaryAxisAlignItems,
            counterAxisAlignItems: node.counterAxisAlignItems,
            counterAxisAlignContent: node.counterAxisAlignContent,
            itemSpacing: node.itemSpacing,
            counterAxisSpacing: node.counterAxisSpacing,
            itemReverseZIndex: node.itemReverseZIndex,
            strokesIncludedInLayout: node.strokesIncludedInLayout,
        },
    };
}

function getAutoLayoutChildren(
    node: FrameNode
): Pick<LayerProperties, "autoLayoutChildren"> {
    return {
        autoLayoutChildren: {
            layoutAlign: node.layoutAlign,
            layoutGrow: node.layoutGrow,
            layoutPositioning: node.layoutPositioning,
        },
    };
}

function getLayoutSizing(node: FrameNode): Pick<LayerProperties, "layout"> {
    return {
        layout: {
            rotation: node.rotation,
            layoutSizingHorizontal: node.layoutSizingHorizontal,
            layoutSizingVertical: node.layoutSizingVertical,
            overflowDirection: node.overflowDirection,
        },
    };
}

function getStyling(node: FrameNode): Pick<LayerProperties, "styling"> {
    return {
        styling: {
            visible: node.visible,
            opacity: node.opacity,
            blendMode: node.blendMode,
            backgrounds: node.backgrounds,
            fills: node.fills,
            strokes: node.strokes,
            cornerRadius: node.cornerRadius as any,
            effects: node.effects,
        },
    };
}

function getFont(node: TextNode): Pick<LayerProperties, "font"> {
    return {
        font: {
            fontName: node.fontName as any,
            fontSize: node.fontSize as number,
            fontWeight: node.fontWeight as number,
            lineHeight: node.lineHeight as any,
            letterSpacing: node.letterSpacing as any,
        },
    };
}

function getText(node: TextNode): Pick<LayerProperties, "text"> {
    return {
        text: {
            textFills: node.fills as any,
            textAlignHorizontal: node.textAlignHorizontal,
            textAlignVertical: node.textAlignVertical,
            textAutoResize: node.textAutoResize,
        },
    };
}

function getConstraints(node: FrameNode): Pick<LayerProperties, "constraints"> {
    return {
        constraints: node.constraints,
    };
}

function createLayerFromNode(node: SceneNode): Layer {
    const layer: Layer = {
        id: node.id,
        name: node.name,
        type: node.type as unknown as LayerType,
        properties: {
            ...getPositioning(node),
            ...getSize(node as unknown as FrameNode),
            ...getAutoLayout(node as unknown as FrameNode),
            ...getAutoLayoutChildren(node as unknown as FrameNode),
            ...getLayoutSizing(node as unknown as FrameNode),
            ...getStyling(node as unknown as FrameNode),
            ...getFont(node as unknown as TextNode),
            ...getText(node as unknown as TextNode),
            ...getConstraints(node as unknown as FrameNode),
        },
    };

    if ("children" in node) {
        const group = node as GroupNode;
        layer.children = group.children.map(createLayerFromNode);
    }

    return layer;
}

function createDesignComponentFromNode(node: SceneNode): DesignComponent {
    const layer = createLayerFromNode(node);

    return {
        id: node.id,
        name: node.name,
        layers: [layer],
    };
}

export { createDesignComponentFromNode };
