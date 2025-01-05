type LayerType = "frame" | "text" | "image" | "icon" | "vector" | "group";

interface LayerProperties {
    positioning?: {
        x?: number;
        y?: number;
        // position?: "absolute" | "relative" | "fixed";
        // zIndex?: number;
    };
    size?: {
        width?: number | "auto";
        height?: number | "auto";
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
    };
    autoLayout?: {
        layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
        layoutWrap?: "NO_WRAP" | "WRAP";
        paddingLeft?: number;
        paddingRight?: number;
        paddingTop?: number;
        paddingBottom?: number;
        horizontalPadding?: number;
        verticalPadding?: number;
        primaryAxisSizingMode?: "FIXED" | "AUTO";
        counterAxisSizingMode?: "FIXED" | "AUTO";
        primaryAxisAlignItems?: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN";
        counterAxisAlignItems?: "MIN" | "MAX" | "CENTER" | "BASELINE";
        counterAxisAlignContent?: "AUTO" | "SPACE_BETWEEN";
        itemSpacing?: number;
        counterAxisSpacing?: number | null;
        itemReverseZIndex?: boolean;
        strokesIncludedInLayout?: boolean;
    };
    autoLayoutChildren?: {
        layoutAlign: "MIN" | "CENTER" | "MAX" | "STRETCH" | "INHERIT";
        layoutGrow: number;
        layoutPositioning: "AUTO" | "ABSOLUTE";
    };
    layout?: {
        rotation?: number;
        layoutSizingHorizontal: "FIXED" | "HUG" | "FILL";
        layoutSizingVertical: "FIXED" | "HUG" | "FILL";
        overflowDirection?: "NONE" | "HORIZONTAL" | "VERTICAL" | "BOTH";
    };

    // Styling
    styling?: {
        visible?: boolean;
        opacity?: number;
        blendMode?:
            | "PASS_THROUGH"
            | "NORMAL"
            | "DARKEN"
            | "MULTIPLY"
            | "LINEAR_BURN"
            | "COLOR_BURN"
            | "LIGHTEN"
            | "SCREEN"
            | "LINEAR_DODGE"
            | "COLOR_DODGE"
            | "OVERLAY"
            | "SOFT_LIGHT"
            | "HARD_LIGHT"
            | "DIFFERENCE"
            | "EXCLUSION"
            | "HUE"
            | "SATURATION"
            | "COLOR"
            | "LUMINOSITY";
        backgrounds?: unknown;
        fills?: unknown;
        strokes?: unknown;
        cornerRadius?:
            | number
            | {
                  topLeft: number;
                  topRight: number;
                  bottomLeft: number;
                  bottomRight: number;
              };
        effects?: unknown;
    };

    font?: {
        fontName?: {
            family: string;
            style: string;
        };
        fontSize?: number;
        fontWeight?: number | string;
        lineHeight?:
            | {
                  value: number;
                  unit: "PIXELS" | "PERCENT";
              }
            | {
                  unit: "AUTO";
              };
        letterSpacing?: {
            value: number;
            unit: "PIXELS" | "PERCENT";
        };
    };

    text?: {
        textFills?: unknown;
        textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
        textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
        textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT" | "TRUNCATE";
    };

    constraints?: {
        horizontal: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
        vertical: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
    };
}

interface Layer {
    id: string; // Unique ID for the layer (matches design tool convention)
    name: string;
    type: LayerType;
    properties: LayerProperties;
    children?: Layer[];
}

interface DesignComponentVariant {
    name: string; // Variant name, e.g., "primary", "secondary", "tertiary", "disabled"
    layerOverrides: Array<{
        layerId: string; // ID of the layer being overridden
        properties: Partial<LayerProperties>; // Properties to override for the layer
    }>;
}

interface DesignComponentState {
    name: string; // State name, e.g., "hover", "focused", "pressed"
    layerOverrides: Array<{
        layerId: string; // ID of the layer being overridden
        properties: Partial<LayerProperties>; // Properties to override for the layer
    }>;
}

interface DesignComponent {
    id: string; // Unique component ID
    name: string; // Component name
    layers: Layer[];
    variants?: DesignComponentVariant[];
    states?: DesignComponentState[];
}

export {
    LayerType,
    LayerProperties,
    Layer,
    DesignComponentVariant,
    DesignComponentState,
    DesignComponent,
};
