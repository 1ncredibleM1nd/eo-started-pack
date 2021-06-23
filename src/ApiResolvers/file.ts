import { notification } from "antd";

export async function download(url: string, filename: string) {
  const response = await fetch(`${process.env.APP_DOWNLOAD_HOST}/v1${url}`);
  if (response.ok) {
    const result = await response.blob();
    const url = URL.createObjectURL(
      new Blob([result], {
        type: "application/octet-stream",
      })
    );
    const link = document.body.appendChild(document.createElement("a"));
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  } else {
    const result = await response.json();
    notification.error({
      placement: "topRight",
      message: result.data?.error_message ?? "",
    });
  }
}
