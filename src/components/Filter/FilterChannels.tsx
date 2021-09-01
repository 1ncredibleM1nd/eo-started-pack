import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import ChannelFilterItem from "../contacts/comp/ChannelFilterItem";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { FilterItem } from "@/components/Filter/FilterItem";

export const FilterChannels = observer(({ onChangeSocial }) => {
  const { channelsStore } = useStore();

  return (
    <FilterItem>
      <FilterItemTitle>Каналы</FilterItemTitle>
      {channelsStore.enabledChannels.map((channel) => {
        return (
          <ChannelFilterItem
            key={`filter_channel_${channel.id}`}
            channelName={channel.name}
            onChangeSocial={() => {
              channel.setActive(!channel.active);
              onChangeSocial();
            }}
            defaultChecked={channel.active}
          />
        );
      })}
    </FilterItem>
  );
});
