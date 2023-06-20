import { useState } from 'react';
import { Avatar, Badge, Dropdown, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

const AvatarMenu = ({ user }) => {
  // const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
    >
       <Space size={24}>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"
          />
      </Space>
      
    </Dropdown>
  );
};

export default AvatarMenu;
