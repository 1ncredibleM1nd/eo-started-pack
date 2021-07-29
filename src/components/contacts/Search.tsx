import React, { useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Input, Switch, Collapse, Button } from "antd";
import "./Search.scss";
import { Icon } from "@/ui";

import ChannelFilterItem from "./comp/ChannelFilterItem";
import { useStore } from "@/stores";

const Search = observer(() => {
  const { contactStore, appStore } = useStore();
  const [searchText, setSearchText] = useState("");
  const sources = contactStore.sources;
  const avaliableChannels = contactStore.avaliableChannels;
  const filterSwitch = contactStore.filterSwitch;

  const onChange = (value: string) => {
    setSearchText(value);
    contactStore.setSearch(value);
  };

  const onChangeSocial = (social: string) => {
    contactStore.filterSocial(social);
  };

  async function onChangeSchool(schoolId: number) {
    await contactStore.setActiveContact(null);

    appStore.activeSchool(schoolId);
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
              <h5>Школы</h5>
              {Object.keys(appStore.schoolList).map((schoolId) => {
                const school = appStore.schoolList[schoolId];

                return (
                  <div
                    key={`filter_school_${schoolId}`}
                    className={"school-item"}
                  >
                    <Switch
                      size="small"
                      defaultChecked={school.active}
                      onChange={() => onChangeSchool(Number(schoolId))}
                    />
                    <img src={school.logo} className="school-logo" />
                    <p>{school.name}</p>
                  </div>
                );
              })}
            </div>

            <div className="filter-item">
              <h5>Каналы</h5>
              {Object.keys(sources).map((key: string) => {
                if (avaliableChannels.find((channel) => channel === key)) {
                  return (
                    <ChannelFilterItem
                      key={`filter_channel_${key}`}
                      channelName={key}
                      onChangeSocial={onChangeSocial}
                      defaultChecked={sources[key]}
                    />
                  );
                }
                return null;
              })}
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
