let statusMessage = document.getElementById("message");

function start(): void {
  //Variablen auslesen die man braucht
  let ersteAuswahl = document.getElementById("headSelection");
  let zweiteAuswahl = document.getElementById("bodySelection");
  let dritteAuswahl = document.getElementById("legsSelection");
  //Zurück Button
  let goBack = document.getElementById("zurAuswahlKnopf");

  //LocalStorage Info
  let localStorageFirst: string = localStorage.getItem("first");
  let localStorageSecond: string = localStorage.getItem("second");
  let localStorageThird: string = localStorage.getItem("third");

  //Zurück-Button: Weiterleitung zurück auf start.html
  goBack.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("start.html");
  });

  //Wenn was fehlen sollte wieder in den Start, ansonsten 
  if (!localStorageFirst || !localStorageSecond || !localStorageThird) {
    window.location.replace("start.html");
  } else {
    //Erstes Bild setzen und appenden 
    let imgFirst = document.createElement("img");
    imgFirst.setAttribute("src", localStorageFirst);
    ersteAuswahl.appendChild(imgFirst);

    //zweites Bild setzen und appenden 
    let imgSecond = document.createElement("img");
    imgSecond.setAttribute("src", localStorageSecond);
    zweiteAuswahl.appendChild(imgSecond);

    //drittes  Bild setzen und appenden 
    let imgThird = document.createElement("img"); //<img>
    imgThird.setAttribute("src", localStorageThird); //<img src="img/head1.jpg"> beispielsweise
    dritteAuswahl.appendChild(imgThird); //<div id="row"> <img src="head1.jpg"> </div> beispielsweise
    //"Server" für das displayen der aufgabe, base url mit dem query string, local storage info
    let baseUrl = "https://gis-communication.herokuapp.com";
    let query: URLSearchParams = new URLSearchParams(localStorage);
    baseUrl = baseUrl + "?" + query.toString();
    //GET-Request an URL
    fetch(baseUrl).then((response) => {
      response.json().then((result) => {
        if (result && !result.error) {
          displayMessage("success", result.message);
        }
        else {
          displayMessage("error", result.error);
        }

      });
    });
  }
}
// Error Message/normales Element
function displayMessage(type: string, message: string): void {
  if (type === "error") {
    statusMessage.innerHTML = `<span class="error">${message}</span>`;
  }
  else {
    statusMessage.innerHTML = `<span>${message}</span>`;
  }
}
start();