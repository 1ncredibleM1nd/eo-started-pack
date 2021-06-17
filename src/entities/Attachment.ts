class Attachment {
  type: string;
  data: any;
  url: string;
  title: string;

  constructor(type: string, data: any, url: string, title?: string) {
    this.type = type;
    this.data = data;
    this.url = url;
    this.title = title;
  }
}

export default Attachment;
