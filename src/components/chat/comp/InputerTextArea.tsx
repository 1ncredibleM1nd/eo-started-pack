import React from "react";
import { css, styled } from "goober";
import { useRef } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "antd";
import { TextAreaRef, TextAreaProps } from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import "emoji-mart/css/emoji-mart.css";
// @ts-ignore
import { Picker } from "emoji-mart-virtualized";

type TProps = Pick<
  TextAreaProps,
  "value" | "autoSize" | "onPressEnter" | "onPaste" | "disabled"
> & {
  onChange: (value: string) => void;
  chatError?: { isError: boolean; commentError: string };
};

const PickerContainer = styled("div")`
  @supports (-moz-appearance: none) {
    .emoji-mart-scroll {
      overflow-y: hidden !important;
      margin-right: -5px !important;
    }

    .emoji-mart-scroll > div {
      width: auto !important;
    }
  }
`;

export const InputerTextArea = observer(
  ({
    value,
    autoSize,
    onPressEnter,
    onChange,
    onPaste,
    disabled,
    chatError,
  }: TProps) => {
    const inputRef = useRef<TextAreaRef | null>(null);

    useEffect(() => {
      inputRef.current!.focus();
    }, [inputRef]);
    return (
      <>
        <Dropdown
          overlay={
            <PickerContainer>
              <Picker
                set="facebook"
                emojiSize={24}
                perLine={6}
                sheetSize={32}
                showPreview={false}
                showSkinTones={false}
                native={true}
                onSelect={(emoji) => {
                  inputRef.current!.focus();
                  onChange(value + emoji.native);
                }}
              />
            </PickerContainer>
          }
          overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
          placement="topLeft"
          trigger={["click"]}
        >
          <Button
            className={css`
              display: flex;
              align-items: flex-end;
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
            `}
          >
            <SmileOutlined
              className={css`
                color: #a3a3a3;
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
          id="textInputMessage"
          ref={inputRef}
          placeholder="Ваше сообщение"
          autoSize={autoSize}
          tabIndex={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={onPaste}
          onPressEnter={onPressEnter}
        />
      </>
    );
  }
);
