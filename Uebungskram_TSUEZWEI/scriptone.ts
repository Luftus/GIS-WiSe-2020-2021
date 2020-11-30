console.log("Hallo Welt");

function min(): void {
    console.log(Math.min(1, 2 , 3 , 4, 5 , 6 , 7));
}

function isEven(n: number): boolean {
    if (n % 2 == 0)
    return true;
    else
    return false;
}
console.log(isEven(75));

let x: number [] = [1, 2, 69, 420, 911];
console.log("Normalerweise geht die Liste so:", x);
let umgedreht = x.reverse();
console.log( "Und so ist sie umgedreht:", umgedreht);
let y: number [] = [7, 8, 9, 10];
let z: number [] = [7, 8, 9, 10];
let kombinierteArrays = y.concat(z);
console.log(kombinierteArrays);










