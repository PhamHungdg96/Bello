import React, { useEffect, useState } from "react";
import { CalendarOutlined, CheckSquareOutlined, FileOutlined, TagOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import {Card, Input, Space, Row, Col, Typography} from 'antd';
import { DatePicker } from 'antd';
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";

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
  const [selectedColor, setSelectedColor] = useState("");
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
  }, [taskValues]);
  return (
    <Modal onClose={onClose}>
      <Card>
        <Row>
          <Col span={12} className="taskinfo-box-title">
            
            <Typography.Title level={5}><FormOutlined /> Title</Typography.Title>
          </Col>
          <Col span={12}>
          <Input
              defaultValue={taskValues.title}
              value={taskValues.title}
              placeholder="Enter Title"
              onChange={(e) => updateTitle(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} className="taskinfo-box-title">
            
            <Typography.Title level={5}><FileOutlined /> Description</Typography.Title>
          </Col>
          <Col span={12}>
          <Input
            defaultValue={taskValues.content}
            value={taskValues.content || "Add a Description"}
            placeholder="Enter description"
            onChange={(e) => updateDesc(e.target.value)}
          />
          </Col>
        </Row>

        <Row>
          <Col span={12} className="taskinfo-box-title">
            <Typography.Title level={5}><CalendarOutlined /> Date</Typography.Title>
          </Col>
          <Col span={12}>
            <DatePicker
              onChange={(date, dateString) => updateDate(dateString)}
            />
          </Col>
        </Row>
        
        <Card className="taskinfo-box">
          <div className="taskinfo-box-title">
            <CheckSquareOutlined />
            <p>Subtasks</p>
          </div>
          <div className="taskinfo-box-task-list">
            {taskValues.subTasks?.map((item) => (
              <div key={item.id} className="taskinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateSubTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <DeleteOutlined onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <CustomInput
            text={"Add a SubTask"}
            placeholder="Enter subtask"
            onSubmit={addSubTask}
          />
        </Card>
      </Card>
    </Modal>
  );
}

export default TaskInfo;
