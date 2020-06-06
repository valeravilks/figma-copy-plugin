figma.showUI(__html__);
const selection = figma.currentPage.selection['0'];
figma.ui.onmessage = (event) => {
    if (event.type == 'go') {
        figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then((rez) => {
            selection.exportAsync().then(res => {
                const r = figma.createRectangle();
                let newFills = [];
                const newPaint = JSON.parse(JSON.stringify(selection.fills[1]));
                newPaint.imageHash = figma.createImage(res).hash;
                newPaint.opacity = 1;
                newFills.push(newPaint);
                r.fills = newFills;
                r.x = selection.x + selection.width + 100;
                r.y = selection.y;
                console.log(selection.width);
                console.log(r.width);
                r.resize(selection.width, selection.height);
                figma.closePlugin();
            });
        });
    }
};
