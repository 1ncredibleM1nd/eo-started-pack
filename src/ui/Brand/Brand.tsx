import React from 'react';
import { useClassName } from '@hooks';
import Icon from '@ui/Icon/Icon';

import './Brand.scss';

type IProps = {
    isPreview?: boolean;
}

const Brand = (props: IProps & React.HTMLAttributes<HTMLDivElement>) => {
    const { cn } = useClassName('brand');
    return (
        <div className={cn()}>
            <div className={cn('wrapper')}>
                <Icon className={cn('icon')} name={'logo'} />
            </div>
        </div>
    );
};

export default Brand;