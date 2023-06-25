import React from "react";
import { Layout, theme } from 'antd';
const { Header} = Layout;
const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >


      </Header>
      {/* Other components */}
      
    </div>
  );
};

export default App;
