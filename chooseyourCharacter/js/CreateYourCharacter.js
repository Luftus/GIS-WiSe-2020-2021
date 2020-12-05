export default class CreateYourCharacter {
    //Soll dem User helfen zu zeigen wo er ist, Erste Seite "first" etc
    constructor(data) {
        let versteckteEingabe = document.getElementById("site_info");
        this.siteInfo = versteckteEingabe.getAttribute("value");
        //alle html elemente auslesen die es gibt
        this.initHtml();
        //bilder erzeugen
        this.init(data);
    }
    next() {
        switch (this.siteInfo) {
            case "first":
                window.location.replace("index_body.html");
                break;
            case "second":
                window.location.replace("index_legs.html");
                break;
            case "third":
                window.location.replace("character.html");
                break;
        }
    }
    initHtml() {
        this.messageElement = document.getElementById("message");
        this.submitButton = document.getElementById("submitChoice");
        //Soll Info übermitteln wo sich der USer befindet, auf der start.html dann headselection etc
        switch (this.siteInfo) {
            case "first":
                this.choiceRow = document.getElementById("headSelection");
                break;
            case "second":
                this.choiceRow = document.getElementById("bodySelection");
                break;
            case "third":
                this.choiceRow = document.getElementById("legsSelection");
                break;
        }
        // Sorgt dafür das der User nicht weiter kann, solange er etwas nicht angeklickt hat
        this.submitButton.addEventListener("click", () => {
            if (!this.selected) {
                this.error("Es ist nichts ausgewählt.");
            }
            else {
                this.saveSelected(); //speicherung Wahl
                this.next();
            }
        });
    }
    saveSelected() {
        localStorage.setItem(this.siteInfo, this.selected);
    }
    init(data) {
        //check ob die json-Daten gültig sind, wenn nicht Nachricht, else gibt die Bilder aus 
        if (data.headSelection.length === 0 || data.bodySelection.length === 0 || data.legsSelection.length === 0) {
            this.error("Die übergebenen Daten sind ungültig");
        }
        else {
            let sourceArray;
            switch (this.siteInfo) {
                case "first":
                    sourceArray = data.headSelection;
                    break;
                case "second":
                    sourceArray = data.bodySelection;
                    break;
                case "third":
                    sourceArray = data.legsSelection;
                    break;
            }
            // Bildererzeugung für das Array, wenn ein Bild angeklickt wird, wird es der select funktion unten weitergegeben
            sourceArray.forEach((src) => {
                let img = document.createElement("img");
                img.setAttribute("src", src);
                img.addEventListener("click", () => {
                    this.select(src, img, this.choiceRow);
                });
                this.choiceRow.appendChild(img);
            });
        }
    }
    error(message) {
        this.messageElement.innerHTML = message;
    }
    // Auswahl fürs Auswählen, removed schon ausgewählte Elemente 
    select(imageSrc, imgElem, rowElem) {
        let children = rowElem.children;
        for (var i = 0; i < children.length; i++) {
            let tableChild = children[i];
            tableChild.classList.remove("selected");
        }
        this.selected = imageSrc;
        imgElem.classList.add("selected");
    }
}
//# sourceMappingURL=CreateYourCharacter.js.map