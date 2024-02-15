import express from 'express'

const app = express()

interface params {
    a: number;
    b: number;
}

type Add = (x: params) => number;

const add: Add = x => {
    return x.a + x.b;
}

app.get ("/", req => {
    add({a: 1, b: 2 })
});

app.listen(3001, () => {
    console.log("started")
});



// import {writeFile} from 'fs'

// writeFile

// console.log("Hi my name is Aryan Kumar Singhal from Bayana, Bharatpur (Rajasthan)")
// console.log("Atharv Kumar Singhal")


//const add = (x: number, y?: number) => {
    //     if (y) {
    //         return x+y;
    //     } else {
    //         return x;
    //     }
    // };
    