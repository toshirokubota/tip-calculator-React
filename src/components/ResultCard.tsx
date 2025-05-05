import React from 'react';
import { TipObject } from '../types';
import { calculateTipAmount, calculateTotalAmount } from '../libs';

export default function ResultCard({tipObj, setReset}:
    {
        tipObj: TipObject,
        setReset: React.Dispatch<React.SetStateAction<boolean>>
    }) : React.JSX.Element {

    const tipAmount = calculateTipAmount(tipObj.bill, tipObj.percentage);
    const totalAmount = calculateTotalAmount(tipObj.bill, tipObj.percentage);
    const tipPerPerson = tipObj.numPersons > 0 ? (tipAmount / tipObj.numPersons).toFixed(2): 'NA';
    const totalPerPerson = tipObj.numPersons > 0 ? (totalAmount / tipObj.numPersons).toFixed(2): 'NA';
    
    return (
        <div className="result-card">
        <div className="result-entry">
          <div className="result-caption">
            <h2 className='text-lg font-bold'>
              Tip Amount
            </h2>
            <h3 className='text-sm'>
              / person
            </h3>
          </div>
          <div id="tip-amount" className="result-dollars error-target">{tipPerPerson}</div>
        </div>
        <div className="result-entry">
          <div className="result-caption">
            <h2 className='text-lg font-bold'>
              Total
            </h2>
            <h3 className='text-sm'>
              / person
            </h3>
          </div>
          <div id="total-amount" className="result-dollars error-target">{totalPerPerson}</div>
        </div>    
        <button id="reset-button" onClick={()=>setReset(true)}>Reset</button>
      </div>
        
    )
}
