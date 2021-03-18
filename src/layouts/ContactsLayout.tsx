import React from 'react';
import {inject, observer} from 'mobx-react';
import IStores from '@stores/interface';
import Search from '@components/contacts/Search'
import ContactList from '@components/contacts/ContactList'

type IProps = {}

const ContactLayout = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;

        return (
            <div className="contact_layout">
                <Search/>
                <ContactList/>
            </div>
        );
    }));

export default ContactLayout;
