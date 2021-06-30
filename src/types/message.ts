export type TMessageAttachmentData = {
  preview: string;
};

export type TMessageAttachment = {
  type: "file" | "image";
  url: string;
  title: string;
  data: TMessageAttachmentData;
};
