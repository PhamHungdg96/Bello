import React, { useEffect, useState } from "react";
import Section from "../Section/Section";
import {Card, Row, Col, Space} from 'antd';
import "./Project.css";
import CustomInput from "../CustomInput/CustomInput";
import { ITask, ISection } from "../../Interfaces/Bello";
import { fetchSectionList, updateLocalStorageSections } from "../../Helper/APILayers";

function Project() {
  const [sections, setSections] = useState<ISection[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const sections: ISection[] = await fetchSectionList();
    setSections(sections);
  }
  const [targetTask, setTargetTask] = useState({
    sectionId: 0,
    taskId: 0,
  });

  const addSectionHandler = (name: string) => {
    const tempSectionsList = [...sections];
    tempSectionsList.push({
      id: Date.now() + Math.random() * 2,
      name: name,
      createdBy: "Admin",
      tasks: []
    });
    setSections(tempSectionsList);
  };

  const removeSection = (sectionId: number) => {
    const sectionIndex = sections.findIndex((item: ISection) => item.id === sectionId);
    if (sectionIndex < 0) return;

    const tempSectionsList = [...sections];
    tempSectionsList.splice(sectionIndex, 1);
    setSections(tempSectionsList);
  };

  const addTaskHandler = (sectionId: number, title: string) => {
    const sectionIndex = sections.findIndex((item: ISection) => item.id === sectionId);
    if (sectionIndex < 0) return;

    const tempSectionsList = [...sections];
    tempSectionsList[sectionIndex].tasks.push({
      id: Date.now() + Math.random() * 2,
      title: title,
      status: 'Completed',
      statusArray: "",
      subTasks: [],
      dueDate: "2023-06-16",
      content: "",
      fileAttack: "123.txt",
      createdBy: "Admin",
    });
    setSections(tempSectionsList);
  };

  const removeTask = (sectionId: number, taskId: number) => {
    const sectionIndex = sections.findIndex((item: ISection) => item.id === sectionId);
    if (sectionIndex < 0) return;

    const tempSectionsList = [...sections];
    const tasks = tempSectionsList[sectionIndex].tasks;

    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    if (taskIndex < 0) return;

    tasks.splice(taskIndex, 1);
    setSections(tempSectionsList);
  };

  const updateTask= (sectionId: number, taskId: number, task: ITask) => {
    const sectionIndex = sections.findIndex((item) => item.id === sectionId);
    if (sectionIndex < 0) return;

    const tempSectionsList = [...sections];
    const tasks = tempSectionsList[sectionIndex].tasks;

    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    if (taskIndex < 0) return;

    tempSectionsList[sectionIndex].tasks[taskIndex] = task;

    setSections(tempSectionsList);
  };

  const onDragEnd = (sectionId: number, taskId: number) => {
    const sourceSectionIndex = sections.findIndex(
      (item: ISection) => item.id === sectionId,
    );
    if (sourceSectionIndex < 0) return;

    const sourceTaskIndex = sections[sourceSectionIndex]?.tasks?.findIndex(
      (item) => item.id === taskId,
    );
    if (sourceTaskIndex < 0) return;

    const targetSectionIndex = sections.findIndex(
      (item: ISection) => item.id === targetTask.sectionId,
    );
    if (targetSectionIndex < 0) return;

    const targetTaskIndex = sections[targetSectionIndex]?.tasks?.findIndex(
      (item) => item.id === targetTask.taskId,
    );
    if (targetTaskIndex < 0) return;

    const tempSectionsList = [...sections];
    const sourceTask = tempSectionsList[sourceSectionIndex].tasks[sourceTaskIndex];
    tempSectionsList[sourceSectionIndex].tasks.splice(sourceTaskIndex, 1);
    tempSectionsList[targetSectionIndex].tasks.splice(
      targetTaskIndex,
      0,
      sourceTask,
    );
    setSections(tempSectionsList);

    setTargetTask({
      sectionId: 0,
      taskId: 0,
    });
  };

  const onDragEnter = (sectionId: number, taskId: number) => {
    if (targetTask.taskId === taskId) return;
    setTargetTask({
      sectionId: sectionId,
      taskId: taskId,
    });
  };

  useEffect(() => {
    updateLocalStorageSections(sections);
  }, [sections]);
  return (
    <Space className="app-sections-container" direction="vertical">
        <Row className="app-sections">
          {sections.map((item) => (
            <Section
              key={item.id}
              section={item}
              addTask={addTaskHandler}
              removeSection={() => removeSection(item.id)}
              removeTask={removeTask}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateTask={updateTask}
            />
          ))}
          <Col className="app-sections-last">
            <CustomInput
              displayClass="app-sections-add-section"
              editClass="app-sections-add-section-edit"
              placeholder="Enter Section Name"
              text="Add Section"
              buttonText="Add Section"
              onSubmit={addSectionHandler}
            />
          </Col>
        </Row>
    </Space>
  );
}

export default Project;
