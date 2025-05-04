import React from "react";
//import { calculateTipAmount } from "../libs";
import { TipObject } from "../types";

export default function TipForm({tipObj, setTipObj}:
    {
        tipObj: TipObject,
        setTipObj: React.Dispatch<React.SetStateAction<TipObject>>
    }): React.JSX.Element {
        
    function handleBillChange(event: React.ChangeEvent<HTMLInputElement>) {
        const bill = Number((event.target as HTMLInputElement).value);
        setTipObj({...tipObj, bill: bill});
    }
    function handleTipPercChange(event: React.ChangeEvent<HTMLInputElement>) {
        const perc = Number((event.target as HTMLInputElement).value);
        setTipObj({...tipObj, percentage: perc});
    }
    function handleNumPersonsChange(event: React.ChangeEvent<HTMLInputElement>) {
        const np = Number((event.target as HTMLInputElement).value);
        setTipObj({...tipObj, numPersons: np});
    }

  return (
    <form>
      <div className="input-card">
        <div className="bill">
          <div className="input-head">
            <h1>Bill</h1>
            <p className="error-msg"></p>
          </div>
          <input
            type="text"
            name="currency"
            id="bill-dollars"
            placeholder="0"
            className="error-target"
            onChange={handleBillChange}
          />
        </div>
        <div className="tip">
          <div className="input-head">
            <h1>Select Tip %</h1>
            <p className="error-msg"></p>
          </div>
          <fieldset className="tip-selection">
            <div className="radio-container">
              <input type="radio" name="tip-choice" id="five-perc" value="5" onChange={handleTipPercChange}/>
              <label htmlFor="five-perc">5%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="tip-choice" id="ten-perc" value="10" onChange={handleTipPercChange}/>
              <label htmlFor="ten-perc">10%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="tip-choice" id="fifteen-perc" value="15" onChange={handleTipPercChange}/>
              <label htmlFor="fifteen-perc">15%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="tip-choice" id="twentyfive-perc" value="25" onChange={handleTipPercChange}/>
              <label htmlFor="twentyfive-perc">25%</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="tip-choice" id="fifty-perc" value="50" onChange={handleTipPercChange}/>
              <label htmlFor="fifty-perc">50%</label>
            </div>
            <div className="custom radio-container">
              <input type="radio" name="tip-choice" id="custom-perc" value="custom"/>
              <label htmlFor="custom-perc">Custom</label>
              <input
                type="text"
                id="custom-perc-input"
                name="percentage"
                placeholder="0"
                className="error-target"
                onChange={handleTipPercChange}
              />
              <span>%</span>
            </div>
          </fieldset>
        </div>
        <div className="party">
          <div className="input-head">
            <h1>Number of People</h1>
            <p className="error-msg"></p>
          </div>
          <input
            type="text"
            name="count"
            id="num-people"
            placeholder="0"
            className="error-target"
            onChange={handleNumPersonsChange}
          />
        </div>
      </div>
    </form>
  );
}
