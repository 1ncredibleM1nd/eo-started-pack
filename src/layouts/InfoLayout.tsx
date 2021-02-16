import React from 'react';
import {inject, observer} from 'mobx-react';
import IStores, {IAppStore} from '@stores/interface';
import {Button} from 'antd'
import {Icon} from '@ui'

type IProps = {
    appStore?: IAppStore
}

const InfoLayout = inject((stores: IStores) => ({appStore: stores.appStore}))(
    observer((props: IProps) => {

        const {appStore} = props;

        return (
            <div className="info_layout">
                <div className="back_trigger info">
                    <Button onClick={() => appStore.setLayout('chat')} className='transparent'>
                        <Icon className='icon_s blue-lite' name={`solid_arrow-left`}/>
                    </Button>
                </div>
                {/*<User/>*/}
            </div>
        );
    }));


export default InfoLayout;
