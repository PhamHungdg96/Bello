import React, { useState } from 'react';
import {CalendarOutlined, HomeOutlined, QuestionCircleTwoTone,
  CheckCircleOutlined, MessageOutlined, UsergroupAddOutlined, ReconciliationOutlined,
  IdcardOutlined , TrophyOutlined} from '@ant-design/icons'
import type { MenuProps } from 'antd';
import {Menu } from 'antd';
import Logo from "../assets/ASAN.svg";
import { IProject } from '../Interfaces/Bello';
import '../styles/sidebar.css'

type MenuItem = Required<MenuProps>['items'][number];
const dummyProjects: IProject[] = [
  {
    id: 1,
    name: "Project 1",
    createdBy: "User A",
    sectionId: 1,
    // createdAt: new Date("2023-06-10T12:00:00Z"),
    // updatedAt: new Date("2023-06-10T14:30:00Z"),
  },
  {
    id: 2,
    name: "Project 2",
    createdBy: "User B",
    sectionId: 2,
    // createdAt: new Date("2023-06-11T09:30:00Z"),
    // updatedAt: new Date("2023-06-11T11:45:00Z"),
  },
];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,

  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('My Tasks', '2', <CheckCircleOutlined />),
  getItem('Inbox', '3', <MessageOutlined />),
  getItem('Report', '4', <ReconciliationOutlined />),
  getItem('Portfolios', '5', <IdcardOutlined />),
  getItem('Goals', '6', <TrophyOutlined />),
  getItem('Projects', 'projects', <CalendarOutlined />, 
      dummyProjects.map((project) =>
      getItem(project.name, (project.id + 6).toString())
  )),

  getItem('Invite teammates', '10', <UsergroupAddOutlined />),
  getItem('Help & Getting Started', '11', <QuestionCircleTwoTone />),
];

const Sidebar = () => {
  return (
      <div>
        <div className="logo">
          <div >
            <img src={Logo} alt=" Logo " className="logo-img"/>
          </div>
          <h3 className="logo-text">
            Bello
          </h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </div>
  );
};

export default Sidebar;