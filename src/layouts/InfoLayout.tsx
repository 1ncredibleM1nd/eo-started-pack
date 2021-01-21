import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IAppStore } from '@stores/interface';

type IProps = {

}

const InfoLayout = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;


        return (
            <div className="info_layout">
                INFO LAYOUT
            </div>
        );
    }));

export default InfoLayout;
