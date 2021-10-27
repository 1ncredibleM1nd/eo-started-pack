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

const CommentFromName = styled<{ active?: boolean }>("span")(
  ({ active }) => `
  display: block;
  color: #607d8b;
  font-size: 12px;
  margin-left: ${active ? "5px" : "0"};
`
);

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
        <CommentFromName active={true}>{from.username}</CommentFromName>
      </CommentFromContainer>
    );
  }

  return <CommentFromName active={false}>{"Менеджер удалён"}</CommentFromName>;
});
