import React, { createContext, useState } from 'react';
import TipForm from './TipForm';
import ResultCard from './ResultCard';
import { TipObject } from '../types';


export default function TipCalculator() : React.JSX.Element {
    const [tipObj, setTipObj] = useState<TipObject>({bill: 0, percentage: 15, numPersons: 0});

    return (
        <div className={'calculator'}>
            <TipForm tipObj={tipObj} setTipObj={setTipObj}/>
            <ResultCard tipObj={tipObj} setTipObj={setTipObj}/>
        </div>
    )
}