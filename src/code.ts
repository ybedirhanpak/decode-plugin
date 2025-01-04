import { Message } from "./model/Message";

figma.showUI(__html__);

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
    console.log("selected node", selectedNode);
}
