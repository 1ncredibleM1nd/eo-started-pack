import { ReactNode, useRef, useState } from "react";
import { useStore } from "@/stores";
import { observer } from "mobx-react-lite";
import { CarryOutOutlined } from "@ant-design/icons";
import { Tree, Input, Button, Popover } from "antd";
import { css, styled } from "goober";
import { Icon } from "@/ui/Icon/Icon";
import { Api } from "@/api";
import { TextAreaRef } from "antd/lib/input/TextArea";
import ReactTestUtils from "react-dom/test-utils";
import { useMediaQuery } from "react-responsive";

interface DataNode {
  title: ReactNode;
  key: string;
  icon: ReactNode;
  isLeaf?: boolean;
  children?: DataNode[];
  selectable?: boolean;
}
const TreeContainer = styled("div")`
  .ant-tree-switcher-noop {
    display: none;
  }
`;
export const SidebarTemplateAnswerAddGroup = observer(() => {
  const { contactStore, sidebarStore } = useStore();
  const templateAnswersStore = contactStore.activeContact?.templateAnswers;
  const templateAnswerGroups = templateAnswersStore?.getGroups() ?? [];
  const templateAnswers = templateAnswersStore?.getTemplates() ?? [];
  const initTreeData: DataNode[] = [];
  const [edited, setEdited] = useState(false);
  const nameInputRef = useRef<TextAreaRef | null>(null);

  const sidebarTakesAllSpace = useMediaQuery({ maxWidth: 992 });

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
            ???????? ???? ?????????????? ????????????, ???? ?????? ?????????????? ???????????? ???????? ???????????????? ????????????????
            ??????????????
          </h2>
          <Button
            type={"text"}
            className={css`
              color: #ef8079;
            `}
            onClick={onRemove}
          >
            ?????????????? ????????????
          </Button>
          <Button type={"text"} onClick={onCancel}>
            ????????????
          </Button>
        </div>
      );
    }
  );

  const removeTemplateAnswer = async (id: number) => {
    if (await Api.templateAnswers.remove(id)) {
      templateAnswersStore?.delete(id);
    }
  };

  //TODO ????????????????????
  const insertTextToInput = (text: string) => {
    const element = document.getElementById("textInputMessage");
    if (element) {
      element.value = text;
      if (sidebarTakesAllSpace) {
        sidebarStore.setOpened(false);
      }
      element.focus();
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

      const response = await Api.templateAnswers.addGroup(schoolId, name);
      if (response) {
        const id = response.data?.data?.id ?? null;
        if (id) {
          templateAnswersStore?.addGroup(id, name, true);
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
                ???????????????? ????????????
              </Button>
              <Button type={"text"} onClick={() => setMenuVisible(false)}>
                ????????????
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
          ???????????????? ????????????
        </div>
      </Popover>
    );
  });

  const SidebarTemplateRemoveContainer = observer(
    ({ id: removeTemplateAnswerGroupId }: { id: number }) => {
      const [menuVisible, setMenuVisible] = useState(false);

      const removeTemplateAnswerGroup = async () => {
        if (
          await Api.templateAnswers.removeGroup(removeTemplateAnswerGroupId)
        ) {
          templateAnswersStore?.deleteGroup(removeTemplateAnswerGroupId);
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
              <span> {templateAnswer.name}</span>
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
              icon: null,
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

  let expandedKeysList: React.Key[];
  expandedKeysList = [];

  initTreeData.forEach((i) => {
    expandedKeysList.push(i.key);
  });

  const [expandedKeys, setExpandedKeys] =
    useState<React.Key[]>(expandedKeysList);

  const onExpand = (keys: React.Key[]) => {
    setExpandedKeys(keys);
  };

  return (
    <div>
      <div
        className={css`
          font-weight: 500;
          margin: 10px 0;
        `}
      >
        ?????????????? ??????????
      </div>
      <SidebarTemplateAddContainer />
      <TreeContainer>
        <Tree
          showLine={false}
          showIcon={false}
          treeData={initTreeData}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
        />
      </TreeContainer>
    </div>
  );
});
