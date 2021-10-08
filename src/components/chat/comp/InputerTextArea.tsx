import { css } from "goober";
import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "antd";
import { TextAreaRef, TextAreaProps } from "antd/lib/input/TextArea";
import { useEffect } from "react";
import Picker, { IEmojiData } from "emoji-picker-react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

type TProps = Pick<
  TextAreaProps,
  "value" | "autoSize" | "onPressEnter" | "onPaste"
> & {
  onChange: (value: string) => void;
};

export const InputerTextArea = observer(
  ({ value, autoSize, onPressEnter, onChange, onPaste }: TProps) => {
    const inputRef = useRef<TextAreaRef | null>(null);

    useEffect(() => {
      inputRef.current!.focus();
    }, [inputRef]);

    const onEmojiClick = (event: React.MouseEvent, { emoji }: IEmojiData) => {
      inputRef.current!.focus();
      onChange(value + emoji);
    };

    return (
      <>
        <Dropdown
          overlay={
            <Picker onEmojiClick={onEmojiClick} native disableAutoFocus />
          }
          overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
          placement="topRight"
          trigger={["click"]}
        >
          <Button
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              box-sizing: border-box;
              padding: 4px 15px;
              cursor: pointer !important;
              transition: 0.2s;
              margin: 0 2px;
              border-radius: 4px;
              border: none;

              &:hover {
                background-color: #f5f5f5;
              }
            `}
          >
            <SmileOutlined
              className={css`
                color: #c0cecf;
                font-size: 24px;
                height: 24px;

                svg {
                  height: 100%;
                  display: block;
                }
              `}
            />
          </Button>
        </Dropdown>

        <Input.TextArea
          ref={inputRef}
          placeholder="Ваше сообщение"
          autoSize={autoSize}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={onPaste}
          onPressEnter={onPressEnter}
        />
      </>
    );
  }
);
