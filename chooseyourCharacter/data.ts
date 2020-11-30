// Gesichter
let headOne: Auswahl = {
    groeße: "30px" ,
    bild: "head1.JPG" ,
    name: "headone" 
};

let headTwo: Auswahl = {
    groeße: "30px" ,
    bild: "head2.JPG" ,
    name: "headtwo" 
};

let headThree: Auswahl = {
    groeße: "30px" ,
    bild: "head3.JPG" ,
    name: "headthree" 
};
// Körper
let bodyOne: Auswahl = {
    groeße: "30px" ,
    bild: "body1.JPG" ,
    name: "bodyOne" 
};

let bodyTwo: Auswahl = {
    groeße: "30px" ,
    bild: "body2.JPG" ,
    name: "bodyTwo" 
};

let bodyThree: Auswahl = {
    groeße: "30px" ,
    bild: "body3.JPG" ,
    name: "bodyThree" 
};

// Beine
let legsOne: Auswahl = {
    groeße: "30px" ,
    bild: "legs1.JPG" ,
    name: "legsOne" 
};

let legsTwo: Auswahl = {
    groeße: "30px" ,
    bild: "legs2.JPG" ,
    name: "legsTwo" 
};

let legsThree: Auswahl = {
    groeße: "30px" ,
    bild: "legs3.JPG" ,
    name: "legsThree" 
};

let head: Auswahl[] = [headOne, headTwo, headThree];
let body: Auswahl[] = [bodyOne, bodyTwo, bodyThree];
let legs: Auswahl[] = [legsOne, legsTwo, legsThree];

// Interface damit alles gesamt ausgegeben wird

let gesamt: CompletedCharacter = {
    head: [headOne, headTwo, headThree],
    body: [bodyOne, bodyTwo, bodyThree],
    legs: [legsOne, legsTwo, legsThree]
}; 

interface Auswahl {
groeße: string;
bild: string;
name: string;
}

interface CompletedCharacter {
    head: Auswahl[];
    body: Auswahl[];
    legs: Auswahl[];

}










