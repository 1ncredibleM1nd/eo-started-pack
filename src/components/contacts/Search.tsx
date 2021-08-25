import { useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Input, Collapse, Button } from "antd";
import "./Search.scss";

import { Schools } from "../Filter/Schools";
import { Channels } from "../Filter/Channels";
import { useStore } from "@/stores";
import { IconFilter, IconFilterClose } from "@/images/icons";

const Search = observer(() => {
  const { contactStore, appStore } = useStore();
  const [searchText, setSearchText] = useState("");
  const filterSwitch = contactStore.filterSwitch;

  const onChange = (value: string) => {
    setSearchText(value);
    contactStore.setSearch(value);
  };

  const onChangeSocial = () => {
    contactStore.filterSocial();
  };

  async function onChangeSchool(schoolId: number) {
    await contactStore.setActiveContact(null);
    appStore.activeSchool();
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
            <div className="filter-item">
              <Schools onChangeSchool={onChangeSchool} />
            </div>

            <div className="filter-item">
              <Channels onChangeSocial={onChangeSocial} />
            </div>
          </Panel>
        </Collapse>
      </div>
    </Fragment>
  );
});

export default Search;
