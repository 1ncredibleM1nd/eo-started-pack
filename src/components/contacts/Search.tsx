import React, { useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Input, Collapse, Button } from "antd";
import "./Search.scss";
import { Icon } from "@/ui";

import { Schools } from "../Filter/Schools";
import { Channels } from "../Filter/Channels";
import { useStore } from "@/stores";

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
              <Icon
                name={filterSwitch ? "icon_filter_close" : "icon_filter"}
                className={"icon_s lite-grey"}
              />
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
            {/* <div className="type_container">
								<Radio.Group onChange={onChangeType} defaultValue="all">
									<Radio.Button className='radio_btn all ' value="all">
										<Icon name='solid_star-of-life' className='blue-lite ' />
									</Radio.Button>
									<Radio.Button className='radio_btn' value="comments">Комментарии</Radio.Button>
									<Radio.Button className='radio_btn' value="msg">Сообщения</Radio.Button>
									<Radio.Button className='radio_btn' value="request">Заявки</Radio.Button>
								</Radio.Group>
							</div> */}
          </Panel>
        </Collapse>
      </div>
    </Fragment>
  );
});

export default Search;
