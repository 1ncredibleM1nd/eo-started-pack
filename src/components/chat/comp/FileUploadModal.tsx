import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Icon } from "@/ui";
import { Button, Modal, Switch } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { bytesToSize } from "@/utils/bytesToSize";
import { InputerTextArea } from "./InputerTextArea";
import { useStore } from "@/stores";
import { IconFile, IconPen, IconTimes } from "@/images/icons";

type IProps = {
  clearFiles?: () => void;
  deleteFileOnHold?: (index: number) => void;
  changeFileOnHold?: (index: number) => void;
  openFileInput?: () => void;
  handleEnter?: (e: any) => void;
  onChange?: (name: string, value: string, event: any) => void;
  setSwitcher?: (key: string) => void;
  switcher?: string;
  messageContent?: string;
  inputRef?: any;
  fileOnHold?: any[];
  activeContactId?: string;
};

const FileUploadModal = observer((props: IProps) => {
  const {
    clearFiles,
    deleteFileOnHold,
    changeFileOnHold,
    handleEnter,
    onChange,
    messageContent,
    fileOnHold,
    activeContactId,
  } = props;

  const { contactStore } = useStore();
  const { activeSocial } = contactStore.activeContact;

  return (
    <Modal
      visible={fileOnHold.length > 0}
      onCancel={clearFiles}
      footer={[
        <Button
          key={"file_modal_button_cancel"}
          type="text"
          size={"large"}
          onClick={clearFiles}
        >
          Отмена
        </Button>,
        <Button
          key={"file_modal_button_enter"}
          type="primary"
          size={"large"}
          onClick={handleEnter}
        >
          Отправить
        </Button>,
      ]}
    >
      <div className="file_modal">
        <div className="file-holder-container">
          {fileOnHold.map((fileItem: any, index: number) => (
            <UploadMediaPreview
              key={`file_item_${index}`}
              fileItem={fileItem}
              onClickEdit={() => changeFileOnHold(index)}
              onClickDelete={() => deleteFileOnHold(index)}
            />
          ))}

          <div className="file_modal-options">
            {fileOnHold.find((file: any) => file.type === "image") && (
              <div className="compression-switch">
                <Switch size="small" defaultChecked />
                Оптимизировать изображения
              </div>
            )}
          </div>
        </div>

        {activeSocial !== "facebook" && activeSocial !== "instagram" && (
          <div className="file_modal-input">
            <div className="main_input in_modal">
              <InputerTextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                value={messageContent}
                onChange={(e) => {
                  onChange(activeContactId, e.target.value, e);
                }}
                onPressEnter={handleEnter}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
});

const ModalFileController = observer(
  ({
    onClickEdit,
    onClickDelete,
  }: {
    onClickEdit: any;
    onClickDelete: any;
  }) => {
    return (
      <div className="file_modal-file-controller">
        <div onClick={onClickDelete} className="file_controller-item delete">
          <IconTimes width={24} height={24} fill="#a3a3a3" />
        </div>
        <div onClick={onClickEdit} className="file_controller-item change">
          <IconPen width={18} height={18} fill="#a3a3a3" />
        </div>
      </div>
    );
  }
);

const UploadMediaPreview = observer(
  ({
    fileItem,
    onClickEdit,
    onClickDelete,
  }: {
    fileItem: any;
    onClickEdit: any;
    onClickDelete: any;
  }) => {
    const [file, setFile] = useState(null);

    const type = fileItem.type.split("/")[0];

    const reader = new FileReader();
    reader.readAsDataURL(fileItem);
    reader.onload = (e) => {
      const { result } = e.target;
      setFile(result);
    };

    if (type === "image") {
      return (
        <div className="file-holder">
          <ModalFileController
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />

          <div className="file-holder-preview">
            <div className="content">
              {!file ? <LoadingOutlined /> : <img src={file} alt="" />}
            </div>
          </div>

          <div className="file-holder-info">
            <div className="name">{fileItem.name}</div>
            <div className="size">{bytesToSize(fileItem.size)}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="file-holder video-holder">
        <ModalFileController
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />

        <div className="file-holder-preview file">
          <div className="content">
            <div className="play-icon">
              <IconFile width={24} height={24} fill="white" />
            </div>
          </div>
        </div>
        <div className="file-holder-info">
          <div className="name">{fileItem.name}</div>
          <div className="size">{bytesToSize(fileItem.size)}</div>
        </div>
      </div>
    );
  }
);

export default FileUploadModal;
