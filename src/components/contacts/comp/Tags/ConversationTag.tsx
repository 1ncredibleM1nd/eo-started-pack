import { css } from "goober";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { styled } from "goober";

type TProps = {
  id?: number;
  isButton: boolean;
};

export const Tag = styled("div")`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 5px 5px 0 0;
  padding: 0 10px;
  min-height: 26px;
  max-width: 150px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  span {
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #050505;
    font-size: 13px;
  }
`;

export const ConversationTag = observer(({ id, isButton }: TProps) => {
  const { tagsStore } = useStore();

  const tag = tagsStore.getById([id])[0];
  return (
    <Tag
      className={css`
        background-color: ${isButton ? "#F4F5F6" : tag?.color};
      `}
    >
      <span
        className={css`
          color: ${isButton ? "#607d8b" : "#050505"};
        `}
      >
        {isButton ? "..." : tag?.name}
      </span>
    </Tag>
  );
});
