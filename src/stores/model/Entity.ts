export const EntityType = {
  message: "Сообщение",
  comment: "Комментарий к посту",
  post: "Пост",
  photo_comment: "Комментарий к фото",
  video_comment: "Комментарий к видео",
  board_comment: "Комментарий к обсуждению",
  story: "Сториз",
};

export type TEntityType = keyof typeof EntityType;

export class Entity {
  type: TEntityType;
  data: any;

  constructor(type: TEntityType, data = {}) {
    this.type = type;
    this.data = data;
  }

  static stringifyType(type: TEntityType) {
    return EntityType[type];
  }
}
