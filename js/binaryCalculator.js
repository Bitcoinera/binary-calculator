let input = document.getElementById('res');
let expres = '';
let operator = false;

document.addEventListener('click',function(e){
    // clear
    if (e.target.id === 'btnClr') {
        input.innerHTML = '';
        expres = '';
        operator = false;
        return;
    };

    // avoid own binaryCalculator replication
    if( e.target.id !== '' ) {
        expres = expres + e.target.innerHTML;
        input.innerHTML = expres;
    }

    // allow only one operator per expression
    if ( e.target.id === 'btnSum' || e.target.id === 'btnSub' || e.target.id === 'btnDiv'|| e.target.id === 'btnMul' ) {
        if (operator) {
            console.error('Only one operator per expression!');
            expres = expres.substring( 0, expres.length - 1 );
        }
        operator = true;
    }

    if (e.target.id === 'btnEql') {
        // show result

        if (expres.includes('+')) { 
            operate('+');
        }
        if (expres.includes('-')) { 
            operate('-');
        }
        if (expres.includes('*')) {
            operate('*');
        }
        if (expres.includes('/')) {
            operate('/');
        }
    }
})

function convertToDecimal(binary) {
    let decimal = 0;
    let pow = 0;
    for ( let i = binary.length - 1; i >= 0; i-- ) {

        if (binary[i] === '1') {
            decimal = decimal + 1 * 2**pow;
        }
        pow++;
    }
    return decimal.toString();
}

function convertToBinary(decimal) {
    console.log(decimal);
    let i = 0;
    let positions = [];
    // extract positions for 1's in binary number
    while ( decimal > 0 ) {
        while ( (decimal - 2**i) >= 0 ) {
            i++;
        }
        i--;
        positions.push(i);
        console.log('positions', positions);
        decimal -= 2**i;
        i = 0;
    }

    // draw binary using the positions of 1
    let binary = [];
    for ( i = 0; i <= positions[0]; i++ ) {
        if (positions.includes(i)) {
            binary.push('1');
        } else {
            binary.push('0');
        }
    }

    binary = binary.reverse().join('');
    input.innerHTML = binary;
}

function operate(operator) {
    expresSplit = expres.split(operator);
    // erase equal sign
    expresSplit[1] = expresSplit[1].slice(0, expresSplit[1].length - 1);
    expresSplit[0] = convertToDecimal(expresSplit[0]);
    expresSplit[1] = convertToDecimal(expresSplit[1]);
    let decimalRes = eval(expresSplit[0] + operator + expresSplit[1]);
    convertToBinary(decimalRes);
    // empty expres
    expres = '';
}