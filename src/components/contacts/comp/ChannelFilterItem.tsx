import { observer } from "mobx-react-lite";
import { Switch } from "antd";
import { Icon } from "@/ui/Icon/Icon";

type IProps = {
  channelName: string;
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
      <Icon name={`social_media_${channelName}`} />
      <div className="channel-name">{channelName}</div>
    </div>
  );
});

export default ChannelFilterItem;
