import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/CustomHeader';
import Main from './components/Main';
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Sidebar/>
      </Sider>
      <Layout>
        <CustomHeader />
        <Main/>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;