import React from 'react';
import { TipObject } from '../types';
import { calculateTipAmount, calculateTotalAmount } from '../libs';

export default function ResultCard({tipObj, setReset, error}:
    {
        tipObj: TipObject,
        setReset: React.Dispatch<React.SetStateAction<boolean>>
        error: boolean
    }) : React.JSX.Element {

    const tipAmount = calculateTipAmount(tipObj.bill, tipObj.percentage);
    const totalAmount = calculateTotalAmount(tipObj.bill, tipObj.percentage);
    const tipPerPerson = !error ? (tipAmount / tipObj.numPersons).toFixed(2): 'NA';
    const totalPerPerson = !error ? (totalAmount / tipObj.numPersons).toFixed(2): 'NA';
    
    return (
        <div className="result-card">
        <div className="flex flex-row justify-between sm:my-12">
          <div>
            <h2 className='text-lg font-bold'>
              Tip Amount
            </h2>
            <h3 className='text-sm'>
              / person
            </h3>
          </div>
          <div id="tip-amount" data-testid='tip-amount' 
            className={`${error ? 'invalid': ''} ' result-dollars text-3xl font-bold'`}
          >{tipPerPerson}</div>
        </div>
        <div className="flex flex-row justify-between sm:my-12">
          <div>
            <h2 className='text-lg font-bold'>
              Total
            </h2>
            <h3 className='text-sm'>
              / person
            </h3>
          </div>
          <div id="total-amount" data-testid='total-amount' 
          className={`${error ? 'invalid': ''} ' result-dollars text-3xl font-bold'`}
          > {totalPerPerson}</div>
        </div>    
        <button id="reset-button" onClick={()=>setReset(true)}>Reset</button>
      </div>
        
    )
}
