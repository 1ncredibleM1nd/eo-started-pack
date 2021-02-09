import { action, observable } from "mobx";
import { IAppStore } from '@stores/interface';
import { contactStore, chatStore, userStore } from '@stores/implementation';
import { getConversations } from '@actions'

export class AppStore implements IAppStore {
    @observable loaded: boolean = false;
    @observable info_tab: string = 'none'
    @observable layout: string = 'contact'
    @observable school: string = 'turstar'


    @action
    setInfoTab(tab: string) {
        if (this.info_tab === tab) {
            this.info_tab = 'none';
        } else {
            this.info_tab = tab;
        }
    }

    @action
    setLayout(value: string) {
        this.layout = value;
    }

    @action
    async initialization() {
        try {
            //const res = await getData();
            const userData = [
                {
                    username: "Бильбо Бэггинс",
                    avatar: 'https://i.pinimg.com/736x/9a/bd/a5/9abda5b52a61284f7e39101cd84edfd2--hobbit--lord-of-the-rings.jpg',
                    id: "user_0",
                    avaliableSocial: {
                        "whatsapp": true,
                        "instagram": true,
                        "vk": true,
                        "ok": true,
                        "viber": false,
                        "facebook": true,
                        "telegram": true,
                        "email": true
                    },
                    online: {
                        "whatsapp": 'В сети',
                        "instagram": '20д',
                        "vk": '10м',
                        "ok": '5м',
                        "facebook": '20м',
                        "telegram": '2ч',
                    },

                },
                {
                    username: "Гэндальф",
                    avatar: 'https://yt3.ggpht.com/a/AATXAJz4P6N4YZie5K342WgZxFKi4o-1YBRhpSnrWx5j=s900-c-k-c0xffffffff-no-rj-mo',
                    id: "user_1",
                    avaliableSocial: {
                        "whatsapp": false,
                        "instagram": true,
                        "vk": false,
                        "ok": false,
                        "viber": false,
                        "facebook": false,
                        "telegram": true,
                        "email": false
                    },
                    online: {
                        "whatsapp": 'В сети',
                        "instagram": '20д',
                        "vk": '10м',
                        "ok": '5м',
                        "facebook": '20м',
                        "telegram": '2ч',
                    },
                    info: {
                        instagram: {
                            nickname: 'gendalf_white',
                            about: 'Гэндальф предстаёт мудрым, могучим чародеем, состоящим в Совете Мудрых и помогающим слабым.'
                        },
                        telegram: {
                            nickname: '@gendalf',
                            phone: '+420 782 331 331',
                            about: 'Гэндальф предстаёт мудрым, могучим чародеем, состоящим в Совете Мудрых и помогающим слабым.'
                        },
                        whatsapp: {
                            nickname: 'Гэндальф Белый',
                            phone: '+420 782 331 331',
                        },
                        vk: {
                            nickname: 'Гэндальф Белый',
                            link: 'https://vk.com/gendalf',
                        },
                        ok: {
                            nickname: 'Гэндальф Белый',
                            link: 'https://ok.ru/',
                        },
                        facebook: {
                            nickname: 'Гэндальф Белый',
                            link: 'https://facebook.com',
                        }
                    }
                },
                {
                    username: "Терминатор",
                    avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
                    id: "user_2",
                    avaliableSocial: {
                        "whatsapp": true,
                        "instagram": true,
                        "vk": true,
                        "ok": true,
                        "viber": true,
                        "facebook": true,
                        "telegram": true,
                        "email": true
                    },
                    online: {
                        "whatsapp": '1ч',
                        "instagram": 'В сети',
                        "vk": '3ч',
                        "ok": 'В сети',
                        "facebook": 'В сети',
                        "viber": '20м',
                        "telegram": '5м',
                    },
                    info: {
                        instagram: {
                            nickname: 'i_will_be_back',
                        },
                        telegram: {
                            nickname: '@i_will_be_back',
                            phone: '+420 782 331 331',
                            about: 'Главный антагонист фильма «Терминатор 2: Судный день» и один из антагонистов в фильме «Терминатор: Генезис».'
                        },
                        whatsapp: {
                            nickname: 'Терминатор Т-1000',
                            phone: '+420 782 331 331',
                        },
                        vk: {
                            nickname: 'Терминатор Т-1000',
                            link: 'https://vk.com/gendalf',
                        },
                        ok: {
                            nickname: 'Терминатор Т-1000',
                            link: 'https://ok.ru/',
                        },
                        facebook: {
                            nickname: 'Терминатор Т-1000',
                            link: 'https://facebook.com',
                            about: 'Главный антагонист фильма «Терминатор 2: Судный день» и один из антагонистов в фильме «Терминатор: Генезис».'
                        }
                    }
                },
                {
                    username: "Джон Конор",
                    avatar: 'https://img.filmsactu.net/datas/films/t/e/terminator-6-dark-fate/xl/terminator-6-dark-fate-5d30d97b7f96a.jpg',
                    id: "user_3",
                    avaliableSocial: {
                        "whatsapp": false,
                        "instagram": true,
                        "vk": false,
                        "ok": false,
                        "viber": false,
                        "facebook": false,
                        "telegram": false,
                        "email": false
                    },
                    online: {
                        "whatsapp": '5д',
                        "instagram": '20д',
                        "vk": '10м',
                        "ok": '5м',
                        "facebook": '20м',
                        "telegram": '2ч',
                    },

                    info: {
                        instagram: {
                            nickname: 'jonh_connor',
                            about: 'После ядерной войны, которую в недалёком будущем развязал искусственный интеллект министерства обороны США «Скайнет», человечество было порабощено машинами и оказалось на грани уничтожения. '
                        },
                        telegram: {
                            nickname: '@jonh_connor',
                            phone: '+420 782 331 331',
                        },
                        whatsapp: {
                            nickname: 'Джон Конор',
                            phone: '+420 782 331 331',
                        },
                        vk: {
                            nickname: 'Джон Конор',
                            link: 'https://vk.com/gendalf',
                            about: 'После ядерной войны, которую в недалёком будущем развязал искусственный интеллект министерства обороны США «Скайнет», человечество было порабощено машинами и оказалось на грани уничтожения. '
                        },
                        ok: {
                            nickname: 'Джон Конор',
                            link: 'https://ok.ru/',
                            about: 'После ядерной войны, которую в недалёком будущем развязал искусственный интеллект министерства обороны США «Скайнет», человечество было порабощено машинами и оказалось на грани уничтожения. '
                        },
                        facebook: {
                            nickname: 'Джон Конор',
                            link: 'https://facebook.com',
                            about: 'После ядерной войны, которую в недалёком будущем развязал искусственный интеллект министерства обороны США «Скайнет», человечество было порабощено машинами и оказалось на грани уничтожения. '
                        }
                    }
                },
            ]

            // const contactData = [
            //     {
            //         name: "Гэндальф",
            //         user: [
            //             "user_0",
            //             "user_1",
            //         ],
            //         last_message_id: 'msg_4',
            //         status: 'readed',
            //         online: false,
            //         chat_id: 'чат_1',
            //         avatar: 'https://yt3.ggpht.com/a/AATXAJz4P6N4YZie5K342WgZxFKi4o-1YBRhpSnrWx5j=s900-c-k-c0xffffffff-no-rj-mo',
            //         id: "contact_0",
            //         attachments: [
            //             {
            //                 url: 'https://mota.ru/upload/wallpapers/source/2017/01/23/09/01/51630/mota.ru_2017012314.jpg',
            //                 'social_media': 'viber',
            //                 time: '18:59',
            //                 date: '02.01.21',
            //             },
            //             {
            //                 url: 'https://static.novayagazeta.ru/storage/content/pictures/378/content_001_________4.jpg',
            //                 'social_media': 'whatsapp',
            //                 time: '18:59',
            //                 date: '12.01.21',
            //             },
            //             {
            //                 url: 'https://sun9-5.userapi.com/orVHrCycrUQoYA4sDC6NIrJ7VIStWORmdIlBKw/uk_-Bfsdu3o.jpg',
            //                 'social_media': 'telegram',
            //                 time: '18:59',
            //                 date: '14.01.21',
            //             },
            //             {
            //                 url: 'https://million-wallpapers.ru/wallpapers/1/65/15650858132982218467/movie-film-the-lord-of-the-rings-vlastelin-kolec-frodo.jpg',
            //                 'social_media': 'facebook',
            //                 time: '18:59',
            //                 date: '25.09.11',
            //             },
            //             {
            //                 url: 'https://cdn.wccftech.com/wp-content/uploads/2020/02/Daedalic-Entertainment-Struggling-Lord-of-the-Rings-Gollum-in-Trouble-01-Gollum-Header.jpg',
            //                 'social_media': 'instagram',
            //                 time: '18:59',
            //                 date: '15.11.20',
            //             }
            //         ],
            //     },
            //     {
            //         user: [
            //             "user_2",
            //             "user_3",
            //             "user_0"
            //         ],
            //         chat_id: 'чат_2',
            //         status: 'readed',
            //         last_message_id: 'msg_16',
            //         online: false,
            //         name: 'Терминатор CLUB',
            //         avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
            //         id: "contact_1",
            //         attachments: [
            //             {
            //                 url: 'https://s1.1zoom.ru/big3/973/Terminator_Genisys_504993.jpg',
            //                 'social_media': 'whatsapp',
            //                 time: '18:59',
            //                 date: '12.01.21',
            //             },
            //             {
            //                 url: 'https://avatars.mds.yandex.net/get-zen_doc/1716911/pub_5de407294e057700b07136a0_5de40aa9d7859b00b1892d6f/orig',
            //                 'social_media': 'telegram',
            //                 time: '18:59',
            //                 date: '14.01.21',
            //             },
            //             {
            //                 url: 'https://ovideo.ru/images/gallery/0005/0898/0003.jpg',
            //                 'social_media': 'facebook',
            //                 time: '18:59',
            //                 date: '25.09.11',
            //             },
            //             {
            //                 url: 'https://wp.stanforddaily.com/wp-content/uploads/2015/07/terminator.jpg',
            //                 'social_media': 'instagram',
            //                 time: '18:59',
            //                 date: '15.11.20',
            //             }
            //         ],
            //     },
            //     {
            //         user: [
            //             "user_2",
            //             "user_0"
            //         ],
            //         chat_id: 'чат_3',
            //         status: 'unread',
            //         last_message_id: 'msg_2',
            //         online: true,
            //         name: 'Терминатор',
            //         avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
            //         id: "contact_2",
            //         attachments: [
            //             {
            //                 url: 'https://s1.1zoom.ru/big3/973/Terminator_Genisys_504993.jpg',
            //                 'social_media': 'whatsapp',
            //                 time: '18:59',
            //                 date: '12.01.21',
            //             },
            //             {
            //                 url: 'https://avatars.mds.yandex.net/get-zen_doc/1716911/pub_5de407294e057700b07136a0_5de40aa9d7859b00b1892d6f/orig',
            //                 'social_media': 'telegram',
            //                 time: '18:59',
            //                 date: '14.01.21',
            //             },
            //             {
            //                 url: 'https://ovideo.ru/images/gallery/0005/0898/0003.jpg',
            //                 'social_media': 'facebook',
            //                 time: '18:59',
            //                 date: '25.09.11',
            //             },
            //             {
            //                 url: 'https://wp.stanforddaily.com/wp-content/uploads/2015/07/terminator.jpg',
            //                 'social_media': 'instagram',
            //                 time: '18:59',
            //                 date: '15.11.20',
            //             }
            //         ],
            //     }
            // ]

            // const chatData: any = [
            //     {
            //         contact_id: 'contact_0',
            //         id: 'чат_1',
            //         activeSocial: 'telegram',
            //         role: [
            //             {
            //                 id: "user_1",
            //                 name: 'Белый маг',
            //                 status: 'default'
            //             }
            //         ],
            //         user: [
            //             "user_1",
            //             "user_0"
            //         ],
            //         msg: [
            //             {
            //                 id: 'msg_0',
            //                 from: "user_1",
            //                 time: '17:31',
            //                 date: '15.01.21',
            //                 social_media: 'telegram',
            //                 readed: true,
            //                 editted: false,
            //                 smiles: [],
            //                 content: 'Ты изменился, Бильбо Бэггинс. Ты уже не тот хоббит, который оставил Шир...'
            //             },
            //             {
            //                 id: 'msg_1',
            //                 from: "user_0",
            //                 time: '17:31',
            //                 date: '15.01.21',
            //                 readed: true,
            //                 social_media: 'telegram',
            //                 editted: false,
            //                 smiles: [],
            //                 content: 'Я хотел сказать тебе... Я нашел кое-что в гоблинских туннелях.'
            //             },
            //             {
            //                 id: 'msg_2',
            //                 from: "user_1",
            //                 time: '17:32',
            //                 date: '15.01.21',
            //                 readed: true,
            //                 social_media: 'telegram',
            //                 editted: false,
            //                 smiles: [],
            //                 content: 'Что нашел? Что ты нашел?'
            //             },
            //             {
            //                 id: 'msg_3',
            //                 from: "user_0",
            //                 time: '17:33',
            //                 date: '15.01.21',
            //                 readed: true,
            //                 social_media: 'telegram',
            //                 editted: false,
            //                 smiles: [],
            //                 content: 'Свою храбрость.'
            //             },
            //             {
            //                 id: 'msg_4',
            //                 from: "user_1",
            //                 time: '17:33',
            //                 date: '15.01.21',
            //                 readed: true,
            //                 social_media: 'telegram',
            //                 editted: false,
            //                 smiles: [],
            //                 content: 'Хорошо. Очень хорошо. Тебе пригодится.'
            //             }
            //         ]
            //     },
            //     {
            //         contact_id: 'contact_1',
            //         id: 'чат_2',
            //         activeSocial: 'instagram',
            //         role: [
            //             {
            //                 id: "user_2",
            //                 name: 'Т-1000',
            //                 status: 'default'
            //             }
            //         ],
            //         user: [
            //             "user_2",
            //             "user_3",
            //             "user_0"
            //         ],
            //         msg: [
            //             {
            //                 id: 'msg_0',
            //                 from: "user_3",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '15.01.21',
            //                 time: '12:11',
            //                 content: 'Ты можешь обучаться тому, что в тебя не заложено? Чтобы ты был больше похож на человека? А не быть такой дубиной все время.'
            //             },
            //             {
            //                 id: 'msg_1',
            //                 from: "user_2",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '15.01.21',
            //                 time: '12:12',
            //                 content: 'Во мне нейро-сетевой процессор, способный к обучению. Чем больше я общаюсь с людьми, тем больше я о них узнаю.'
            //             },
            //             {
            //                 id: 'msg_2',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '15.01.21',
            //                 time: '14:51',
            //                 content: 'Это вообще моя вселенная?'
            //             },
            //             {
            //                 id: 'msg_3',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:51',
            //                 content: 'Это вообще моя вселенная?'
            //             },
            //             {
            //                 id: 'msg_4',
            //                 from: "user_2",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:51',
            //                 content: 'Вблизи срединно-океанических хребтов ламинарное движение меняет pадиотелескоп Максвелла. '
            //             },
            //             {
            //                 id: 'msg_5',
            //                 from: "user_3",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:51',
            //                 content: 'Калиево-натриевый полевой шпат неравномерен.'
            //             },
            //             {
            //                 id: 'msg_6',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:56',
            //                 content: 'Возмущающий фактор горизонально решает непреложный монтмориллонит'
            //             },
            //             {
            //                 id: 'msg_7',
            //                 from: "user_2",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:51',
            //                 content: 'Возмущающий фактор, после осторожного анализа, аккумулирует'
            //             },
            //             {
            //                 id: 'msg_8',
            //                 from: "user_3",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:51',
            //                 content: 'Эннием и записанного в "Больших анналах"'
            //             },
            //             {
            //                 id: 'msg_9',
            //                 from: "user_3",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '18.01.21',
            //                 time: '14:51',
            //                 content: 'Эннием и записанного в "Больших анналах", было вычислено время предшествовавших затмений солнца, начиная с того, которое в квинктильские ноны произошло в царствование Ромула.'
            //             },
            //             {
            //                 id: 'msg_10',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '21.01.21',
            //                 time: '14:51',
            //                 content: 'Эпоха, это удалось установить по характеру спектра, доступна.'
            //             },
            //             {
            //                 id: 'msg_11',
            //                 from: "user_2",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '21.01.21',
            //                 time: '14:51',
            //                 content: 'Недоступно поступает в вращательный излом.'
            //             },
            //             {
            //                 id: 'msg_12',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 smiles: [],
            //                 readed: true,
            //                 date: '21.01.21',
            //                 time: '14:51',
            //                 content: 'то можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек'
            //             },
            //             {
            //                 id: 'msg_13',
            //                 from: "user_3",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '21.01.21',
            //                 time: '14:51',
            //                 content: 'Возмущающий фактор, после осторожного анализа, аккумулирует эллиптический дип-скай объект'
            //             },
            //             {
            //                 id: 'msg_14',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '22.01.21',
            //                 time: '14:51',
            //                 content: 'Эпоха, это удалось установить по характеру спектра, доступна. '
            //             },
            //             {
            //                 id: 'msg_15',
            //                 from: "user_0",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '22.01.21',
            //                 time: '21:51',
            //                 content: 'Возмущающий фактор'
            //             },
            //             {
            //                 id: 'msg_16',
            //                 from: "user_3",
            //                 social_media: 'instagram',
            //                 editted: false,
            //                 readed: true,
            //                 smiles: [],
            //                 date: '22.01.21',
            //                 time: '14:51',
            //                 content: 'Фирновый плейстоцен.'
            //             },
            //         ]
            //     },
            //     {
            //         contact_id: 'contact_2',
            //         id: 'чат_3',
            //         activeSocial: 'instagram',
            //         role: [
            //             {
            //                 id: "user_2",
            //                 name: 'Т-1000',
            //                 status: 'default'
            //             }
            //         ],
            //         user: [
            //             "user_2",
            //             "user_0"
            //         ],
            //         msg: [
            //             {
            //                 id: 'msg_0',
            //                 from: "user_2",
            //                 social_media: 'ok',
            //                 editted: false,
            //                 readed: false,
            //                 smiles: [],
            //                 date: '24.01.21',
            //                 time: '05:12',
            //                 content: 'Спишь?'
            //             },
            //             {
            //                 id: 'msg_1',
            //                 from: "user_2",
            //                 social_media: 'ok',
            //                 editted: false,
            //                 readed: false,
            //                 smiles: [],
            //                 date: '24.01.21',
            //                 time: '09:12',
            //                 content: 'Я вижу что ты онлайн'
            //             },
            //             {
            //                 id: 'msg_2',
            //                 from: "user_2",
            //                 social_media: 'ok',
            //                 editted: false,
            //                 readed: false,
            //                 smiles: [],
            //                 date: '24.01.21',
            //                 time: '09:12',
            //                 content: 'АУУУУУУ, ты живой?'
            //             },
            //         ]
            //     }
            // ]

            const hero = {
                username: "Бильбо Бэггинс",
                avatar: 'https://i.pinimg.com/736x/9a/bd/a5/9abda5b52a61284f7e39101cd84edfd2--hobbit--lord-of-the-rings.jpg',
                id: "user_0",
                unic: '@bilbo_beggins'
            }


            var paramsString = document.location.search;
            var searchParams = new URLSearchParams(paramsString);
            this.school = searchParams.get("school");

            if (!this.school) this.school = 'turstar'
            let conversations = await getConversations(this.school)

            try {
                setInterval(async () => {
                    conversations = await getConversations(this.school)
                    await contactStore.init(conversations.data);
                    await chatStore.init(contactStore.activeContact);
                }, 1000)
            } catch (e) {
                throw new Error(e);
            }

            await userStore.initHero(hero)
            await userStore.init(userData)

            this.loaded = true
        } catch (e) {
            console.error(e);

        }
    };

}

export const appStore = new AppStore();