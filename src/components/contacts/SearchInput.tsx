import { useStore } from "@/stores";
import { Input } from "antd";
import { css } from "goober";
import { observer } from "mobx-react-lite";

export const SearchInput = observer(() => {
  const { searchStore, contactStore } = useStore();

  return (
    <Input.Search
      placeholder="Поиск"
      disabled={!contactStore.isLoaded}
      value={searchStore.searchQuery}
      onChange={({ target }) => {
        searchStore.setSearchQuery(target.value);
        if (target.value === "") {
          contactStore.refetch();
        }
      }}
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
