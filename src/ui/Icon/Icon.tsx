import React from 'react';
import {useClassName} from '@hooks';
import './Icon.scss';

type TProps = {
    name: string;
    isSpin?: boolean;
}

const Icon = (props: TProps & React.SVGAttributes<SVGAElement>) => {
    const {cn, mergeClassName} = useClassName('icon');
    const {className, name, isSpin} = props;
    return (
        <svg className={mergeClassName(cn({'is-spin': isSpin}), className)}>
            <use xlinkHref={`#${name}`}/>
        </svg>
    );
}

export default Icon;
