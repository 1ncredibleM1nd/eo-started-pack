
export default interface IVariable {
    readonly parent_id?: string;
    readonly id?: string,
    name?: string,
    type?: string,
    value?: any,
    setName: (name: string) => void,
    setType: (type: string) => void,
    setValue: (value: any) => void
}


