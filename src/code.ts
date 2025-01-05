import { Message } from "./model/Message";
import { createDesignComponentFromNode } from "./utils";

figma.showUI(__html__);

figma.ui.resize(400, 400);

figma.ui.onmessage = (msg: Message) => {
    switch (msg.type) {
        case "close":
            handleClose();
            break;
        case "select":
            handleSelect();
            break;
        default:
            console.log("unhandled message", msg);
            break;
    }
};

function handleClose() {
    figma.closePlugin();
}

function handleSelect() {
    const nodes = figma.currentPage.selection;
    const selectedNode = nodes[0];
    const designComponent = createDesignComponentFromNode(selectedNode);

    figma.ui.postMessage({
        type: "output",
        data: designComponent,
    });
}
