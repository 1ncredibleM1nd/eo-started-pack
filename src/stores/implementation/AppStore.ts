import { action, observable } from "mobx";
import { IAppStore } from '@stores/interface';
import { contactStore, chatStore, userStore } from '@stores/implementation';

export class AppStore implements IAppStore {

    @observable loaded: boolean = false;

    @action.bound
    async initialization() {
        try {
            //const res = await getData();

            const contactData = [
                {
                    name: "Гэндальф",
                    user: [
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
                                "whatsapp": '5д назад',
                                "instagram": '20д назад',
                                "vk": '10м назад',
                                "ok": '5м назад',
                                "facebook": '20м назад',
                                "telegram": '2ч назад',
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
                                "whatsapp": '5д назад',
                                "instagram": '20д назад',
                                "vk": '10м назад',
                                "ok": '5м назад',
                                "facebook": '20м назад',
                                "telegram": '2ч назад',
                            },
                        },
                    ],
                    last_msg: 'msg_4',
                    status: 'readed',
                    online: false,
                    chat_id: 'чат_1',
                    avatar: 'https://yt3.ggpht.com/a/AATXAJz4P6N4YZie5K342WgZxFKi4o-1YBRhpSnrWx5j=s900-c-k-c0xffffffff-no-rj-mo',
                    id: "contact_0"
                },
                {
                    user: [
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
                                "whatsapp": 'В сети',
                                "instagram": 'В сети',
                                "vk": 'В сети',
                                "ok": 'В сети',
                                "facebook": 'В сети',
                                "viber": 'В сети',
                                "telegram": 'В сети',
                            },
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
                                "whatsapp": '5д назад',
                                "instagram": '20д назад',
                                "vk": '10м назад',
                                "ok": '5м назад',
                                "facebook": '20м назад',
                                "telegram": '2ч назад',
                            },
                        },
                    ],
                    chat_id: 'чат_2',
                    status: 'readed',
                    last_msg: 'msg_16',
                    online: false,
                    name: 'Терминатор CLUB',
                    avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
                    id: "contact_1"
                },
                {
                    user: [
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
                                "whatsapp": 'В сети',
                                "instagram": 'В сети',
                                "vk": 'В сети',
                                "ok": 'В сети',
                                "facebook": 'В сети',
                                "viber": 'В сети',
                                "telegram": 'В сети',
                            },
                        },
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
                                "whatsapp": '5д назад',
                                "instagram": '20д назад',
                                "vk": '10м назад',
                                "ok": '5м назад',
                                "facebook": '20м назад',
                                "telegram": 'В сети',
                            },
                        },
                    ],
                    chat_id: 'чат_3',
                    status: 'unread',
                    last_msg: 'msg_2',
                    online: true,
                    name: 'Терминатор',
                    avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
                    id: "contact_2"
                }
            ]

            const chatData: any = [
                {
                    contact_id: 'contact_0',
                    id: 'чат_1',
                    activeSocial: 'telegram',
                    role: [
                        {
                            id: "user_1",
                            name: 'Белый маг',
                            status: 'default'
                        }
                    ],
                    user: [
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
                                "whatsapp": '5д назад',
                                "instagram": '20д назад',
                                "vk": '10м назад',
                                "ok": '5м назад',
                                "facebook": '20м назад',
                                "telegram": 'В сети',
                            },
                        },
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
                                "whatsapp": '5д назад',
                                "instagram": '20д назад',
                                "vk": '10м назад',
                                "ok": '5м назад',
                                "facebook": '20м назад',
                                "telegram": 'В сети',
                            },
                        },
                    ],
                    msg: [
                        {
                            id: 'msg_0',
                            from: "user_1",
                            time: '17:31',
                            date: '15.01.21',
                            social_media: 'telegram',
                            readed: true,
                            editted: false,
                            smiles: [],
                            content: 'Ты изменился, Бильбо Бэггинс. Ты уже не тот хоббит, который оставил Шир...'
                        },
                        {
                            id: 'msg_1',
                            from: "user_0",
                            time: '17:31',
                            date: '15.01.21',
                            readed: true,
                            social_media: 'telegram',
                            editted: false,
                            smiles: [],
                            content: 'Я хотел сказать тебе... Я нашел кое-что в гоблинских туннелях.'
                        },
                        {
                            id: 'msg_2',
                            from: "user_1",
                            time: '17:32',
                            date: '15.01.21',
                            readed: true,
                            social_media: 'telegram',
                            editted: false,
                            smiles: [],
                            content: 'Что нашел? Что ты нашел?'
                        },
                        {
                            id: 'msg_3',
                            from: "user_0",
                            time: '17:33',
                            date: '15.01.21',
                            readed: true,
                            social_media: 'telegram',
                            editted: false,
                            smiles: [],
                            content: 'Свою храбрость.'
                        },
                        {
                            id: 'msg_4',
                            from: "user_1",
                            time: '17:33',
                            date: '15.01.21',
                            readed: true,
                            social_media: 'telegram',
                            editted: false,
                            smiles: [],
                            content: 'Хорошо. Очень хорошо. Тебе пригодится.'
                        }
                    ]
                },
                {
                    contact_id: 'contact_1',
                    id: 'чат_2',
                    activeSocial: 'instagram',
                    role: [
                        {
                            id: "user_2",
                            name: 'Т-1000',
                            status: 'default'
                        }
                    ],
                    user: [
                        {
                            username: "Терминатор",
                            avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
                            id: "user_2"
                        },
                        {
                            username: "Джон Конор",
                            avatar: 'https://img.filmsactu.net/datas/films/t/e/terminator-6-dark-fate/xl/terminator-6-dark-fate-5d30d97b7f96a.jpg',
                            id: "user_3"
                        },
                        {
                            username: "Бильбо Бэггинс",
                            avatar: 'https://i.pinimg.com/736x/9a/bd/a5/9abda5b52a61284f7e39101cd84edfd2--hobbit--lord-of-the-rings.jpg',
                            id: "user_0"
                        },
                    ],
                    msg: [
                        {
                            id: 'msg_0',
                            from: "user_3",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '15.01.21',
                            time: '12:11',
                            content: 'Ты можешь обучаться тому, что в тебя не заложено? Чтобы ты был больше похож на человека? А не быть такой дубиной все время.'
                        },
                        {
                            id: 'msg_1',
                            from: "user_2",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '15.01.21',
                            time: '12:12',
                            content: 'Во мне нейро-сетевой процессор, способный к обучению. Чем больше я общаюсь с людьми, тем больше я о них узнаю.'
                        },
                        {
                            id: 'msg_2',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '15.01.21',
                            time: '14:51',
                            content: 'Это вообще моя вселенная?'
                        },
                        {
                            id: 'msg_3',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:51',
                            content: 'Это вообще моя вселенная?'
                        },
                        {
                            id: 'msg_4',
                            from: "user_2",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:51',
                            content: 'Вблизи срединно-океанических хребтов ламинарное движение меняет pадиотелескоп Максвелла. '
                        },
                        {
                            id: 'msg_5',
                            from: "user_3",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:51',
                            content: 'Калиево-натриевый полевой шпат неравномерен.'
                        },
                        {
                            id: 'msg_6',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:56',
                            content: 'Возмущающий фактор горизонально решает непреложный монтмориллонит'
                        },
                        {
                            id: 'msg_7',
                            from: "user_2",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:51',
                            content: 'Возмущающий фактор, после осторожного анализа, аккумулирует'
                        },
                        {
                            id: 'msg_8',
                            from: "user_3",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:51',
                            content: 'Эннием и записанного в "Больших анналах"'
                        },
                        {
                            id: 'msg_9',
                            from: "user_3",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '18.01.21',
                            time: '14:51',
                            content: 'Эннием и записанного в "Больших анналах", было вычислено время предшествовавших затмений солнца, начиная с того, которое в квинктильские ноны произошло в царствование Ромула.'
                        },
                        {
                            id: 'msg_10',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '21.01.21',
                            time: '14:51',
                            content: 'Эпоха, это удалось установить по характеру спектра, доступна.'
                        },
                        {
                            id: 'msg_11',
                            from: "user_2",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '21.01.21',
                            time: '14:51',
                            content: 'Недоступно поступает в вращательный излом.'
                        },
                        {
                            id: 'msg_12',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            smiles: [],
                            readed: true,
                            date: '21.01.21',
                            time: '14:51',
                            content: 'то можно записать следующим образом: V = 29.8 * sqrt(2/r – 1/a) км/сек'
                        },
                        {
                            id: 'msg_13',
                            from: "user_3",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '21.01.21',
                            time: '14:51',
                            content: 'Возмущающий фактор, после осторожного анализа, аккумулирует эллиптический дип-скай объект'
                        },
                        {
                            id: 'msg_14',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '21.01.21',
                            time: '14:51',
                            content: 'Эпоха, это удалось установить по характеру спектра, доступна. '
                        },
                        {
                            id: 'msg_15',
                            from: "user_0",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '22.01.21',
                            time: '21:51',
                            content: 'Возмущающий фактор'
                        },
                        {
                            id: 'msg_16',
                            from: "user_3",
                            social_media: 'instagram',
                            editted: false,
                            readed: true,
                            smiles: [],
                            date: '22.01.21',
                            time: '14:51',
                            content: 'Фирновый плейстоцен.'
                        },
                    ]
                },
                {
                    contact_id: 'contact_2',
                    id: 'чат_3',
                    activeSocial: 'instagram',
                    role: [
                        {
                            id: "user_2",
                            name: 'Т-1000',
                            status: 'default'
                        }
                    ],
                    user: [
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
                                "whatsapp": 'В сети',
                                "instagram": 'В сети',
                                "vk": 'В сети',
                                "ok": 'В сети',
                                "facebook": 'В сети',
                                "viber": 'В сети',
                                "telegram": 'В сети',
                            },
                        },
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
                                "instagram": 'В сети',
                                "vk": 'В сети',
                                "ok": 'В сети',
                                "facebook": 'В сети',
                                "viber": 'В сети',
                                "telegram": 'В сети',
                            },
                        },
                    ],
                    msg: [
                        {
                            id: 'msg_0',
                            from: "user_2",
                            social_media: 'ok',
                            editted: false,
                            readed: false,
                            smiles: [],
                            date: '24.01.21',
                            time: '05:12',
                            content: 'Спишь?'
                        },
                        {
                            id: 'msg_1',
                            from: "user_2",
                            social_media: 'ok',
                            editted: false,
                            readed: false,
                            smiles: [],
                            date: '24.01.21',
                            time: '09:12',
                            content: 'Я вижу что ты онлайн'
                        },
                        {
                            id: 'msg_2',
                            from: "user_2",
                            social_media: 'ok',
                            editted: false,
                            readed: false,
                            smiles: [],
                            date: '24.01.21',
                            time: '09:12',
                            content: 'АУУУУУУ, ты живой?'
                        },
                    ]
                }
            ]

            const hero = {
                username: "Бильбо Бэггинс",
                avatar: 'https://i.pinimg.com/736x/9a/bd/a5/9abda5b52a61284f7e39101cd84edfd2--hobbit--lord-of-the-rings.jpg',
                id: "user_0"
            }

            await userStore.initHero(hero)
            await contactStore.init(contactData);
            await chatStore.init(chatData)
            this.loaded = true
        } catch (e) {
            console.error(e);

        }
    };

}

export const appStore = new AppStore();