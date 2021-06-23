import { DOWNLOAD } from "actions/axios";
import { notification } from "antd";

export async function download(path: string, filename: string) {
  try {
    const response = await DOWNLOAD.get(path, { responseType: "blob" });
    console.log(response);
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.body.appendChild(document.createElement("a"));
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    let error_message = "Не удалось запгрузить файл";
    if (error?.response?.data) {
      const result = JSON.parse(await error?.response?.data.text());
      error_message = result?.data?.error_message;
    }
    notification.error({
      placement: "topRight",
      message: error_message,
    });
  }
}
