import { notification } from "antd";

export async function download(url: string) {
  const response = await fetch(`${process.env.APP_DOWNLOAD_HOST}${url}`);
  if (response.ok) {
    const blob = await response.blob();
    window.open(
      URL.createObjectURL(
        new Blob([blob], {
          type: "application/octet-stream",
        })
      ),
      "_self"
    );
  } else {
    const result = await response.json();
    notification.error({
      placement: "topRight",
      message: result.data?.error_message ?? "",
    });
  }
}
