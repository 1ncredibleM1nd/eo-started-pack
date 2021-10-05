import { useStore } from "@/stores";
import { Icon } from "@/ui/Icon/Icon";
import { Input } from "antd";
import { css } from "goober";
import { observer } from "mobx-react-lite";

export const SearchInput = observer(() => {
  const { searchStore, contactStore } = useStore();

  const suffix = !searchStore.isEmpty ? (
    <Icon
      name="icon_filter_close"
      fill={"#a3a3a3"}
      size="xs"
      interactive={true}
      onClick={() => {
        searchStore.setSearchQuery("");
        contactStore.refetch();
      }}
    />
  ) : (
    <span />
  );

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
      suffix={suffix}
      enterButton={null}
      className={css`
        height: 32px;
        max-width: 80%;

        .ant-input-affix-wrapper {
          border: 1px solid #d9d9d9;
          border-radius: 10px !important;
          width: 100%;
        }
      `}
    />
  );
});
