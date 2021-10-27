import { useRef, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { css } from "goober";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { SidebarAddCommentFormContainer } from "@/components/Comments/Sidebar/SidebarAddCommentFormContainer";
import { SidebarAddCommentFormButtonCancel } from "@/components/Comments/Sidebar/SidebarAddCommentFormButtonCancel";
import { SidebarAddCommentFormButtonCreate } from "@/components/Comments/Sidebar/SidebarAddCommentFormButtonCreate";
import { SidebarAddCommentFormTextArea } from "@/components/Comments/Sidebar/SidebarAddCommentFormTextArea";

type TProps = {
  onCreate: (content: string) => void;
  onCancel: () => void;
};

export const SidebarAddCommentForm = observer(
  ({ onCreate, onCancel }: TProps) => {
    const [content, setContent] = useState("");
    const inputRef = useRef<TextAreaRef | null>(null);

    useEffect(() => {
      inputRef.current!.focus();
    }, [inputRef]);

    return (
      <SidebarAddCommentFormContainer>
        <SidebarAddCommentFormTextArea
          ref={inputRef}
          placeholder="Введите текст комментария"
          autoSize={false}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <div
          className={css`
            padding: 0 10px;
            margin-top: 10px;
          `}
        >
          <div
            className={css`
              padding: 10px 0;
              margin-top: 10px;
              border-top: 1px solid #f4f5f6;
            `}
          >
            <SidebarAddCommentFormButtonCreate
              type="link"
              onClick={() => onCreate(content)}
              disabled={content.trim().length <= 0}
            >
              Добавить
            </SidebarAddCommentFormButtonCreate>
            <SidebarAddCommentFormButtonCancel onClick={onCancel}>
              Отмена
            </SidebarAddCommentFormButtonCancel>
          </div>
        </div>
      </SidebarAddCommentFormContainer>
    );
  }
);
