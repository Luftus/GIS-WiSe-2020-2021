"use strict";
console.log("Hallo Welt");
function min() {
    console.log(Math.min(1, 2, 3, 4, 5, 6, 7));
}
function isEven(n) {
    if (n % 2 == 0)
        return true;
    else
        return false;
}
console.log(isEven(75));
let x = [1, 2, 69, 420, 911];
console.log("Normalerweise geht die Liste so:", x);
let umgedreht = x.reverse();
console.log("Und so ist sie umgedreht:", umgedreht);
let y = [7, 8, 9, 10];
let z = [7, 8, 9, 10];
let kombinierteArrays = y.concat(z);
console.log(kombinierteArrays);
//# sourceMappingURL=scriptone.js.map