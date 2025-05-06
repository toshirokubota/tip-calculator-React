import React, { useEffect, useState } from "react";
//import { calculateTipAmount } from "../libs";
import { TipObject } from "../types";
import { staticAsset } from "../libs";

export default function TipForm({tipObj, setTipObj, reset, setReset, setError}:
    {
        tipObj: TipObject,
        setTipObj: React.Dispatch<React.SetStateAction<TipObject>>,
        reset: boolean,
        setReset: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<boolean>>
    }): React.JSX.Element {

    const [customPercentageActive, setCustomPercentageActive] = useState<boolean>(false);
    const [formData, setFormData] = useState({
      bill: '',
      percentage: '',
      customPercentage: '',
      numPersons: '',
    });
    const [errorFlag, setErrorFlag] = useState({
      bill: false,
      percentage: false,
      numPersons: false,
    });
    //initialize the form data according to the tip object
    useEffect(()=>{
      setFormData(prev => ({...prev, 
        bill: tipObj.bill.toString(), 
        percentage: tipObj.percentage.toString(), 
        numPersons: tipObj.numPersons.toString()}))
    }, []);
    //reset all the states except the custom tip value
    useEffect(() => {
      if(reset) {
        setFormData(prev => {
          //console.log(reset, prev, tipObj); 
          return ({...prev, 
          bill:'0', 
          percentage:'15', 
          numPersons:'1'}); 
        });
        setTipObj({
          bill: 0, percentage: 15, numPersons: 1
        });
        setErrorFlag({bill: false, percentage: false, numPersons: false});
        setCustomPercentageActive(false);
        setReset(false);
      }
    }, [reset]);

    //error state update
    useEffect(()=>{
      if(Object.values(errorFlag).some(Boolean)) {
        setError(true);
      } else {
        setError(false);
      }
    }, [errorFlag]);

    const validator = (name: string, value: string) => {
      const num = Number(value);
      // console.log('validator', name, num);
      switch(name) {
        case 'bill': return (!isNaN(num) && num >= 0);
        case 'percentage': return (!isNaN(num) && num >= 0);
        case 'numPersons': return !isNaN(num) && num > 0 && Number.isInteger(num);
        default: return false;
      }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const name = (event.target as HTMLInputElement).name;
      const value = (event.target as HTMLInputElement).value;

      if(name === 'percentage') {
        if(event.target.id === "custom-perc-input" || event.target.id === "custom-perc"){
          setFormData(prev=> ({...prev, customPercentage: value}));
          setCustomPercentageActive(true);
          // console.log(name, value, formData);
        } else {
          setFormData(prev=> ({...prev, percentage: value}));
          setCustomPercentageActive(false);
          // console.log(name, value, formData);
        }
      } else {
        setFormData(prev => ({...prev, [name]: value}))
      }
      if(validator(name, value)) {
        if(event.target.id === "custom-perc-input"){
          setTipObj(prev => ({...prev, percentage: Number(value)}));
        } else {
          setTipObj(prev => ({...prev, [name]: Number(value)}));
        }
        setErrorFlag(prev => ({...prev, [name]: false}))
      } else {
        setErrorFlag(prev => ({...prev, [name]: true}))
      }
    }

  return (
    <form className='flex flex-col gap-4'>
      <div className="input-card flex flex-col gap-4">
        <div className="bill">
          <div className="flex flex-row justify-between">
            <label htmlFor='bill-dollars' className='text-base font-bold dark-grayish-cyan'>Bill</label>
            {errorFlag.bill && <p className="text-sm error-msg">Invalid bill amount</p>}
          </div>
          <input
            type="text"
            name="bill"
            id="bill-dollars"
            placeholder="0"
            className={`error-target ${errorFlag.bill ? 'invalid': ''}`}
            value={formData.bill}
            onChange={handleChange}
            style={{backgroundImage: `url(${staticAsset('/images/icon-dollar.svg')})`}}
          />
        </div>
        <div className="tip">
          <div className="flex flex-row justify-between">
            <h1 className='text-base font-bold dark-grayish-cyan'>Select Tip %</h1>
            {(errorFlag.percentage) && <p className="text-sm error-msg">Invalid tip percentage</p>}
          </div>
          <fieldset className="tip-selection">
            <div className="radio-container">
              <input type="radio" name="percentage" id="five-perc" value="5" 
                onChange={handleChange} checked={!customPercentageActive && tipObj.percentage === 5}/>
              <label htmlFor="five-perc">5%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="percentage" id="ten-perc" value="10" 
                onChange={handleChange} checked={!customPercentageActive && tipObj.percentage === 10}/>
              <label htmlFor="ten-perc">10%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="percentage" id="fifteen-perc" value="15" 
                onChange={handleChange} checked={!customPercentageActive && tipObj.percentage === 15}/>
              <label htmlFor="fifteen-perc">15%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="percentage" id="twentyfive-perc" value="25" 
                onChange={handleChange} checked={!customPercentageActive && tipObj.percentage === 25}/>
              <label htmlFor="twentyfive-perc">25%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="percentage" id="fifty-perc" value="50" 
                onChange={handleChange} checked={!customPercentageActive && tipObj.percentage === 50}/>
              <label htmlFor="fifty-perc">50%</label>
            </div>
            <div className="custom radio-container">
              <input type="radio" name="percentage" id="custom-perc" value={formData.customPercentage}
                onChange={handleChange} 
                checked={customPercentageActive}/>
              <label htmlFor="custom-perc">Custom</label>
              <input
                type="text"
                id="custom-perc-input"
                name="percentage"
                placeholder="0"
                className={`error-target ${errorFlag.percentage ? 'invalid': ''}`}
                value={formData.customPercentage}
                onChange={handleChange}
              />
              <label htmlFor="custom-perc-input" className="sr-only">Custom Input</label>
              <span>%</span>
            </div>
          </fieldset>
        </div>
        <div className="party">
          <div className="flex flex-row justify-between">
            <label htmlFor='num-people' className='text-base font-bold dark-grayish-cyan'>Number of People</label>
            {errorFlag.numPersons && <p className="text-sm error-msg">Invalid # people</p>}
          </div>
          <input
            type="text"
            name="numPersons"
            id="num-people"
            placeholder="0"
            className={`error-target ${errorFlag.numPersons ? 'invalid': ''}`}
            value={formData.numPersons}
            onChange={handleChange}
            style={{backgroundImage: `url(${staticAsset('/images/icon-person.svg')})`}}
          />
        </div>
      </div>
    </form>
  );
}
