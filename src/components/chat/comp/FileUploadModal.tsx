import React, { useState } from "react";
import { observer } from "mobx-react";
import { Icon } from "@/ui";
import { Button, Modal, Switch, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { bytesToSize } from "@/utils/bytesToSize";

type IProps = {
  clearFiles?: () => void;
  deleteFileOnHold?: (index: number) => void;
  changeFileOnHold?: (index: number) => void;
  openFileInput?: () => void;
  handleKeyDown?: (e: any) => void;
  handleKeyUp?: (e: any) => void;
  handleEnter?: (e: any) => void;
  onChange?: (name: string, value: string, event: any) => void;
  setSwitcher?: (key: string) => void;
  switcher?: string;
  messageContent?: string;
  inputRef?: any;
  fileOnHold?: any[];
  activeContactId?: string;
};

const { TextArea } = Input;

const FileUploadModal = observer((props: IProps) => {
  const {
    clearFiles,
    deleteFileOnHold,
    changeFileOnHold,
    handleKeyDown,
    handleKeyUp,
    handleEnter,
    onChange,
    messageContent,
    inputRef,
    fileOnHold,
    activeContactId,
  } = props;

  return (
    <Modal
      visible={fileOnHold.length > 0}
      onCancel={clearFiles}
      footer={[
        <Button
          key={"file_modal_button_cancel"}
          className="font_size-normal"
          type="text"
          size={"large"}
          onClick={clearFiles}
        >
          Отмена
        </Button>,
        <Button
          key={"file_modal_button_enter"}
          className="font_size-normal"
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

        <div className="file_modal-input">
          {/* <div className="inputer_btn">
            <Button onClick={openFileInput} className="transparent">
              <Icon className="icon_m blue-lite" name="solid_plus" />
            </Button>
          </div> */}
          <div className="main_input in_modal">
            <TextArea
              placeholder="Ваше сообщение"
              autoSize={{ minRows: 3, maxRows: 5 }}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onPressEnter={handleEnter}
              ref={inputRef}
              onChange={(e) => onChange(activeContactId, e.target.value, e)}
              value={messageContent}
            />
          </div>
        </div>
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
          <Icon className="icon_m lite-grey" name="solid_times" />
        </div>
        <div onClick={onClickEdit} className="file_controller-item change">
          <Icon className="icon_s lite-grey" name="solid_pen" />
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

    // if (type === "audio") {
    //   return (
    //     <div className='file-holder video-holder'>
    //       {modalFileContoller(index)}
    //       <div className='file-holder-preview'>
    //         <div className='content'>
    //           <div className='play-icon'>
    //             <Icon className='icon_m white' name='solid_file-audio' />
    //           </div>
    //           {fileItem.url ? (
    //             <Fragment>
    //               <video autoPlay muted>
    //                 <source src={fileItem.url} type='video/mp4' />
    //               </video>
    //             </Fragment>
    //           ) : (
    //             <Fragment></Fragment>
    //           )}
    //         </div>
    //       </div>
    //       <div className='file-holder-info'>
    //         <div className='name'>{fileItem.file.name}</div>
    //         <div className='size'>{bytesToSize(fileItem.file.size)}</div>
    //       </div>
    //     </div>
    //   );
    // }

    // if (type === "video") {
    //   return (
    //     <div className='file-holder video-holder'>
    //       {modalFileContoller(index)}
    //       <div className='file-holder-preview'>
    //         <div className='content'>
    //           <div className='play-icon'>
    //             <Icon className='icon_m white' name='solid_play' />
    //           </div>
    //           {fileItem.url ? (
    //             <Fragment>
    //               <video autoPlay muted>
    //                 <source src={fileItem.url} type='video/mp4' />
    //               </video>
    //             </Fragment>
    //           ) : (
    //             <Fragment></Fragment>
    //           )}
    //         </div>
    //       </div>
    //       <div className='file-holder-info'>
    //         <div className='name'>{fileItem.file.name}</div>
    //         <div className='size'>{bytesToSize(fileItem.file.size)}</div>
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="file-holder video-holder">
        <ModalFileController
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />

        <div className="file-holder-preview file">
          <div className="content">
            <div className="play-icon">
              <Icon className="icon_m white" name="solid_file" />
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
