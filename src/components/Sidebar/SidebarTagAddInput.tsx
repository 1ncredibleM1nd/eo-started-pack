import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Input } from "antd";
import { useState } from "react";
import { useStore } from "@/stores";
import { tags as tagsApi } from "@/api";

type TProps = {
  onAdded?: any;
};

export const SidebarTagAddInput = observer(({ onAdded }: TProps) => {
  const { contactStore } = useStore();
  const [tagName, setTagName] = useState("");

  const onPressEnter = async () => {
    const trimmedTagName = tagName.trim();

    if (trimmedTagName !== "") {
      const { data } = await tagsApi.add(
        contactStore?.activeContact?.schoolId ?? -1,
        trimmedTagName
      );

      onAdded?.(data.data);
    }

    setTagName("");
  };

  return (
    <Input
      className={css`
        padding: 0 0 5px 0;
        border: none;
        outline: none;
        box-shadow: none !important;
        border-bottom: 1px solid #607d8b !important;
      `}
      onChange={(e) => setTagName(e.target.value)}
      onPressEnter={onPressEnter}
      value={tagName}
      placeholder={"Введите новый тег"}
    />
  );
});
