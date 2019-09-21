import React from "react";
import { Modal } from "antd";

export const ConfirmModal = ({title, visible, onOk, onCancel, children}) => {
    /**
     * @TODO
     * visible -> props.visible
     * handleCancel -> props.handleCancel
     * handleOk -> props.handleOk
     * data -> props.data
     */
    return (
        <Modal
          title={title}
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          {children}
        </Modal>

    )
}