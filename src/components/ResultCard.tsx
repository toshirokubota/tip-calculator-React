import React from 'react';
import { TipObject } from '../types';
import { calculateTipAmount, calculateTotalAmount } from '../libs';

export default function ResultCard({tipObj, setTipObj}:
    {
        tipObj: TipObject,
        setTipObj: React.Dispatch<React.SetStateAction<TipObject>>
    }) : React.JSX.Element {

    const tipAmount = calculateTipAmount(tipObj.bill, tipObj.percentage);
    const totalAmount = calculateTotalAmount(tipObj.bill, tipObj.percentage);
    const tipPerPerson = tipObj.numPersons > 0 ? tipAmount / tipObj.numPersons: 'NA';
    const totalPerPerson = tipObj.numPersons > 0 ? totalAmount / tipObj.numPersons: 'NA';

    function resetTipObj() {
        setTipObj({bill: 0, percentage: 15, numPersons: 0});
    }
    
    return (
        <div className="result-card">
        <div className="result-entry">
          <div className="result-caption">
            <h2>
              Tip Amount
            </h2>
            <h3>
              / person
            </h3>
          </div>
          <div id="tip-amount" className="result-dollars error-target">{tipPerPerson}</div>
        </div>
        <div className="result-entry">
          <div className="result-caption">
            <h2>
              Total
            </h2>
            <h3>
              / person
            </h3>
          </div>
          <div id="total-amount" className="result-dollars error-target">{totalPerPerson}</div>
        </div>    
        <button id="reset-button" onClick={resetTipObj}>Reset</button>
      </div>
        
    )
}
