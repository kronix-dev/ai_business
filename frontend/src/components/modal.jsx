import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import * as React from "react";

export default function KModal({
  open,
  showOk = true,
  showCancel = true,
  setOpen,
  onOk = () => {},
  onCancel = () => {},
  closeable = true,
  children,
  width = window.innerWidth / 3,
  title = "",
  okText = "ok",
}) {
  return (
    <Modal
      closeIcon={
        <CloseOutlined
          onClick={() => {
            setOpen(false);
          }}
        />
      }
      title={title}
      width={width}
      open={open}
      okText={okText}
      closable={closeable}
      destroyOnClose
      onClose={() => {
        setOpen(false);
      }}
      okButtonProps={{
        onClick: onOk,
        style: !showOk ? { display: "none" } : {},
      }}
      cancelButtonProps={{
        onClick: () => {
          onCancel();
          setOpen(false);
        },
        style: !showCancel ? { display: "none" } : {},
        type: "primary",
        danger: true,
      }}
    >
      <div
        style={{
          maxHeight: window.innerHeight * 0.7,
          overflow: "auto",
          padding: 3,
        }}
      >
        {children}
      </div>
    </Modal>
  );
}
