import "./Search.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Collapse } from "antd";
import { FilterTags } from "@/components/Filter/FilterTags";
import { FilterSchools } from "@/components/Filter/FilterSchools";
import { FilterChannels } from "@/components/Filter/FilterChannels";
import { useHistory } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import FilterButton from "@/components/contacts/comp/FilterButton";
import { FilterDialogStatus } from "../Filter/FilterDialogStatus";
import { useState } from "react";
import { css } from "goober";
import { classnames } from "@/utils/styles";
import FilterManagers from "@/components/Filter/FilterManagers";

const Search = observer(() => {
  const {
    contactStore,
    schoolsStore,
    tagsStore,
    sidebarStore,
    searchStore,
    managersStore,
    taskStore,
  } = useStore();
  const history = useHistory();
  const [filterVisible, setFilterVisible] = useState(false);

  const onChangeTags = async () => {
    history.replace("");
    sidebarStore.setOpened(false);
    if (searchStore.running) {
      searchStore.fetch();
      taskStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      contactStore.refetch();
      taskStore.refetch();
    }
  };

  const onChangeSocial = async () => {
    history.replace("");
    sidebarStore.setOpened(false);
    if (searchStore.running) {
      searchStore.fetch();
      taskStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      contactStore.refetch();
      taskStore.refetch();
    }
  };

  async function onChangeSchool() {
    history.replace("");
    sidebarStore.setOpened(false);
    if (searchStore.running) {
      searchStore.fetch();
      taskStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      await tagsStore.load(schoolsStore.activeSchoolsIds);
      contactStore.refetch();
      taskStore.refetch();
    }
  }

  async function onChangeManager(id: number, checked: boolean) {
    managersStore.addChosenManager(id, checked);
    history.replace("");
    sidebarStore.setOpened(false);
    if (searchStore.running) {
      searchStore.fetch();
      taskStore.fetch();
    } else {
      await contactStore.refetch();
      taskStore.refetch();
    }
  }

  return (
    <>
      <div
        className={classnames(
          "contact_header",
          css`
            max-height: 50%;

            @media (max-width: 480px) {
              max-height: 100%;
            }
          `
        )}
      >
        <div className="search">
          <div
            className="search-filter"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <FilterButton
              count={tagsStore.activeTagsCount}
              visible={filterVisible}
            />
          </div>

          <SearchInput />
        </div>

        <div
          className={classnames(
            css`
              height: calc(100% - 60px);
              overflow: auto;
            `,
            "contact-filters"
          )}
        >
          <Collapse
            bordered={false}
            accordion
            activeKey={filterVisible ? "filter" : ""}
          >
            <Collapse.Panel header="" key="filter">
              <FilterTags onChangeTags={onChangeTags} />
              <FilterManagers onChangeManager={onChangeManager} />
              <FilterSchools onChangeSchool={onChangeSchool} />
              <FilterChannels onChangeSocial={onChangeSocial} />
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
      <FilterDialogStatus />
    </>
  );
});

export default Search;
