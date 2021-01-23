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
                            id: "user_0"
                        },
                        {
                            username: "Гэндальф",
                            avatar: 'https://yt3.ggpht.com/a/AATXAJz4P6N4YZie5K342WgZxFKi4o-1YBRhpSnrWx5j=s900-c-k-c0xffffffff-no-rj-mo',
                            id: "user_1"
                        },
                    ],
                    chat_id: 'чат_1',
                    avatar: 'https://yt3.ggpht.com/a/AATXAJz4P6N4YZie5K342WgZxFKi4o-1YBRhpSnrWx5j=s900-c-k-c0xffffffff-no-rj-mo',
                    id: "contact_0"

                },
                {
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
                    ],
                    chat_id: 'чат_2',
                    name: 'Терминатор CLUB',
                    avatar: 'http://img.crazys.info/files/i/2010.10.10/1286708601_t800_18.jpg',
                    id: "contact_1"
                },
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
                            id: "user_1"
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
                            from: "user_1",
                            time: '17:31',
                            social_media: 'telegram',
                            smiles: [],
                            content: 'Ты изменился, Бильбо Бэггинс. Ты уже не тот хоббит, который оставил Шир...'
                        },
                        {
                            id: 'msg_1',
                            from: "user_0",
                            time: '17:31',
                            social_media: 'telegram',
                            smiles: [],
                            content: 'Я хотел сказать тебе... Я нашел кое-что в гоблинских туннелях.'
                        },
                        {
                            id: 'msg_2',
                            from: "user_1",
                            time: '17:32',
                            social_media: 'telegram',
                            smiles: [],
                            content: 'Что нашел? Что ты нашел?'
                        },
                        {
                            id: 'msg_3',
                            from: "user_0",
                            time: '17:33',
                            social_media: 'telegram',
                            smiles: [],
                            content: 'Свою храбрость.'
                        },
                        {
                            id: 'msg_4',
                            from: "user_1",
                            time: '17:33',
                            social_media: 'telegram',
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
                            smiles: [],
                            time: '12:11',
                            content: 'Ты можешь обучаться тому, что в тебя не заложено? Чтобы ты был больше похож на человека? А не быть такой дубиной все время.'
                        },
                        {
                            id: 'msg_1',
                            from: "user_2",
                            social_media: 'instagram',
                            smiles: [],
                            time: '12:12',
                            content: 'Во мне нейро-сетевой процессор, способный к обучению. Чем больше я общаюсь с людьми, тем больше я о них узнаю.'
                        },
                        {
                            id: 'msg_2',
                            from: "user_0",
                            social_media: 'instagram',
                            smiles: [],
                            time: '14:51',
                            content: 'Это вообще моя вселенная?'
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