import React from "react";
import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Icon } from "@/ui/Icon/Icon";

interface ICommentError {
  commentTitle?: string;
  commentText?: string;
}

interface IChatError {
  isError: boolean;
  commentError?: ICommentError;
}

type TProps = {
  chatError: IChatError;
};

export const ErrorChat = observer((props: TProps) => {
  const { commentError } = props.chatError;
  return (
    <div
      className={css`
        padding: 30px 60px 30px 30px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        background: #f4f5f6;

        @media (max-width: 480px) {
          padding: 15px 60px 15px 30px;
        }
      `}
    >
      <div>
        <Icon
          name={"exclamation_circle"}
          className={css`
            margin-top: -3px;
            margin-right: 5px;
          `}
        />
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <span
          className={css`
            font-weight: bold;
            font-size: 14px;
          `}
        >
          {commentError?.commentTitle}
        </span>
        <span>{commentError?.commentText}</span>
      </div>
    </div>
  );
});
