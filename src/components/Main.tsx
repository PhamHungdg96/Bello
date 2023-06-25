import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Card } from 'antd';
import Board from './Board';
const { Content } = Layout;
const tabList = [
  {
    key: 'Overview',
    tab: 'Overview',
  },
  {
    key: 'List',
    tab: 'List',
  },
  {
    key: 'Board',
    tab: 'Board',
  },
  {
    key: 'Timeline',
    tab: 'Timeline',
  },
  {
    key: 'Calendar',
    tab: 'Calendar',
  },
  {
    key: 'Workflow',
    tab: 'Workflow',
  },
];

const contentList: Record<string, React.ReactNode> = {
  Overview: <p>Overview</p>,
  List: <p>List</p>,
  Board: <Board/>,
  Timeline: <p>Timeline</p>,
  Calendar: <p>Calendar</p>,
  Workflow: <p>Workflow</p>,
};

const Main = () => {
    const [activeTabKey1, setActiveTabKey1] = useState<string>('Board');
  
    const onTab1Change = (key: string) => {
      setActiveTabKey1(key);
    };
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    return (
      
        <Content style={{ margin: '16px' }}>
             <Card
              style={{ width: '100%' }}
              tabList={tabList}
              activeTabKey={activeTabKey1}
              onTabChange={onTab1Change}
            >
              {contentList[activeTabKey1]}
            </Card>
        </Content>
    );
  };
  
  export default Main;