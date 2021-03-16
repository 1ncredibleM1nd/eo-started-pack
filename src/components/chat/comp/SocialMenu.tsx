import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores from '@stores/interface';
import { Icon } from '@ui'

type IProps = {
    selectSocial?: (social: string) => void;
}

const SmileMenu = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        const { selectSocial } = props;


        return (
            <div className="smile_menu">
                <div onClick={() => selectSocial('odnoklassniki')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_odnoklassniki`} />
                </div>
                <div onClick={() => selectSocial('vkontakte')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_vkontakte`} />
                </div>
                <div onClick={() => selectSocial('telegram')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_telegram`} />
                </div>
                {/* <div onClick={() => selectSocial('instagram')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_instagram`} />
                </div>
                <div onClick={() => selectSocial('facebook')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_facebook`} />
                </div>
                <div onClick={() => selectSocial('email')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_email`} />
                </div> */}
                {/* <div onClick={() => selectSocial('viber')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_viber`} />
                </div>
                <div onClick={() => selectSocial('whatsapp')} className="smile_swiper_item social">
                    <Icon className='icon_l lite-grey' name={`social_media_whatsapp`} />
                </div> */}
            </div >
        );
    }));

export default SmileMenu;
