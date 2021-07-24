import React, { Component } from 'react';
import './app.scss';
import { optRelief } from './data';
import NumberFormat from 'react-number-format';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            txtNama : '',
            txtIncome : 0,
            txtRelief: 54000000,
            txtTaxIncome: null,
            txtTaxableIncome : 0,
            txtTaxableFormula : 0,
            show : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render(){
        return(
            <>
            <div className="container">
                <div className="input-container">
                    <div className="group-input">
                        <label>NAME</label>
                        <input
                            type="text"
                            className="data-input"
                            id="txtNama"
                            onChange={this.handleChange}
                            placeholder='type name'
                            disabled={this.state.show}
                        />
                    </div>
                    <div className="group-input">
                        <label>INCOME</label>
                        <input
                            type="number"
                            className="data-input"
                            id="txtIncome"
                            onChange={this.handleChange}
                            placeholder='type income'
                            disabled={this.state.show}
                        />
                    </div>
                    <div className="group-input">
                        <label>STATUS</label>
                        <select id="txtRelief" className="data-input" onChange={this.handleChange} value={this.state.txtRelief} 
                            disabled={this.state.show}>
                            {optRelief.map((p, i) => 
                                <option key={i} value={p.reliefval}>{p.status}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={this.handleSubmit}>{this.state.show ? 'RECALCULATE' : 'CALCULATE'}</button>
                </div>
            </div>
            {this.state.show && 
            <div className="container">
                <h1>Detail Tax</h1>
                <div className="input-container">
                    <div className="group-input">
                        <div className="output-label">NAMA</div><div className="output-titik">:</div>
                        <div className="data-output">{this.state.txtNama}</div>
                    </div>
                    <div className="group-input">
                        <div className="output-label">INCOME 1 MONTH </div><div className="output-titik">:</div>
                        <div className="data-output">{formatter.format(this.state.txtIncome)}</div>
                    </div>
                    <div className="group-input">
                        <div className="output-label">INCOME 1 YEAR </div><div className="output-titik">:</div>
                        <div className="data-output">{formatter.format(this.state.txtIncome * 12)}</div>
                    </div>
                    <div className="group-input">
                        <div className="output-label">RELIEF</div><div className="output-titik">:</div>
                        <div className="data-output">{formatter.format(this.state.txtRelief)}</div>
                    </div>
                    <div className="group-input">
                        <div className="output-label">TAX</div><div className="output-titik">:</div>
                        <div className="data-output">{this.state.txtTaxIncome > 0 ? formatter.format(this.state.txtTaxIncome) : formatter.format(0)}</div>
                    </div>
                    <div className="group-input">
                        <div className="output-label">TAXABLE</div><div className="output-titik">:</div>
                        <div className="data-output">{formatter.format(this.state.txtTaxableIncome)}</div>
                    </div>
                </div>
            </div>
            }
            </>
        )
    }

    handleSubmit(){     
        this.setState(prevState => ({
            show: !prevState.show
        }));
        let valTax = parseInt(this.state.txtIncome * 12) - parseInt(this.state.txtRelief)
        let resultReturn = null;
        let result = null;
        let calAnnualIncome = valTax;
        let resultTest = [];

        if(valTax > 0){
            switch(true){
                case (valTax > 0):
                    if(valTax > 50000000){
                        result = ((5/100) * 50000000);
                        calAnnualIncome = calAnnualIncome - 50000000;
                        resultTest.push("50000000 * 5% = " + result);
                        resultReturn = resultReturn + result;               
                    }else{
                        result = ((5/100) * valTax);
                        resultTest.push(valTax + " * 5% = " + result);
                        resultReturn = resultReturn + result;        
                        break;
                    }    
                case (valTax > 50000000):
                    if(valTax >= 250000000){
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
                case (valTax > 250000000):
                    if(valTax > 500000000){
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
                case (valTax > 500000000):
                    result = ((35/100) * calAnnualIncome);
                    resultTest.push(calAnnualIncome + " * 30% = " + result);
                    resultReturn = resultReturn + result;        
                    break;
            }
        }
        this.setState({txtTaxableIncome: resultReturn, txtTaxableFormula: resultTest, txtTaxIncome: valTax});
    }

    handleChange(event){
        event.preventDefault();
        this.setState({ [event.target.id]: event.target.value });
    };
    
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
});


export default App;