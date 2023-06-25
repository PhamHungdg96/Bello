import React, { useState } from 'react';
import {CalendarOutlined, HomeOutlined, QuestionCircleTwoTone,
  CheckCircleOutlined, MessageOutlined, UsergroupAddOutlined, ReconciliationOutlined,
  IdcardOutlined , TrophyOutlined} from '@ant-design/icons'
import type { MenuProps } from 'antd';
import {Menu } from 'antd';
import Logo from "../assets/ASAN.svg";
import '../styles/sidebar.css'
type MenuItem = Required<MenuProps>['items'][number];

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
  getItem('Projects', 'projects', <CalendarOutlined />, [
    getItem('Tom', '7'),
    getItem('Bill', '8'),
    getItem('Alex', '9'),
  ]),
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