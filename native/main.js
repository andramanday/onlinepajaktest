
const { checkAndGenerate, formatter, calTaxScheme, createElement } = require('./func');

const initApp = () => {
    // Initializes the app, registers the button click listener
    const newUserButton = document.querySelector('#btnCalculate');
    newUserButton.addEventListener('click', calculate);
};

const calculate = () => {
    const nameInput = document.querySelector('#name');
    const incomeInput = document.querySelector('#income');
    const reliefInput = document.querySelector('#relief');

    const outputText = checkAndGenerate(
        nameInput.value,
        incomeInput.value,
        reliefInput.value
    );

    console.log(outputText);
    
    if(!outputText){
        return;
    }

    const calculate = calTaxScheme(incomeInput.value, reliefInput.value);
    console.log(calculate);

    const taxformula = document.getElementById('taxformula-output');
    taxformula.innerHTML = '';
    if(calculate.taxIncomeFormula){
        for(let i = 0; i < calculate.taxIncomeFormula.length ; i++){
            const newElement = createElement('p', i+1+". " +calculate.taxIncomeFormula[i], 'newclas')
            taxformula.appendChild(newElement);
        }
    }
    
    const namaOut = document.getElementById('nama-output');
    const incomeOut = document.getElementById('income-output');
    const reliefOut = document.getElementById('relief-output');
    const taxableIncome = document.getElementById('taxableincome-output');
    const taxIncome = document.getElementById('taxincome-output');

    namaOut.innerHTML = nameInput.value;
    incomeOut.innerHTML = formatter.format(incomeInput.value);
    reliefOut.innerHTML = calculate.reliefStatus;
    taxableIncome.innerHTML = calculate.taxableIncome;
    taxIncome.innerHTML = calculate.taxIncome;
    
};

initApp();