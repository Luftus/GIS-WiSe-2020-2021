"use strict";
let a = 10;
let b = 6.9;
function multiply() {
    console.log(a * b);
}
multiply();
function max() {
    if (a > b) {
        console.log(a, "ist größer als", b);
    }
    else {
        console.log(b, "ist größer als", a);
    }
}
max();
let nummerPlus = 1;
while (nummerPlus <= 100) {
    console.log(nummerPlus);
    nummerPlus++;
}
for (let i = 0; i < 10; i++) {
    console.log(Math.round(Math.random() * (100 - 1) + 1));
}
//# sourceMappingURL=script.js.map