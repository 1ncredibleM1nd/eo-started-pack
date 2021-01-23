import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores from '@stores/interface';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Icon } from '@ui'
import 'swiper/swiper.scss';

import 'swiper/components/navigation/navigation.scss';
// Install modules
SwiperCore.use([Navigation]);

type IProps = {
    selectSocial?: (social: string) => void;
}

const SmileMenu = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        const { selectSocial } = props;




        const swiperArrows = {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        }


        return (
            <div className="smile_menu">
                <Swiper
                    spaceBetween={0}
                    width={300}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation
                    {...swiperArrows}
                >
                    <SwiperSlide onClick={() => selectSocial('instagram')}>
                        <div className="smile_swiper_item">
                            <Icon className='icon_s lite-grey' name={`social_media_instagram`} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => selectSocial('facebook')}>
                        <div className="smile_swiper_item">
                            <Icon className='icon_s lite-grey' name={`social_media_facebook`} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => selectSocial('email')}>
                        <div className="smile_swiper_item">
                            <Icon className='icon_s lite-grey' name={`social_media_email`} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => selectSocial('ok')}>
                        <div className="smile_swiper_item">
                            <Icon className='icon_s lite-grey' name={`social_media_ok`} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => selectSocial('vk')}>
                        <div className="smile_swiper_item">
                            <Icon className='icon_s lite-grey' name={`social_media_vk`} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide onClick={() => selectSocial('telegram')}>
                        <div className="smile_swiper_item">
                            <Icon className='icon_s lite-grey' name={`social_media_telegram`} />
                        </div>
                    </SwiperSlide>
                    <div className="swiper-button-next">
                        <Icon className='icon_s lite-grey' name={`solid_chevron-right`} />
                    </div>
                    <div className="swiper-button-prev">
                        <Icon className='icon_s lite-grey' name={`solid_chevron-left`} />
                    </div>
                </Swiper>
            </div >
        );
    }));

export default SmileMenu;
