import React, { useState } from "react";
import { AlignLeftOutlined, CheckSquareOutlined, ClockCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { formatDate } from "../../Helper/Util";
import { ITask} from "../../Interfaces/Bello";
import {Col, Row, Card, Space } from "antd";
import {Dropdown} from "antd"
import type { MenuProps } from 'antd';
import "./Task.css";
import TaskInfo from "./TaskInfo/TaskInfo";
interface TaskProps {
  task: ITask;
  sectionId: number;
  removeTask: (sectionId: number, taskId: number) => void;
  onDragEnd: (sectionId: number, taskId: number) => void;
  onDragEnter: (sectionId: number, taskId: number) => void;
  updateTask: (sectionId: number, taskId: number, task: ITask) => void;
}
const items: MenuProps['items'] = [

  {
    key: '1',
    danger: true,
    label: 'Delete Section',
  },
];
function Task(props: TaskProps) {
  const { task, sectionId, removeTask, onDragEnd, onDragEnter, updateTask} = props;
  const { id, title, content, dueDate, subTasks, status } = task;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <TaskInfo
          onClose={() => setShowModal(false)}
          task={task}
          sectionId={sectionId}
          updateTask={updateTask}
        />
      )}
      <div
        className="task"
        key={task.id}
        draggable
        onDragEnd={() => onDragEnd(sectionId, id)}
        onDragEnter={() => onDragEnter(sectionId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="task-top">
          {/* <div className="task-top-labels">
            {status?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div> */}
          <div
            className="task-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <EllipsisOutlined />
            {showDropdown && (
              <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <EllipsisOutlined />
                </Space>
              </a>
               </Dropdown>
            )}
          </div>
        </div>
        <div className="task-title">{title}</div>
        <div>
          <p title={content}>
            <AlignLeftOutlined />
          </p>
        </div>
        <div className="task-footer">
          {dueDate && (
            <p className="task-footer-item">
              <ClockCircleOutlined className="task-footer-icon" />
              {formatDate(dueDate)}
            </p>
          )}
          {subTasks && subTasks?.length > 0 && (
            <p className="task-footer-item">
              <CheckSquareOutlined className="task-footer-icon" />
              {subTasks?.filter((item) => item.completed)?.length}/{subTasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Task;
