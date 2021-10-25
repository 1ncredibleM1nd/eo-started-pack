import { useRef, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Input } from "antd";
import { Button } from "antd";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { Task } from "@/stores/model";
import { useStore } from "@/stores";
import { DatePicker } from "@/ui/DatePicker/DatePicker";
import dayjs from "@/services/dayjs";

type TProps = {
  onCancel: () => void;
};

export const SidebarAddTaskForm = observer(({ onCancel }: TProps) => {
  const { contactStore, usersStore } = useStore();
  const [date, setDate] = useState(dayjs().add(1, "day"));
  const [taskContent, setTaskContent] = useState("");
  const inputRef = useRef<TextAreaRef | null>(null);

  useEffect(() => {
    inputRef.current!.focus();
  }, [inputRef]);

  const createTask = async () => {
    if (date === null || taskContent === null || taskContent === "") {
      return;
    }

    const newTask = new Task(
      1,
      taskContent,
      usersStore.user?.id,
      "active",
      dayjs().unix(),
      dayjs(date).unix()
    );

    await contactStore.createTask(newTask);
    setDate(dayjs().add(1, "day"));
    setTaskContent("");
    onCancel();
  };

  const cancelCreating = () => {
    setDate(dayjs().add(1, "day"));
    setTaskContent("");
    onCancel();
  };

  return (
    <div
      className={css`
        margin-top: 10px;
        background-color: #fff;
        border-radius: 5px;
        padding: 10px 0;
      `}
    >
      <Input.TextArea
        ref={inputRef}
        placeholder="Введите текст задачи"
        autoSize={false}
        onChange={(e) => setTaskContent(e.target.value)}
        value={taskContent}
        className={css`
          border: none;
          box-shadow: none !important;
          padding: 0 10px;
          display: block;
          height: 100px !important;
          font-size: 14px;
          line-height: 16px;
          border-radius: 5px 5px 0 0 !important;
        `}
      />

      <div
        className={css`
          padding: 0 10px;
          margin-top: 10px;
        `}
      >
        <div
          className={css`
            display: inline-flex;
            justify-content: center;
            border-radius: 5px;
            background-color: #f4f5f6 !important;
            width: 150px;
          `}
        >
          <DatePicker
            className={css`
              padding: 3px 10px;
              min-width: 100%;

              input {
                min-width: 100%;
                font-size: 12px;
                cursor: pointer;
              }
            `}
            onChange={(date) => {
              setDate(date);
            }}
            showTime
            value={date}
            bordered={false}
            format={"YYYY-MM-DD HH:mm:ss"}
            suffixIcon={null}
            placeholder="Укажите дату"
            inputReadOnly={true}
          />
        </div>
        <div
          className={css`
            padding: 10px 0;
            margin-top: 10px;
            border-top: 1px solid #f4f5f6;
          `}
        >
          <Button
            type="link"
            className={css`
              padding: 3px 10px;
              margin-right: 10px;
              height: auto;
              font-size: 12px;
              line-height: 16px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 5px;
              color: #fff;
              background-color: #3498db;
              border: 1px solid #3498db !important;
              transition: 0.3s;

              &:focus {
                background-color: #3498db;
                color: #fff;
              }

              &:hover {
                color: #3498db;
                background-color: #fff;
                transition: 0.3s;
              }
            `}
            onClick={() => {
              createTask();
            }}
          >
            Добавить
          </Button>
          <Button
            type="link"
            className={css`
              padding: 3px 10px;
              height: auto;
              font-size: 12px;
              line-height: 16px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 5px;
              color: #3498db;
              background-color: #fff;
              border: 1px solid #3498db !important;
              transition: 0.3s;

              &:hover {
                background-color: #fff;
                transition: 0.3s;
              }
            `}
            onClick={() => cancelCreating()}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
});
