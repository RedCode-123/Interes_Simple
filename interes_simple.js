'use strict';
let btn = document.querySelector("#send");
btn.addEventListener('click', btnAction);

function btnAction() {
    let interes = document.querySelector("#interes").value,
        capital = document.querySelector("#capital").value,
        rendimiento = document.querySelector("#rendimiento").value,
        tiempo = document.querySelector("#tiempo").value,
        result = document.querySelector(".result"),
        values = validateData(interes, capital, rendimiento, tiempo);
        if( values !== undefined) {
            let respuesta = calcularInteres(values);
            result.innerText = respuesta ;
        } else {
            result.innerText ='Verifica los datos, solo debe de haber un "?" y números';
        }
}
function calcularInteres(arr) {
        let copy = [ ...arr ]; 
        //Deconstruct
        if (copy !== undefined){
            let [ i, c, r, t ] = copy;
            if ( i === '?') {
                return '$ ' + (+c * (+r/100) * +t);
            } else if (c === '?') {
                return '$ '+ ((+i)/(( +r/100 ) * +t));
            } else if (r === '?'){
                return (((+i)*100)/(+c * +t)) + ' %'
            } else if (t === '?'){
                return ((+i)/(+c * (+r/100))) + ' años'
            }
        } else {
            return undefined ;
        }
}

function validateData(...theArg) {
    /* Esta función valida que solo haya un signo de interrogación
    y números */
    let copy = [ ...theArg ];
    let questionMarksCount = count(copy, '?');
    let filterNumbers = copy.filter(item => item !== '?');
    let areAllNumbers = filterNumbers.every(item => +item * 0 === 0 );
    // console.log(filterNumbers, areAllNumbers);
    if(questionMarksCount === 1 && areAllNumbers){
        return copy ;
    } else {
        return undefined ;
    }
    
}

function count(arr, element) {
    // array,string/number -> number
    //busca el element en el array
    let copy = [...arr];
    let found = copy.filter(item => item ===element);
    return found.length;
}