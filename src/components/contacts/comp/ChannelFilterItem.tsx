import { observer } from "mobx-react-lite";
import { Switch } from "antd";
import { SocialIcon } from "@/components/SocialIcon";

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
      <SocialIcon social={channelName} size={18} />
      <div className="channel-name">{channelName}</div>
    </div>
  );
});

export default ChannelFilterItem;
