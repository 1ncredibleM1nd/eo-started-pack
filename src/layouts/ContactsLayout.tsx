import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores from '@stores/interface';
import Search from '@components/contacts/Search'
import MenuList from '@components/contacts/MenuList'

type IProps = {

}

const ContactLayout = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;


        return (
            <div className="contact_layout">
                <Search />
                <MenuList />
            </div>
        );
    }));

export default ContactLayout;
