import { action, runInAction } from "mobx";
import * as joint from 'rappid';
import { IAppStore, IMenu, ISettings, IUser, IVariableStore } from '@stores/interface';
import CUser from '@stores/implementation/app/CUser';
import CMenu from '@stores/implementation/app/CMenu';
import { variableStore } from '@stores/implementation';
import CSettings from '@stores/implementation/app/CSettings';
import CServerAction from "@stores/implementation/helper/CServerAction";
import IStepToServer from "@stores/interface/helper/IStepToServer";
import IGraphToServer from "@stores/interface/helper/IGraphToServer";
import { scriptStore, flowchartStore } from '@stores/implementation';
import ElementProducer from '@flowchart/shapes/ElementProducer';

// import { coords } from './testData/coords'
// import { shape } from './testData/shape'

import { getMenu, getFunnel, sendData } from '@actions';

export class AppStore extends CServerAction implements IAppStore {
    variableStore: IVariableStore;
    menu: IMenu = new CMenu(false);
    settings: ISettings = new CSettings(false);
    user: IUser = new CUser();

    formData() {
        let graph = flowchartStore.graphController.toJSON()
        let script = scriptStore.getScript
        let variablesData = variableStore.activeVariables


        const graphData: any[any] = [];
        const scriptData: any[any] = [];


        // getting coords and links
        for (let i = 0; i < graph.cells.length; i++) {
            let el = graph.cells[i];
            if (el.type === 'app.Link') {
                let link: IGraphToServer = {
                    type: el.type,
                    source: el.source,
                    target: el.target,
                    id: el.id
                }
                graphData.push(link)
            } else {
                let step = script.find(step => step.source === el.id)
                let data: IGraphToServer = {
                    position: el.position,
                    class: el.class,
                    id: el.id,
                    ports: {
                        items: el.ports.items
                    }
                }
                let body = {
                    id: step.step_id,
                    data: data
                }
                graphData.push(body)
            }
        }



        //script
        for (let i = 0; i < script.length; i++) {

            let links = graphData.filter((graph: any) => graph.type === 'app.Link')

            let next_links = links.filter((link: any) => link.source.id === script[i].source)
            let next_ids: any = []
            next_links.forEach((link: any) => {
                let targetStep = script.find((step: any) => step.source === link.target.id)
                let targetElement = flowchartStore.graphController.getCell(link.target.id)
                let target_port_type = targetElement.attributes.ports.items.find((item: any) => item.id === link.target.port).group
                let optionIndex = link.source.port.split('-');
                let port_type = optionIndex[0]
                let linkElement = flowchartStore.graphController.getCell(link.id)
                let sourceElement: any = linkElement.getSourceElement()
                if (port_type !== 'negative' && port_type !== 'positive') port_type = 'out'
                if (sourceElement.attributes.name === 'control') {
                    let positiveGroup = sourceElement.attributes.ports.items.filter((item: any) => item.group === 'positive-control')
                    let negativeGroup = sourceElement.attributes.ports.items.filter((item: any) => item.group === 'negative-control')
                    let positiveMatch = positiveGroup.find((item: any, index: number) => item.id === link.source.port)
                    let negativeMatch = negativeGroup.find((item: any, index: number) => item.id === link.source.port)
                    if (positiveMatch) port_type = positiveMatch.group.split('-')[0]
                    if (negativeMatch) port_type = negativeMatch.group.split('-')[0]
                }
                optionIndex = optionIndex[optionIndex.length - 1]
                let port_value = '';
                if (optionIndex.length < 2) port_value = script[i].shape.options.items[optionIndex].content
                let data = {
                    from_port: link.source.port,
                    port_value: port_value,
                    port_type: port_type,
                    target: {
                        id: link.target.id,
                        port: link.target.port,
                        port_type: target_port_type,
                        step_id: targetStep.step_id
                    }
                }
                next_ids.push(data)
            })


            //view_name заменить на type
            let item: IStepToServer = {
                source: script[i].source,
                target: script[i].target,
                type: script[i].type,
                payload: script[i].payload,
                menu_item_id: script[i].menu_item_id,
                shape: script[i].shape,
                prev_step_id: script[i].prev_step_id,
                step_id: script[i].step_id,
                next_step_id: next_ids
            }
            scriptData.push(item);
        }

        console.log('Готовый Graph ', JSON.stringify(graphData))
        console.log('Готовый Скрипт ', JSON.stringify(scriptData))
        console.log('Готовые переменные ', JSON.stringify(variablesData))

        const body = {
            "script": scriptData,
            "graph": graphData,
            "variables": variablesData
        };

        return body
    }

    putCoords(id: string, graph: any, cell: any) {
        let graph_item = graph.find((item: any) => item.id === id)
        if (graph_item !== 'app.Link') {
            cell.attributes.position = graph_item.data.position
            cell.id = graph_item.data.id
            if (!cell.ports.items && graph_item.data.ports.items) {
                cell.ports['items'] = graph_item.data.ports.items
            }
        }
        return cell
    }

    async initVariables(data?: any) {
        const variableData = [
            {
                parent_id: 'added',
                id: 'var_1124we214',
                type: 'string',
                name: 'СамаяДлиннаяПременнаяНаДикомЗападе',
                value: 'User_1337',
            },
            {
                parent_id: 'added',
                id: 'var_112r4214',
                type: 'string',
                name: 'Баланс',
                value: '100 руб.',
            },
        ]
        variableStore.saveVariable(variableData);
    }

    @action.bound
    async initialization() {
        try {
            runInAction(() => {
                this.pending();

            });
            // Делаем запрос, получаем инфу о юзере и доп. информации по меню и т.д.




            runInAction(() => {
                this.done();
            });

            const constantData = [

                {
                    id: 'cat_1',
                    name: 'user',
                    title: 'Пользователь',
                    items: [
                        {
                            parent_id: 'cat_1',
                            id: 'var_1',
                            type: 'string',
                            name: 'ИмяПользователя',
                            value: 'User_1337',
                        },
                        {
                            parent_id: 'cat_1',
                            id: 'var_2',
                            type: 'number',
                            name: 'ВозрастПользователя',
                            value: '21',
                        },
                        {
                            parent_id: 'cat_1',
                            id: 'var_3',
                            type: 'stringArray',
                            name: 'ДоступныеКурсы',
                            value: 'SMM, Игра на гитаре',
                        }
                    ]
                },
                {
                    id: 'cat_2',
                    name: 'school',
                    title: 'Школа',
                    items: [
                        {
                            parent_id: 'cat_2',
                            id: 'var_4',
                            type: 'string',
                            name: 'НазваниеШколы',
                            value: 'User_1337',
                        },
                        {
                            parent_id: 'cat_2',
                            id: 'var_5',
                            type: 'string',
                            name: 'ЧислоУчеников',
                            value: '47',
                        },
                        {
                            parent_id: 'cat_2',
                            id: 'var_6',
                            type: 'stringArray',
                            name: 'Курсы',
                            value: 'SMM, Инвестиции, Игра на гитаре',
                        }
                    ]
                },
                {
                    id: 'cat_3',
                    name: 'other',
                    title: 'Разное',
                    items: [
                        {
                            parent_id: 'cat_3',
                            id: 'var_7',
                            type: 'string',
                            name: 'Дата',
                            value: '01.02.20',
                        },
                        {
                            parent_id: 'cat_3',
                            id: 'var_8',
                            type: 'string',
                            name: 'Время',
                            value: '16:51',
                        },
                    ]
                }
            ]

            const res = await getMenu();
            const funnel = await getFunnel(90)
            if (funnel) this.dataInit(funnel)

            this.menu.save(res.menu).init();
            variableStore.saveConstant(constantData);
            this.initVariables()

        } catch (e) {
            console.error(e);
            this.error();
        }
    };



    @action.bound
    async saveAndUpload() {
        try {
            let data = await this.formData()
            let res = await sendData(data)
            console.log(res)
            //@action sendDATA(data)
        } catch (e) {
            console.error(e);
            this.error();
        }
    };

    @action.bound
    async dataInit(data: any) {
        try {
            let cells: any = [];
            //Generate Views
            for (let i = 0; i < data.script.length; i++) {
                const el = data.script[i];
                scriptStore.setStep(el)
                let cell = ElementProducer.reCreateCell(el.shape);
                cell = this.putCoords(el.step_id, data.graph, cell)
                cells.push(cell);
            }
            //Generate Links
            for (let i = 0; i < data.graph.length; i++) {
                const graph_item = data.graph[i];
                if (graph_item === 'app.Link') {
                    let link = new joint.dia.Link({ source: graph_item.source, target: graph_item.target });
                    cells.push(link);
                }
            }
            //Additing to Paper
            flowchartStore.graphController.addCells(cells)
        } catch (e) {
            console.error(e);
            this.error();
        }
    };



}

export const appStore = new AppStore();