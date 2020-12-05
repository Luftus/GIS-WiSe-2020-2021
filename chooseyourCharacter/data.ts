interface JsonCharacter {
    firstChoicePath: string[];
    secondChoicePath: string[];
    thirdChoicePath: string[];
}

export default class CreateYourCharacter {
    private messageElement: HTMLElement;
    private choiceRow: HTMLElement;

    private submitButton: HTMLElement;

    private selected: string;

    private siteInfo: string;


    constructor(data: JsonCharacter) {
        let hiddenInputSite = document.getElementById("site_info");
        this.siteInfo = hiddenInputSite.getAttribute("value");
        //alle html elemente auslesen die es gibt
        this.initHtml();
        //bilder erzeugen
        this.init(data)
    }

    private next(): void {
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

    private initHtml(): void {
        this.messageElement = document.getElementById("message");
        this.submitButton = document.getElementById("submitChoice");

        switch (this.siteInfo) {
            case "first":
                this.choiceRow = document.getElementById("firstChoice");
                break;
            case "second":
                this.choiceRow = document.getElementById("secondChoice");
                break;
            case "third":
                this.choiceRow = document.getElementById("thirdChoice");
                break;
        }

        this.submitButton.addEventListener("click", () => {
            if (!this.selected) {
                this.error("Es ist nichts ausgewählt.");
            }
            else {
                //erfolgsfall - die selektion kann gespeichert werden (localStorage)
                this.saveSelected();
                //weiterleitung auf die neue Seite
                this.next();
            }
        });
    }

    private saveSelected(): void {
        localStorage.setItem(this.siteInfo, this.selected);
    }

    private init(data: JsonCharacter): void {
        //check ob die json-Daten gültig sind
        if (data.firstChoicePath.length === 0 || data.secondChoicePath.length === 0 || data.thirdChoicePath.length === 0) {
            this.error("Die übergebenen Daten sind ungültig");
        }
        else {
            let sourceArray: string[];
            switch (this.siteInfo) {
                case "first":
                    sourceArray = data.firstChoicePath;
                    break;
                case "second":
                    sourceArray = data.secondChoicePath;
                    break;
                case "third":
                    sourceArray = data.thirdChoicePath;
                    break;
            }
            //iteration über die json-Daten für den Körper
            sourceArray.forEach((src: string) => {
                let img = document.createElement("img");
                img.setAttribute("src", src);
                img.addEventListener("click", () => {
                    this.select(src, img, this.choiceRow);
                });
                this.choiceRow.appendChild(img);
            });
        }
    }

    private error(message: string): void {
        this.messageElement.innerHTML = message;
    }

    private select(imageSrc: string, imgElem: Element, rowElem: Element): void {
        //die selected Klasse von jedem Element der row entfernen
        let children = rowElem.children;
        for (var i = 0; i < children.length; i++) {
            let tableChild = children[i];
            tableChild.classList.remove("selected");
        }
        this.selected = imageSrc;
        imgElem.classList.add("selected");
    }

}

