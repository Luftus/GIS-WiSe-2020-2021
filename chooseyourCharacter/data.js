"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSONContent = void 0;
function createPicsFromJSON(_jsonStr) {
    headSection = [];
    bodySection = [];
    legSection = [];
    let json = JSON.parse(_jsonStr);
    Object.keys(json).forEach(key => {
        if (key == "headSection") {
            headSection = json[key];
        }
        else if (key == "bodySection") {
            bodySection = json[key];
        }
        else if (key == "legSection") {
            legSection = json[key];
        }
    });
}
async function getJSONContent(_url) {
    let response = await fetch(_url);
    let json = await response.json();
    createPicsFromJSON(JSON.stringify(json));
}
exports.getJSONContent = getJSONContent;
//# sourceMappingURL=data.js.map