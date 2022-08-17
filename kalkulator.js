
/*objek ini sebagai tempat menyimpan data dan kondisi pada calculator*/
/*angka yang muncul pada layar calculator selalu diambil dari data calculator.displayNumber*/
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

/*fungsi update angka */
function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

/*fungsi hapus data kalkulator */
function clearCalculator() {
    calculator.displayNumber = '0',
    calculator.operator = null,
    calculator.firstNumber = null,
    calculator.isWaitForSecondNumber = false;
}

/*fungsi memasukkan angka ke dalam nilai display number calculator */
function inputDigit(digit) {
    if (calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    }else{
        calculator.displayNumber += digit;
        }
    }

function inverseNumber(){
    if (calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator){
    if (!calculator.isWaitForSecondNumber){
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else{
        alert('Operator sudah ditetapkan');
    }
}

function performCalculation(){
    if (calculator.firstNumber == null || calculator.operator == null){
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

        //parseInt() digunakan untuk mengubah nilai string menjadi number

    calculator.displayNumber = result;
}

/*variabel button dengan inisialiasi seluruh elemen button dan event klik pada tiap elemen */

const buttons = document.querySelectorAll('.button');

for (const button of buttons) {
    button.addEventListener('click', function(event){
        //mendapatkan objek elemen yang diklik
        const target = event.target;

        //membuat tombol CE berjalan semestinya untuk clear
        //event classList untuk melihat nilai class apa saja dalam bentuk array yang ada di elemen target
        //function contains method dari array untuk memastikan nilai yg berada dalam array
        if (target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('qeuals')){
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')){
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}