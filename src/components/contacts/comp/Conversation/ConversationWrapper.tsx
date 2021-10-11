import { styled } from "goober";

export const ConversationWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 5px;

  @media (max-width: 768px) {
    padding-right: 24px;
  }
`;
