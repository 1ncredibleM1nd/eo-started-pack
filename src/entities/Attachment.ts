class Attachment {
  type: string;
  data: any;
  url: string;

  constructor(type: string, data: any, url: string) {
    this.type = type;
    this.data = data;
    this.url = url;
  }
}

export default Attachment;
