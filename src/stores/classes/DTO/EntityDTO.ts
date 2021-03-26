import { IEntityDTO } from '@stores/interface'
import {TypesMessage} from "@stores/classes";

export class EntityDTO implements IEntityDTO {
	readonly type: string;
	readonly data: object;

	constructor(
		type: string,
		data: any
	) {
		if (TypesMessage.ALL_TYPES.includes(type)) {
			this.type = type
		} else {
			this.type = TypesMessage.MESSAGE
		}

		this.data = data
	}
}
