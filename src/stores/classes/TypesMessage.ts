export default class TypesMessage {
    public static MESSAGE: string = 'message'
    public static MESSAGE_REPLY: string = 'message_reply'

    public static COMMENT: string = 'comment'
    public static COMMENT_REPLY: string = 'comment_reply'

    public static POST: string = 'post'
    public static POST_REPLY: string = 'post_reply'

    public static ALL_TYPES: string[] = [
        TypesMessage.MESSAGE,
        TypesMessage.MESSAGE_REPLY,
        TypesMessage.COMMENT,
        TypesMessage.COMMENT_REPLY,
        TypesMessage.POST,
        TypesMessage.POST_REPLY
    ]
}
