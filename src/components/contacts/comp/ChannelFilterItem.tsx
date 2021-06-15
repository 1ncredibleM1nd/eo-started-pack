import React from "react";
import { observer } from "mobx-react";
import { Switch } from "antd";
import { Icon } from "@ui";

type IProps = {
  channelName?: string;
  onChangeSocial?: (channelName: string) => void;
  defaultChecked?: boolean;
};

const ChannelFilterItem = observer((props: IProps) => {
  const { channelName, onChangeSocial, defaultChecked } = props;

  return (
    <div className="channel-item">
      <Switch
        size="small"
        defaultChecked={defaultChecked}
        onChange={() => onChangeSocial(channelName)}
      />
      <Icon name={`social_media_${channelName}`} className="icon_s" />
      <div className="channel-name">{channelName}</div>
    </div>
  );
});

export default ChannelFilterItem;