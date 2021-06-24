export type TMessageAttachmentData = {
  preview: string;
};

export type TMessageAttachment = {
  type: "file";
  url: string;
  title: string;
  data: TMessageAttachmentData;
};
