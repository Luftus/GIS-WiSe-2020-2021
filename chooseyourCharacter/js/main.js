import CreateYourCharacter from "./CreateYourCharacter.js";
//Anfang FUnktion, holt sich die Daten Erstmal aus der JSON
function start() {
    fetch("json/data.json").then((response) => {
        response.json().then((result) => {
            if (!result) { //falls keine Daten vorhanden sind macht die Funktion garnichts
                return;
            }
            new CreateYourCharacter(result); //Ruft Createyourcharacter auf 
        });
    });
}
start();
//# sourceMappingURL=main.js.map