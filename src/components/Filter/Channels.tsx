import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import ChannelFilterItem from "../contacts/comp/ChannelFilterItem";

export const Channels = observer(({ onChangeSocial }) => {
  const { channelsStore } = useStore();

  return (
    <>
      <h5>Каналы</h5>
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
    </>
  );
});
