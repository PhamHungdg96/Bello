import React, { useEffect, useState } from "react";
// import { CalendarOutlined, CheckSquareOutlined, FileOutlined, TagOutlined, DownOutlined,DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Select,
  Upload,
  Divider
} from 'antd';
import {Card, Input, Space, Row, Col, Typography, Dropdown, Button, Layout} from 'antd';
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";
import CommentBox from "../../CommentBox/CommentBox";
import type { MenuProps } from 'antd';
import "./TaskInfo.css";
import { ITask, ISubTask } from "../../../Interfaces/Bello";
interface TaskInfoProps {
  onClose: () => void;
  task: ITask;
  sectionId: number;
  updateTask: (sectionId: number, taskId: number, task: ITask) => void;
}
function TaskInfo(props: TaskInfoProps) {
  const { onClose, task, sectionId, updateTask } = props;
  // const [selectedColor, setSelectedColor] = useState("");
  const [taskValues, setTaskValues] = useState<ITask>({
    ...task,
  });

  const updateTitle = (value: string) => {
    setTaskValues({ ...taskValues, title: value });
  };

  const updateDesc = (value: string) => {
    setTaskValues({ ...taskValues, content: value });
  };

  const addSubTask = (value: string) => {
    const task: ISubTask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setTaskValues({
      ...taskValues,
      subTasks: [...taskValues.subTasks, task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...taskValues.subTasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setTaskValues({
      ...taskValues,
      subTasks: tempTasks,
    });
  };

  const updateSubTask = (id: number, value: boolean) => {
    const subTasks = [...taskValues.subTasks];

    const index = subTasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    subTasks[index].completed = Boolean(value);

    setTaskValues({
      ...taskValues,
      subTasks,
    });
  };



  const updateDate = (date: string) => {
    if (!date) return;

    setTaskValues({
      ...taskValues,
      dueDate: date,
    });
  };

  useEffect(() => {
    if (updateTask) updateTask(sectionId, taskValues.id, taskValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskValues]);;
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };
  
  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      
    },
    {
      label: '2nd menu item',
      key: '2',
      
    },
    {
      label: '3rd menu item',
      key: '3',
      danger: true,
    },
  ];
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const { TextArea } = Input;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Modal onClose={onClose}>
        <Layout>
          <Layout style={{ overflow: "auto", maxHeight: "calc(100% - 80px)", background: "#ffffff"}}>
            <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            >
              <Form.Item label="Title">
                <Input
                defaultValue={taskValues.title}
                value={taskValues.title}
                placeholder="Enter Title"
                onChange={(e) => updateTitle(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Select>
                  <Select.Option value="demo">To Do</Select.Option>
                  <Select.Option value="demo">Doing</Select.Option>
                  <Select.Option value="demo">Done</Select.Option>
                </Select>
              </Form.Item>
            
              <Form.Item label="Due Date">
                <DatePicker  onChange={(date, dateString) => updateDate(dateString)}/>
              </Form.Item>

              <Form.Item label="Description">
                <TextArea
                  rows={4}
                  defaultValue={taskValues.content}
                  value={taskValues.content}
                  placeholder="What is this task about"
                  onChange={(e) => updateDesc(e.target.value)}
                />
              </Form.Item>
              
              <Form.Item label="Attach" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                    <PlusOutlined />
                </Upload>
              </Form.Item>
              <Form.Item label="Collaborators">
               
              </Form.Item>
            </Form>
          </Layout>
            <div style={{ height: 80 }}>
              <CommentBox/>
            </div>
        </Layout>
    </Modal>
  );
}

export default TaskInfo;
