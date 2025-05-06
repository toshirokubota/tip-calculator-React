import React, { useEffect, useState } from 'react';
import TipForm from './TipForm';
import ResultCard from './ResultCard';
import { TipObject } from '../types';


export default function TipCalculator() : React.JSX.Element {
    const [tipObj, setTipObj] = useState<TipObject>({bill: 0, percentage: 15, numPersons: 1});
    const [reset, setReset] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    return (
        <div className={'calculator'}>
            <TipForm tipObj={tipObj} setTipObj={setTipObj} reset={reset} setReset={setReset} setError={setError}/>
            <ResultCard tipObj={tipObj} setReset={setReset} error={error}/>
        </div>
    )
}