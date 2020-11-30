
let a: number = 10;
let b: number = 6.9;
function multiply(): void {
    console.log(a * b);
}
multiply();

function max(): void {
   if ( a > b ) {
       console.log(a, "ist größer als", b);
   }
   else {
    console.log(b, "ist größer als", a);
   }
}
max();

let nummerPlus: number = 1;
while (nummerPlus <= 100) {
    console.log(nummerPlus);
    nummerPlus++;
}

for ( let i = 0; i < 10; i++ ) {
    console.log(Math.round(Math.random() * (100 - 1) + 1));
}
  



