import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css } from "goober";
import { Select, Dropdown, Button, Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useAntInputCursor } from "@/hooks/useAntInputCursor";
import { Icon } from "@/ui/Icon/Icon";
import TextArea from "rc-textarea";
import { templateAnswers as templateAnswerApi } from "@/api";
import { TextAreaRef, TextAreaProps } from "antd/lib/input/TextArea";

const { Option } = Select;

export const SidebarTemplateAnswerAddTemplate = observer(() => {
  const [visible, setVisible] = useState(false);

  const { setRef, getCursorPos, insertAt } = useAntInputCursor();

  const nameInputRef = useRef();
  const contentInputRef = useRef();

  const { templateAnswersStore, contactStore } = useStore();
  const templateAnswerGroups = templateAnswersStore.getGroups() ?? [];

  const groupDefaultValue =
    templateAnswerGroups.filter((element) => {
      return element.isDeletable === false;
    })[0]?.id ?? "";

  const [selectGroupId, setSelectGroupId] = useState(groupDefaultValue);

  const onEmojiClick = (event: React.MouseEvent, { emoji }: IEmojiData) => {
    //insertAt(getCursorPos().start, emoji)
  };

  const createNewTemplate = () => {
    setSelectGroupId(groupDefaultValue);
    setVisible(!visible);
  };

  const addTemplateAnswer = async () => {
    const name = nameInputRef.current?.input?.value ?? "";
    const content = contentInputRef.current?.state?.value ?? "";

    if (!name.length) {
      nameInputRef.current?.focus();
      return;
    }

    if (!content.length) {
      contentInputRef.current?.focus();
      return;
    }
    const response = await templateAnswerApi.add(selectGroupId, name, content);
    if (response) {
      const id = response.data?.data?.id ?? null;
      if (id) {
        templateAnswersStore.add(id, name, selectGroupId, content);
        setVisible(false);
      }
    }
  };

  return (
    <div>
      {visible ? (
        <div
          className={css`
            background: #fff;
            border-radius: 10px;
            padding: 10px;
            position: relative;
          `}
        >
          <Input
            ref={nameInputRef}
            className={css`
              border: 0;
              padding: 0;
              outline: none !important;
              box-shadow: none !important;
            `}
            placeholder="Введите название шаблона"
          />

          <TextArea
            ref={contentInputRef}
            className="template-description"
            placeholder="Введите содержание шаблона.&#10;С учётом переносов"
          />

          {/*<Dropdown
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
                cursor: pointer !important;
                box-shadow: none;
                border: none;
                position: absolute;
                right: 0;
                bottom: 50px;
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
                </Dropdown>*/}

          <div
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Select
              key={"sta" + contactStore?.activeContact?.id}
              suffixIcon={
                <Icon
                  fill={"currentColor"}
                  name={"icon_triangle"}
                  className={css`
                    width: 10px;
                    height: 6px;
                  `}
                />
              }
              defaultValue={groupDefaultValue}
              onChange={(value) => setSelectGroupId(value)}
            >
              {templateAnswerGroups.map((templateAnswerGroup) => (
                <Option
                  key={"stao_" + templateAnswerGroup.id}
                  value={templateAnswerGroup.id}
                >
                  {templateAnswerGroup.name}
                </Option>
              ))}
            </Select>
            <div>
              <Button
                className="add-template-btn"
                onClick={() => addTemplateAnswer()}
              >
                Добавить
              </Button>
              <Button
                className={css`
                  margin-left: 15px;
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
                onClick={() => setVisible(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          className={css`
            background: initial;
            border-color: #3498db;
            border-radius: 5px;
            color: #3498db;
            height: 25px;
            padding: 0 10px;
          `}
          onClick={() => createNewTemplate()}
        >
          Создать новый шаблон
        </Button>
      )}
    </div>
  );
});
