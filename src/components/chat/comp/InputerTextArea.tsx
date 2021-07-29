import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "antd";
import { TextAreaRef, TextAreaProps } from "antd/lib/input/TextArea";
import { useEffect } from "react";

export const InputerTextArea = observer(
  ({ value, autoSize, onPressEnter, onChange }: TextAreaProps) => {
    const inputRef = useRef<TextAreaRef | null>(null);

    useEffect(() => {
      inputRef.current!.focus();
    }, [inputRef]);

    return (
      <Input.TextArea
        ref={inputRef}
        placeholder="Ваше сообщение"
        autoSize={autoSize}
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    );
  }
);
