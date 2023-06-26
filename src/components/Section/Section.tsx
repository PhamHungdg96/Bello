import React, { useState } from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import {Col, Row, Card, Space } from "antd";
import Task from "../Task/Task";
import {Dropdown} from "antd"
import CustomInput from "../CustomInput/CustomInput";
import type { MenuProps } from 'antd';
import "./Section.css";
import { ISection, ITask } from "../../Interfaces/Bello";

interface SectionProps {
  section: ISection;
  addTask: (sectionId: number, title: string) => void;
  removeSection: (sectionId: number) => void;
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
function Section(props: SectionProps) {
  const {
    section,
    addTask,
    removeSection,
    removeTask,
    onDragEnd,
    onDragEnter,
    updateTask,
  } = props;
  const [showDropdown, setShowDropdown] = useState(true);
  return (
    <Col className="section">
      <div className="section-inner" key={section?.id}>
        <Row className="section-header">
          <p className="section-header-title">
            {section?.name}
            <span>{section?.tasks?.length || 0}</span>
          </p>
          <div
            className="section-header-title-more"
            onClick={() => setShowDropdown(true)}
          >
            {showDropdown && (
              <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <EllipsisOutlined style={{fontSize:'20px'}}/>
                </Space>
              </a>
               </Dropdown>
            )}
          </div>
        </Row>
        <div className="section-cards custom-scroll">
          {section?.tasks?.map((item) => (
            <Task
              key={item.id}
              task={item}
              sectionId={section.id}
              removeTask={removeTask}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateTask={updateTask}
            />
          ))}
          <CustomInput
            text="+ Add Task"
            placeholder="Enter Task Title"
            displayClass="section-add-card"
            editClass="section-add-card-edit"
            onSubmit={(value: string) => addTask(section?.id, value)}
          />
        </div>
      </div>
    </Col>
  );
}

export default Section;
