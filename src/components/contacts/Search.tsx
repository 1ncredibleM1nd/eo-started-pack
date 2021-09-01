import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";

import { Input, Collapse, Button } from "antd";
import "./Search.scss";

import { FilterTags } from "@/components/Filter/FilterTags";
import { FilterSchools } from "@/components/Filter/FilterSchools";
import { FilterChannels } from "@/components/Filter/FilterChannels";
import { IconFilter, IconFilterClose } from "@/images/icons";
import { useHistory } from "react-router-dom";

const Search = observer(() => {
  const { contactStore, appStore, schoolsStore, tagsStore, sidebarStore } =
    useStore();
  const history = useHistory();
  const filterSwitch = contactStore.filterSwitch;

  const onChangeTags = async () => {
    history.replace("");
    sidebarStore.hide();
    await contactStore.setActiveContact(null);
    contactStore.filterTags();
  };

  const onChangeSocial = () => {
    contactStore.filterSocial();
  };

  async function onChangeSchool() {
    history.replace("");
    sidebarStore.hide();
    await contactStore.setActiveContact(null);
    await tagsStore.load(schoolsStore.activeSchoolsIds);
    contactStore.filterSchools();
  }

  const { Panel } = Collapse;
  const { Search } = Input;

  return (
    <Fragment>
      <div className="contact_header">
        <div className="search">
          <div className="search-filter">
            <Button
              disabled={!appStore.isLoaded}
              onClick={() => contactStore.toggleFilterSwitch()}
              className="transparent"
            >
              {filterSwitch ? (
                <IconFilterClose width={18} height={18} fill="#a3a3a3" />
              ) : (
                <IconFilter width={18} height={18} fill="#a3a3a3" />
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
