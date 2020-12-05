let statusMessage = document.getElementById("message");

function start(): void {
  //Elemente binden
  let firstElementRow = document.getElementById("firstChoice");
  let secondElementRow = document.getElementById("secondChoice");
  let thirdElementRow = document.getElementById("thirdChoice");

  let backButton = document.getElementById("backBtn");

  //LocalStorage auslesen
  let localStorageFirst = localStorage.getItem("first");
  let localStorageSecond = localStorage.getItem("second");
  let localStorageThird = localStorage.getItem("third");

  //Zurück-Button: Weiterleitung zurück auf index.html
  backButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("index.html");
  });

  //Fehlerfall - etwas im LocalStorage fehlt
  if (!localStorageFirst || !localStorageSecond || !localStorageThird) {
    window.location.replace("index.html");
  } else {
    //Top-Image erzeugen und mit LocalStorage-Daten füllen
    let imgFirst = document.createElement("img");
    imgFirst.setAttribute("src", localStorageFirst);
    firstElementRow.appendChild(imgFirst);

    //Middle-Image erzeugen und mit LocalStorage-Daten füllen
    let imgSecond = document.createElement("img");
    imgSecond.setAttribute("src", localStorageSecond);
    secondElementRow.appendChild(imgSecond);

    //Bottom-Image erzeugen und mit LocalStorage-Daten füllen
    let imgThird = document.createElement("img"); //<img>
    imgThird.setAttribute("src", localStorageThird); //<img src="img/1.png">
    thirdElementRow.appendChild(imgThird); //<div id="row"> <img src="img/1.png"> </div>

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

      }
    });
  }
}

function displayMessage(type: string, message: string): void {
  if (type === "error") {
    statusMessage.innerHTML = `<span class="error">${message}</span>`;
  }
  else {
    statusMessage.innerHTML = `<span>${message}</span>`;
  }
}

start();