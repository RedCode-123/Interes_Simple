'use strict';
let btn = document.querySelector("#send");
btn.addEventListener('click', btnAction);

function btnAction() {
    let interes = document.querySelector("#interes").value,
        capital = document.querySelector("#capital").value,
        rendimiento = document.querySelector("#rendimiento").value,
        tiempo = document.querySelector("#tiempo").value,
        result = document.querySelector(".result")
    try {
        let values = validateData(interes, capital, rendimiento, tiempo);
        let respuesta = calcularInteres(values);
        result.innerText = respuesta;
    } catch (error) {
        result.innerHTML = error.message;
    }

}
function calcularInteres(arr) {
    let copy = [...arr];
    if (copy !== undefined) {
        //Deconstruct
        let [i, c, r, t] = copy;
        if (i === '?') {
            return '$ ' + (+c * (+r / 100) * +t);
        } else if (c === '?') {
            return '$ ' + ((+i) / ((+r / 100) * +t));
        } else if (r === '?') {
            return (((+i) * 100) / (+c * +t)) + ' %'
        } else if (t === '?') {
            return ((+i) / (+c * (+r / 100))) + ' años'
        }
    } else {
        return undefined;
    }
}

function QuestionMarkException(message) {
    this.message = message;
    this.name = "QuestionMarkException";
}

function validateData(...theArg) {
    /* Esta función valida que solo haya un signo de interrogación
    y números positivos */
    let copy = [...theArg];
    let questionMarksCount = count(copy, '?');
    let filterNumbers = copy.filter(item => item !== '?');
    let areAllNumbers = filterNumbers.every(item => +item * 0 === 0);
    let areAllPositive = filterNumbers.every(item => +item >= 0);
    // console.log(filterNumbers, areAllNumbers);
    if (!areAllNumbers) {
        throw new TypeError('Tres de los valores deben de ser números');
    }
    if (questionMarksCount === 0) {
        throw new QuestionMarkException('Debe de haber por lo menos un "?"');
    }
    if (questionMarksCount > 1) {
        throw new QuestionMarkException('No puede haber más de un "?"');
    }
    if (!areAllPositive) {
        throw new RangeError('No se aceptan números negativos!')
    }

    if (questionMarksCount === 1 && areAllNumbers && areAllPositive) {
        return copy;
    }

}

function count(arr, element) {
    // array,string/number -> number
    //busca el element en el array
    let copy = [...arr];
    let found = copy.filter(item => item === element);
    return found.length;
}
