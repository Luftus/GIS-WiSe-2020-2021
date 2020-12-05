import CreateYourCharacter from "./data.js";

function start(): void {
  fetch("json/data.json").then((response) => {
    response.json().then((result) => {
      if (!result) {
        return;
      }
      new CreateYourCharacter(result);
    });
  });
}

start();