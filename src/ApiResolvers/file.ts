import { DOWNLOAD } from "actions/axios";
import { notification } from "antd";

export async function download(url: string, filename: string) {
  const response = await DOWNLOAD.post(url);
  if (response.data?.error) {
    notification.error({
      message: response.data?.data?.error_message,
    });
  } else {
    const url = URL.createObjectURL(
      new Blob([response.data], {
        type: "application/octet-stream",
      })
    );
    const link = document.body.appendChild(document.createElement("a"));
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
