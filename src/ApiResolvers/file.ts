import { DOWNLOAD } from "actions/axios";
import { notification } from "antd";

export async function download(path: string, filename: string) {
  const response = await DOWNLOAD.post(path, null, { responseType: "blob" });

  if (response.data.type === "application/json") {
    const data = JSON.parse(await response.data.text());

    if (data?.error) {
      notification.error({
        placement: "topRight",
        message: data?.data?.error_message,
      });

      return;
    }
  }

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
