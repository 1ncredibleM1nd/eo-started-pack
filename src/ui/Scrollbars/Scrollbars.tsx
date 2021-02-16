import React, {ReactNode} from 'react';

import {Scrollbars as ReactCustomScrollbars} from 'react-custom-scrollbars';
import {useClassName} from '@hooks';

import './Scrollbars.scss';

type TProps = {
    autoHide?: boolean;
    children: ReactNode
}

const Scrollbars = (props: TProps & React.HTMLAttributes<HTMLDivElement>) => {

    const {autoHide, children, className} = props;
    const {cn, mergeClassName} = useClassName('scrollbars');

    return (
        <ReactCustomScrollbars
            className={mergeClassName(cn(), className)}
            autoHide={autoHide}
            hideTracksWhenNotNeeded
            renderView={props => <div {...props} id={'scrollbars'} className={cn('view')}/>}
            renderTrackVertical={({style, ...props}) => {
                return (
                    <div {...props} className={cn('track-vertical')} style={{
                        ...style
                    }}/>
                );
            }

            }
            renderThumbVertical={({style, ...props}) =>
                <div {...props} className={cn('thumb-vertical')} style={{
                    ...style
                }}/>
            }
        >
            {children}
        </ReactCustomScrollbars>
    );
}

export default Scrollbars;