class Attachment {
  type: string;
  data: any;
  url: string;
  title: string;
  isIframe: boolean;

  constructor(
    type: string,
    data: any,
    url: string,
    title?: string,
    isIframe?: boolean
  ) {
    this.type = type;
    this.data = data;
    this.url = url;
    this.title = title;
    this.isIframe = isIframe;
  }
}

export default Attachment;
