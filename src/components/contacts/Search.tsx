import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores from '@stores/interface';
import './Contact.scss'

type IProps = {

}

const Search = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;


        return (
            <div className="search">
                Search
            </div>
        );
    }));

export default Search;
