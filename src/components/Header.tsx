import React from 'react';
import { staticAsset } from '../libs';

export default function Header(): React.JSX.Element {
    return (
        <div>
            <img src={staticAsset('/images/logo.svg')} alt='logo' />
        </div>
    )
}