import { styled } from "goober";
import { observer } from "mobx-react-lite";
import { Manager } from "@/stores/model";
import { AvatarThumb } from "../AvatarThumb/AvatarThumb";

type TProps = {
  from?: Manager;
};

const CommentFromContainer = styled("span")`
  display: flex;
  align-items: center;
`;

const CommentFromName = styled<{ isActive?: boolean }>("span")`
  display: block;
  color: #607d8b;
  font-size: 12px;
  margin-left: ${(props) => (props.isActive ? "5px" : "0")};
`;

export const CommentFrom = observer(({ from }: TProps) => {
  if (from) {
    return (
      <CommentFromContainer>
        <AvatarThumb
          size={18}
          img={from.avatar}
          name={from.username}
          round={true}
          textSizeRatio={1.75}
          textLength={2}
        />
        <CommentFromName isActive={true}>{from.username}</CommentFromName>
      </CommentFromContainer>
    );
  }

  return (
    <CommentFromName isActive={false}>{"Менеджер удалён"}</CommentFromName>
  );
});
