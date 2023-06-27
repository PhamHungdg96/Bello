import React from "react";
import { Drawer, Button, Row, Space} from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, LinkOutlined } from "@ant-design/icons";
function Modal(props: any) {
  return (
    <Drawer
    visible={true}
    onClose={props.onClose}
    // title={props.title}
    width={800}
    style={{ height: "100%", overflow: "hidden" }}
    title ={
      <Row justify="space-between" align="middle">
      <Button type="primary"><CheckOutlined />Mark completed</Button>
      <Space>
        <EditOutlined style={{fontSize: '20px', marginRight: '5px'}}/>
        <LinkOutlined style={{fontSize: '20px', marginRight: '5px'}}/>
        <DeleteOutlined style={{fontSize: '20px', marginRight: '5px'}}/>
        
      </Space>
    </Row>
    }
    // footer={
    //   <div style={{ textAlign: "right" }}>
    //     <Button onClick={props.onClose} style={{ marginRight: 8 }}>
    //       Cancel
    //     </Button>
    //     <Button onClick={props.onSave} type="primary">
    //       Save
    //     </Button>
    //   </div>
    // }
  >
    {props.children}
  </Drawer>
  );
}

export default Modal;
