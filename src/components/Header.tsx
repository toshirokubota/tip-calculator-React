import React from 'react';
import { staticAsset } from '../libs';

export default function Header(): React.JSX.Element {
    return (
        <header className='flex justify-center mb-8'>
            <img src={staticAsset('/images/logo.svg')} alt='logo' />
        </header>
    )
}