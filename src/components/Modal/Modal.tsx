import React from "react";
import { Drawer, Button} from 'antd';

function Modal(props: any) {
  return (
    <Drawer
      visible={true}
      onClose={props.onClose}
      title={props.title}
      width={800}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={props.onSave} type="primary">
            Save
          </Button>
        </div>
      }
    >
      {props.children}
    </Drawer>
  );
}

export default Modal;
