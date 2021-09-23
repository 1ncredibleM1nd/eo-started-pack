import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";

import { Input, Collapse, Button } from "antd";
import "./Search.scss";

import { FilterTags } from "@/components/Filter/FilterTags";
import { FilterSchools } from "@/components/Filter/FilterSchools";
import { FilterChannels } from "@/components/Filter/FilterChannels";
import { useHistory } from "react-router-dom";
import { Icon } from "@/ui/Icon/Icon";

const Search = observer(() => {
  const { contactStore, appStore, schoolsStore, tagsStore, sidebarStore } =
    useStore();
  const history = useHistory();
  const filterSwitch = contactStore.filterSwitch;

  const onChangeTags = async () => {
    history.replace("");
    sidebarStore.hide();
    await contactStore.setActiveContact(-1);
    contactStore.refetch();
  };

  const onChangeSocial = () => {
    contactStore.refetch();
  };

  async function onChangeSchool() {
    history.replace("");
    sidebarStore.hide();
    await contactStore.setActiveContact(-1);
    await tagsStore.load(schoolsStore.activeSchoolsIds);
    contactStore.refetch();
  }

  const { Panel } = Collapse;
  const { Search } = Input;

  return (
    <Fragment>
      <div className="contact_header">
        <div className="search">
          <div className="search-filter">
            <Button
              disabled={!contactStore.isLoaded}
              onClick={() => contactStore.toggleFilterSwitch()}
              className="transparent"
            >
              {filterSwitch ? (
                <Icon name={"icon_filter_close"} fill="#a3a3a3" />
              ) : (
                <Icon name={"icon_filter"} fill="#a3a3a3" />
              )}
            </Button>
          </div>

          {/* TODO: temporary hide by PROD-2058 */}
          {/*<div className="search-input">*/}
          {/*  <Search*/}
          {/*    disabled*/}
          {/*    placeholder="Поиск..."*/}
          {/*    value={searchText}*/}
          {/*    onChange={(e) => onChange(e.target.value)}*/}
          {/*    enterButton*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        <Collapse
          bordered={false}
          accordion
          activeKey={filterSwitch ? "1" : ""}
        >
          <Panel header="" key="1">
            <FilterTags onChangeTags={onChangeTags} />
            <FilterSchools onChangeSchool={onChangeSchool} />
            <FilterChannels onChangeSocial={onChangeSocial} />
          </Panel>
        </Collapse>
      </div>
    </Fragment>
  );
});

export default Search;
