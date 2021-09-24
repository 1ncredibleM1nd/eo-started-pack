import { Input } from "antd";
import { css } from "goober";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const SearchInput = observer(() => {
  const [searchText, setSearchText] = useState("");

  return (
    <Input.Search
      placeholder="Поиск"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      enterButton={null}
      className={css`
        height: 32px;
        max-width: 80%;

        .ant-input {
          border: 1px solid #d9d9d9;
          border-radius: 10px !important;
          width: 100%;
        }
      `}
    />
  );
});
