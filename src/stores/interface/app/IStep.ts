
export default interface IStep {
    source?: string | number;
    target?: any[],
    view_name?: string,
    view_id?: string,
    type: string,
    menu_item_id: string,
    payload?: any[any],
    shape: any[any],
    prev_step_id?: string,
    step_id?: string,
    next_step_id?: string[],
    setViewName: (value: string) => void,
    setTarget: (target: string | number) => void,
    setPrevStep: (prev_step_id: string) => void,
    addNextStep: (next_step_id: string) => void,
    setNextStep: (next_step_ids: string[]) => void,
    setPayload: (key: string, value: any) => void,
    addPayload: (key: string, value: any) => void,
    changePayloadItem: (key1: string, index1: number, index2: number | string, key2: string | number, value: any) => void;
    movePayloadItem: (key: string, from: number, to: number) => void;
    setOption: (index: number, value: string) => void,
    addOption: (value: string, port: any[any]) => void,
    removeOption: (index: number) => void,
    setPortOption: (index: number, key: string, value: string) => void,
    changePayload: (key1: string, index: number, key2: string, value: any) => void,
    toggleChannel: (name: string) => void,
    removePayload: (key: string, index: number) => void;
    insertPayload: (key: string, index: number, value: any) => void;
    addPayloadItem: (key: string, index: number, value: any) => void;
    removePayloadItem: (key: string, index: number, index2: number) => void;
    setPayloadItem: (key: string, index: number, value: any) => void;
    addPayloadItemAdvanced: (key: string, index: number, key2: string, value: any) => void;
    removePayloadItemAdvanced: (key: string, index: number, key2: string, index2: number) => void;
    changePayloadItemAdvanced: (key: string, index1: number, key2: string, index2: number, key3: string, value: string) => void;
    moveOption: (from: number, to: number) => void;
    removeAllOptions: () => void;
}