export default class TypesMessage {
  public static MESSAGE: string = "message";
  public static COMMENT: string = "comment";
  public static POST: string = "post";
  public static PHOTO_COMMENT: string = "photo_comment";
  public static VIDEO_COMMENT: string = "video_comment";
  public static BOARD_COMMENT: string = "board_comment";
  public static STORY: string = "story";

  public static getTypeDescription(type: string): string {
    switch (type) {
      case TypesMessage.COMMENT:
        return "Комментарий к посту";
      case TypesMessage.POST:
        return "Пост";
      case TypesMessage.PHOTO_COMMENT:
        return "Комментарий к фото";
      case TypesMessage.VIDEO_COMMENT:
        return "Комментарий к видео";
      case TypesMessage.BOARD_COMMENT:
        return "Комментарий к обсуждению";
      case TypesMessage.STORY:
        return "Сториз";
      case TypesMessage.MESSAGE:
      default:
        return "Сообщение";
    }
  }
}
