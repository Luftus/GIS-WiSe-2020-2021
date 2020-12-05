"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedFromJSON = exports.selected = exports.legSection = exports.bodySection = exports.headSection = void 0;
let keyTop = 0;
let keyMiddle = 1;
let keyBottom = 2;
exports.headSection = [];
exports.bodySection = [];
exports.legSection = [];
exports.selected = { top: undefined, middle: undefined, bottom: undefined };
let actSite = 0;
let htmlImgs = [];
window.addEventListener("load", windowLoaded);
async function windowLoaded() {
    actSite = Number(sessionStorage.getItem("actSite"));
    getSelectedFromJSON(sessionStorage.getItem("selected"));
    await getJSONContent("data.json");
    console.log(actSite);
    if (actSite == keyTop) {
        createContent(exports.headSection);
    }
    else if (actSite == keyMiddle) {
        createContent(exports.bodySection);
    }
    else if (actSite == keyBottom) {
        createContent(exports.legSection);
    }
}
function getSelectedFromJSON(_jsonStr) {
    console.log(_jsonStr);
    if (_jsonStr != null) {
        let json = JSON.parse(_jsonStr);
        Object.keys(json).forEach(key => {
            if (key == "top") {
                let pic = json[key];
                exports.selected.top = pic;
            }
            else if (key == "middle") {
                let pic = json[key];
                exports.selected.middle = pic;
            }
            else if (key == "bottom") {
                let pic = json[key];
                exports.selected.bottom = pic;
            }
        });
    }
    return exports.selected;
}
exports.getSelectedFromJSON = getSelectedFromJSON;
function selectImage(_img, _bild) {
    if (_bild.id == keyTop) {
        exports.selected.top = _bild;
    }
    else if (_bild.id == keyMiddle) {
        exports.selected.middle = _bild;
    }
    else if (_bild.id == keyBottom) {
        exports.selected.bottom = _bild;
    }
    _img.className = "selected";
    htmlImgs.forEach(pic => {
        if (pic != _img) {
            pic.classList.remove("selected");
        }
    });
    console.log(_bild.image);
}
let btNext = document.getElementById("btWeiter");
btNext.addEventListener("click", btNextClicked);
let btBack = document.getElementById("btZurueck");
btBack.addEventListener("click", btBackClicked);
function btNextClicked() {
    console.log("Next");
    actSite = Number(sessionStorage.getItem("actSite"));
    sessionStorage.setItem("selected", JSON.stringify(exports.selected));
    console.log("Saved: " + sessionStorage.getItem("selected"));
    if (actSite < keyBottom) {
        actSite++;
        if (actSite == keyTop) {
            createContent(exports.headSection);
        }
        else if (actSite == keyMiddle) {
            if (exports.selected.top != undefined) {
                createContent(exports.bodySection);
            }
            else {
                actSite--;
            }
        }
        else if (actSite == keyBottom) {
            if (exports.selected.middle != undefined) {
                createContent(exports.legSection);
            }
            else {
                actSite--;
            }
        }
        sessionStorage.setItem("actSite", actSite.toString());
    }
    else if (actSite == keyBottom) {
        window.open("end.html", "_self");
    }
}
function btBackClicked() {
    if (actSite > 0)
        actSite--;
    if (actSite == keyTop) {
        exports.selected.top = undefined;
        createContent(exports.headSection);
    }
    else if (actSite == keyMiddle) {
        exports.selected.middle = undefined;
        createContent(exports.bodySection);
    }
    else if (actSite == keyBottom) {
        exports.selected.bottom = undefined;
        createContent(exports.legSection);
    }
    sessionStorage.setItem("selected", JSON.stringify(exports.selected));
    sessionStorage.setItem("actSite", actSite.toString());
    console.log("Back");
}
function createContent(_bilder) {
    console.log(_bilder);
    let imgContainer = document.getElementById("imgContainer");
    htmlImgs = [];
    while (imgContainer.firstChild) {
        imgContainer.firstChild.remove();
    }
    _bilder.forEach(bild => {
        let img = document.createElement("img");
        img.src = bild.image;
        htmlImgs.push(img);
        imgContainer.appendChild(img);
        img.addEventListener("click", function () {
            selectImage(img, bild);
        });
    });
    showAuswahl();
}
function showAuswahl() {
    let auswahlDiv = document.getElementById("Auswahl");
    while (auswahlDiv.firstChild) {
        auswahlDiv.firstChild.remove();
    }
    if (exports.selected.top != undefined) {
        let imgTop = document.createElement("img");
        imgTop.src = exports.selected.top.image;
        auswahlDiv.appendChild(imgTop);
    }
    if (exports.selected.middle != undefined) {
        let imgMiddle = document.createElement("img");
        imgMiddle.src = exports.selected.middle.image;
        auswahlDiv.appendChild(imgMiddle);
    }
    if (exports.selected.bottom != undefined) {
        let imgBottom = document.createElement("img");
        imgBottom.src = exports.selected.bottom.image;
        auswahlDiv.appendChild(imgBottom);
    }
}
//# sourceMappingURL=script.js.map