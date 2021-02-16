import React from 'react';
import { useClassName } from '@hooks';
import './Preloader.scss';

const Preloader = () => {
    const { cn } = useClassName('preloader');
    return (
        <div className={cn()}>

        </div>
    );
};

export default Preloader;