import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import IStores from '@stores/interface';
import './Contact.scss'
import { Icon } from '@ui'


type IProps = {

}

const Search = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;

        const [searchText, setSearchText] = useState('')

        const onChange = (value: string) => {
            setSearchText(value)
        }


        return (
            <div className="search">
                <div className="search-filter">
                    <Icon name='solid_sliders-h' className='icon_s blue-lite' />
                </div>
                <div className="search-input">
                    <input type="text" placeholder="Поиск..." value={searchText} onChange={(e) => onChange(e.target.value)} />
                </div>
                <div className="search-btn">
                    <Icon name='solid_search' className='icon_s blue-lite' />
                </div>
            </div>
        );
    }));

export default Search;
