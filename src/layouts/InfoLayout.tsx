import React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { Icon } from "@/ui";
import { useStore } from "@/stores";

const InfoLayout = observer(() => {
  const { appStore } = useStore();

  return (
    <div className="info_layout">
      <div className="back_trigger info">
        <Button
          onClick={() => appStore.setLayout("chat")}
          className="transparent"
        >
          <Icon className="icon_s blue-lite" name={`solid_arrow-left`} />
        </Button>
      </div>
      {/*<User/>*/}
    </div>
  );
});

export default InfoLayout;
