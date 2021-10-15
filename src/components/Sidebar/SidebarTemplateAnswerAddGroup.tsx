import { ReactNode, useEffect, useRef, useState } from "react";
import { useStore } from "@/stores";
import { observer } from "mobx-react-lite";
import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import { Tree, Input, Button, Popover } from "antd";
import { css, styled } from "goober";
import { Icon } from "@/ui/Icon/Icon";
import { templateAnswers as templateAnswerApi } from "@/api";
import { TextAreaRef, TextAreaProps } from "antd/lib/input/TextArea";
import ReactTestUtils from "react-dom/test-utils";

interface DataNode {
  title: ReactNode;
  key: string;
  icon: ReactNode;
  isLeaf?: boolean;
  children?: DataNode[];
  selectable?: boolean;
}

export const SidebarTemplateAnswerAddGroup = observer(() => {
  const { templateAnswersStore, contactStore } = useStore();
  const templateAnswerGroups = templateAnswersStore.getGroups() ?? [];
  const templateAnswers = templateAnswersStore.getTemplates() ?? [];
  const initTreeData: DataNode[] = [];
  const [edited, setEdited] = useState(false);
  const nameInputRef = useRef<TextAreaRef | null>(null);

  function updateTreeData(
    list: DataNode[],
    key: React.Key,
    children: DataNode[]
  ): DataNode[] {
    return list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });
  }

  const SidebarTemplateAnswerConfirmRemove = observer(
    ({ onRemove, onCancel }: { onRemove: any; onCancel: any }) => {
      return (
        <div
          className={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <h2
            className={css`
              font-weight: bold;
              font-size: 14px;
              text-align: center;
            `}
          >
            Если вы удалите раздел, то все шаблоны внутри него перейдут в раздел
            «Общее»
          </h2>
          <Button
            type={"text"}
            className={css`
              color: #ef8079;
            `}
            onClick={onRemove}
          >
            Удалить раздел
          </Button>
          <Button type={"text"} onClick={onCancel}>
            Отмена
          </Button>
        </div>
      );
    }
  );

  const removeTemplateAnswer = async (id: number) => {
    if (await templateAnswerApi.remove(id)) {
      templateAnswersStore.delete(id);
    }
  };

  //TODO рефаторить
  const insertTextToInput = (text: string) => {
    const element = document.getElementById("textInputMessage");
    if (element) {
      element.value = element.value + text;
      ReactTestUtils.Simulate.change(element);
    }
  };

  const SidebarTemplateAddContainer = observer(() => {
    const [menuVisible, setMenuVisible] = useState(false);

    const addTemplateAnswerGroup = async () => {
      const name = nameInputRef.current?.input?.value ?? "";

      if (!name.length) {
        nameInputRef.current?.focus();
        return;
      }

      const schoolId = contactStore?.activeContact?.schoolId ?? -1;

      const response = await templateAnswerApi.addGroup(schoolId, name);
      if (response) {
        const id = response.data?.data?.id ?? null;
        if (id) {
          templateAnswersStore.addGroup(id, name, true);
          setMenuVisible(false);
        }
      }
    };

    return (
      <Popover
        trigger={"click"}
        content={
          <div
            className={css`
              padding: 10px;
              max-width: 200px;
            `}
          >
            <div
              className={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <Input ref={nameInputRef} />
              <Button
                type={"text"}
                className={css`
                  color: #ef8079;
                  margin-top: 10px;
                `}
                onClick={() => addTemplateAnswerGroup()}
              >
                Добавить раздел
              </Button>
              <Button type={"text"} onClick={() => setMenuVisible(false)}>
                Отмена
              </Button>
            </div>
          </div>
        }
        placement={"bottom"}
        destroyTooltipOnHide
        visible={menuVisible}
        onVisibleChange={(visible) => setMenuVisible(visible)}
      >
        <div
          className={css`
            align-items: center;
            cursor: pointer;
            color: #1890ff;
            padding: 0;
            margin: 0 5px 5px 0;
          `}
          onClick={() => setMenuVisible(true)}
        >
          Добавить раздел
        </div>
      </Popover>
    );
  });

  const SidebarTemplateRemoveContainer = observer(
    ({ id: removeTemplateAnswerGroupId }: { id: number }) => {
      const [menuVisible, setMenuVisible] = useState(false);

      const removeTemplateAnswerGroup = async () => {
        if (await templateAnswerApi.removeGroup(removeTemplateAnswerGroupId)) {
          templateAnswersStore.deleteGroup(removeTemplateAnswerGroupId);
        }
        setMenuVisible(false);
      };

      return (
        <Popover
          trigger={"click"}
          content={
            <div
              className={css`
                padding: 10px;
                max-width: 200px;
              `}
            >
              <SidebarTemplateAnswerConfirmRemove
                onRemove={() => removeTemplateAnswerGroup()}
                onCancel={() => setMenuVisible(false)}
              />
            </div>
          }
          placement={"bottom"}
          destroyTooltipOnHide
          visible={menuVisible}
          onVisibleChange={(visible) => setMenuVisible(visible)}
        >
          <Icon
            name={"icon_delete"}
            fill={"#607d8b"}
            onClick={() => setMenuVisible(true)}
            className="template-answer-delete-btn"
          />
        </Popover>
      );
    }
  );

  function insertTreeData(list: DataNode[]) {
    list.unshift({
      title: (
        <div className="template-answer-element">
          <span>
            <Input />
          </span>
          <Icon
            name={"icon_delete"}
            fill={"#607d8b"}
            className="template-answer-delete-btn"
          />
        </div>
      ),
      key: "0-" + list.length,
      icon: <CarryOutOutlined />,
      children: [],
      isLeaf: false,
      selectable: false,
    });
    setTreeData(list);
  }

  templateAnswerGroups.map((templateAnswerGroup, i) => {
    const children: DataNode[] = [];
    templateAnswers.map((templateAnswer, j) => {
      if (templateAnswer.groupId === templateAnswerGroup.id) {
        children.push({
          title: (
            <div
              className="template-answer-element"
              onClick={() => insertTextToInput(templateAnswer.content)}
            >
              <span>{templateAnswer.name}</span>
              <Icon
                name={"icon_delete"}
                fill={"#607d8b"}
                onClick={() => removeTemplateAnswer(templateAnswer.id)}
                className="template-answer-delete-btn"
              />
            </div>
          ),
          key: "0-" + i + "-" + j,
          icon: <CarryOutOutlined />,
          selectable: false,
          children: [
            {
              title: (
                <div
                  onClick={() => insertTextToInput(templateAnswer.content)}
                  dangerouslySetInnerHTML={{
                    __html: templateAnswer.content.split("\n").join("<br>"),
                  }}
                ></div>
              ),
              key: "0-" + i + "-" + j + "-1",
              icon: "",
              isLeaf: true,
              selectable: false,
            },
          ],
        });
      }
    });

    initTreeData.push({
      title: (
        <div className="template-answer-element template-answer-group-element">
          <span>{templateAnswerGroup.name}</span>
          {templateAnswerGroup.isDeletable ? (
            <SidebarTemplateRemoveContainer id={templateAnswerGroup.id} />
          ) : (
            <></>
          )}
        </div>
      ),
      key: "0-" + i,
      icon: <CarryOutOutlined />,
      children: children,
      isLeaf: false,
      selectable: false,
    });
  });

  const [treeData, setTreeData] = useState(initTreeData);

  return (
    <div>
      <div
        className={css`
          font-weight: 500;
          margin: 10px 0;
        `}
      >
        Быстрые фразы
      </div>
      <SidebarTemplateAddContainer />
      <Tree showLine={false} showIcon={false} treeData={initTreeData} />
    </div>
  );
});
