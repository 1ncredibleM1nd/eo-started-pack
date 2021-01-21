import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores from '@stores/interface';


type IProps = {

}

const Header = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;


        return (
            <div className="header">
                Header
            </div>
        );
    }));

export default Header;
