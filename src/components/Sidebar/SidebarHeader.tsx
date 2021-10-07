import { css, styled } from "goober";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Icon } from "@/ui/Icon/Icon";

const SidebarHeaderWrapper = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const SidebarHeader = observer(() => {
  const { sidebarStore } = useStore();

  return (
    <SidebarHeaderWrapper>
      <div
        className={css`
          min-width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Icon
          name={"icon_arrow_left"}
          fill="#70acdd"
          onClick={() => sidebarStore.setOpened(false)}
        />
      </div>
    </SidebarHeaderWrapper>
  );
});
