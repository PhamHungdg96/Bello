import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    return (
      
        <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              Bill is a cat.
            </div>
        </Content>
    );
  };
  
  export default App;