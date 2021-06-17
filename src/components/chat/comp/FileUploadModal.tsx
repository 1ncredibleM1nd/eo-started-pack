import React, { useState } from "react";
import { observer } from "mobx-react";
import { Icon } from "@ui";
import { Button, Popover, Modal, Switch, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
//
const { TextArea } = Input;

const FileUploadModal = observer((props: IProps) => {
  const {
    clearFiles,
    deleteFileOnHold,
    changeFileOnHold,
    openFileInput,
    handleKeyDown,
    handleKeyUp,
    handleEnter,
    onChange,
    setSwitcher,
    switcher,
    messageContent,
    inputRef,
    fileOnHold,
    activeContactId,
  } = props;

  const bytesToSize = (bytes: any) => {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    let i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    // @ts-ignore
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  const modalFileContoller = (index: number) => {
    return (
      <div className="file_modal-file-controller">
        <div
          onClick={() => deleteFileOnHold(index)}
          className="file_controller-item delete"
        >
          <Icon className="icon_m lite-grey" name="solid_times" />
        </div>
        <div
          onClick={() => changeFileOnHold(index)}
          className="file_controller-item change"
        >
          <Icon className="icon_s lite-grey" name="solid_pen" />
        </div>
      </div>
    );
  };

  const UploadMediaPreview = ({
    fileItem,
    index,
  }: {
    fileItem: any;
    index: number;
  }) => {
    const [file, setFile] = useState(null);

    const type = fileItem.type.split("/")[0];

    let reader = new FileReader();
    reader.readAsDataURL(fileItem);
    reader.onload = (e) => {
      const { result } = e.target;
      setFile(result);
    };

    if (type === "image") {
      return (
        <div className="file-holder">
          {modalFileContoller(index)}

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
        {modalFileContoller(index)}
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

    return null;
  };

  return (
    <Modal
      visible={fileOnHold.length > 0}
      onCancel={clearFiles}
      footer={[
        <Button
          className="font_size-normal"
          type="primary"
          onClick={clearFiles}
        >
          Отмена
        </Button>,
        <Button
          className="font_size-normal"
          type="primary"
          onClick={handleEnter}
        >
          Отправить
        </Button>,
      ]}
    >
      <div className="file_modal">
        <div className="file-holder-container">
          {fileOnHold.map((fileItem: any, index: number) => {
            return (
              <UploadMediaPreview
                key={`file_item_${index}`}
                fileItem={fileItem}
                index={index}
              />
            );
          })}

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
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onPressEnter={handleEnter}
              autoSize
              placeholder="Ваше сообщение"
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

export default FileUploadModal;
