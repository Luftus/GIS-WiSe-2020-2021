"use strict";
window.addEventListener("load", showContent);
function showContent() {
    sendURL("https://gis-communication.herokuapp.com");
    console.log("Show endauswahl");
    let t = sessionStorage.getItem("selected");
    getSelectedFromJSON(t);
    console.log("selected: " + selected);
    let endauswahl = document.getElementById("ergebniss");
    while (endauswahl.firstChild) {
        endauswahl.firstChild.remove();
    }
    let imgTop = document.createElement("img");
    imgTop.src = selected.top.link;
    endauswahl.appendChild(imgTop);
    let imgMiddle = document.createElement("img");
    imgMiddle.src = selected.middle.link;
    endauswahl.appendChild(imgMiddle);
    let imgBottom = document.createElement("img");
    imgBottom.src = selected.bottom.link;
    endauswahl.appendChild(imgBottom);
}
async function sendURL(_url) {
    let query = new URLSearchParams(selected);
    _url = _url + "?" + query.toString();
    let response = await fetch(_url);
    let json = await response.json();
    let status = document.getElementById("status");
    if (json.message != undefined) {
        status.textContent = json.message;
        status.style.color = "green";
    }
    else if (json.error != undefined) {
        status.textContent = json.error;
        status.style.color = "red";
    }
}
//# sourceMappingURL=endausgabe.js.map