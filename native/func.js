  
  export const createElement = (type, text, className) => {
    // Creates a new HTML element and returns it
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    newElement.textContent = text;
    return newElement;
  };
  
  export const validateInput = (text, notEmpty, isNumber) => {
    // Validate user input with two pre-defined rules
    if (!text) {
      return false;
    }
    if (notEmpty && text.trim().length === 0) {
      return false;
    }
    if (isNumber && +text === NaN) {
      return false;
    }
    return true;
  };
  
  
  export const checkAndGenerate = (name, income, relief) => {
    if ( 
            !validateInput(name, true, false)  || 
            !validateInput(income, true, true)   ||
            !validateInput(relief, true, false) 
    ) {
      return false;
    }
  
    return true;
  };

  export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });
  

  export const calTaxScheme = (income, status) => {
        let annualIncome =  income * 12;
        let relief = taxRelif(status);
        let annualTaxableincome  = annualIncome - relief;
        let anualTaxIncome = taxScheme(annualTaxableincome);
        let data = {
            reliefStatus    : status + " - " + formatter.format(relief),
            taxableIncome  : formatter.format(annualTaxableincome),
            taxableIncomef  : "(" + formatter.format(income) +" * 12) - "+ formatter.format(relief) + " = " + formatter.format(annualTaxableincome),
            taxIncome       : formatter.format(anualTaxIncome.result),
            taxIncomeFormula: anualTaxIncome.rumus
        };

        return data;
  };

  export const taxScheme = (annualIncome) => {
    let resultReturn = null;
    let result = null;
    let calAnnualIncome = annualIncome;
    let resultTest = [];
    switch(true){
        case (annualIncome > 0):
            if(annualIncome > 50000000){
                result = ((5/100) * 50000000);
                calAnnualIncome = calAnnualIncome - 50000000;
                resultTest.push("50000000 * 5% = " + result);
                resultReturn = resultReturn + result;               
            }else{
                result = ((5/100) * annualIncome);
                resultTest.push(annualIncome + " * 5% = " + result);
                resultReturn = resultReturn + result;        
                break;
            }    
        case (annualIncome > 50000000):
            if(annualIncome >= 250000000){
                let sisaAnnual = 0;
                if((calAnnualIncome - 250000000) <= 50000000){
                    sisaAnnual = calAnnualIncome - 50000000;
                }else{
                    sisaAnnual = 250000000;
                }
                result = ((15/100) * sisaAnnual);
                calAnnualIncome = calAnnualIncome - sisaAnnual;
                resultTest.push(sisaAnnual + " * 15% = " + result);
                resultReturn = resultReturn + result;        
            }else{
                result = ((15/100) * calAnnualIncome);
                resultTest.push(calAnnualIncome + " * 15% = " + result);
                resultReturn = resultReturn + result;        
                break;
            }
        case (annualIncome > 250000000):
            if(annualIncome > 500000000){
                let sisaAnnual = 0;
                if((calAnnualIncome - 500000000) <= 50000000){
                    sisaAnnual = calAnnualIncome - 50000000;
                }else{
                    sisaAnnual = 500000000;
                }
                result = ((25/100) * sisaAnnual);
                calAnnualIncome = calAnnualIncome - sisaAnnual;
                resultTest.push(sisaAnnual + " * 25% = " + result);
                resultReturn = resultReturn + result;        
            }else{
                result = ((25/100) * calAnnualIncome);
                resultTest.push(calAnnualIncome + " * 25% = " + result);
                resultReturn = resultReturn + result;        
                break;
            }
        case (annualIncome > 500000000):
            result = ((35/100) * calAnnualIncome);
            resultTest.push(calAnnualIncome + " * 30% = " + result);
            resultReturn = resultReturn + result;        
            break;
    }

    return {result: resultReturn, rumus: resultTest};
  };

  export const taxRelif = (status) =>{
    let result = null;
    if(status == 'TK0'){
        result = 54000000;
    }else if(status = 'K0'){
        result = 58500000;
    }else if(status = 'K1'){
        result = 63000000;
    }else if(status = 'K2'){
        result = 67500000;
    }else if(status = 'K3'){
        result = 72000000;
    }
    return result;
  }

  