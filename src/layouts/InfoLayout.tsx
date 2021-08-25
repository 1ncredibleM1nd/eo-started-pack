import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { useStore } from "@/stores";
import { IconArrowLeft } from "@/images/icons";

const InfoLayout = observer(() => {
  const { appStore } = useStore();

  return (
    <div className="info_layout">
      <div className="back_trigger info">
        <Button
          onClick={() => appStore.setLayout("chat")}
          className="transparent"
        >
          <IconArrowLeft width={18} height={18} fill="#70acdd" />
        </Button>
      </div>
      {/*<User/>*/}
    </div>
  );
});

export default InfoLayout;
