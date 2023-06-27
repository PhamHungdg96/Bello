import React,{useState} from "react";
import { Layout, theme, Row, Col, Typography, Button, Avatar, Tooltip, Input } from 'antd';
import {CalendarOutlined,PlusCircleTwoTone, StarOutlined, StarTwoTone, ClockCircleOutlined, TeamOutlined,UserOutlined,AntDesignOutlined  } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons';
import AvatarMenu from './AvatarMenu'

import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const { Search } = Input;
const { Title } = Typography;
const { Header} = Layout;
const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];
const App: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const [isFavourite, setIsFavourite] = useState(false);
  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  }
  const handleButtonClick = () => {
    // Handle button click event here
    console.log('Button clicked!');
  };
  const onSearch = (value: string) => {
    console.log(value);
  };
  const currentUser = {
    username : 'admin',
    password : 'admin'
  }
  return (
    <div>
      <Header style={{ padding: 0, background: '#ffffff' }} >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <Row justify="start">
                <Space align="center">
                  <CalendarOutlined style={{ marginLeft: '15px', marginRight: '15px', fontSize: '20px', color: 'blue' }} />
                </Space>
                <Space align="center" style={{marginBottom: '15px'}}>
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Title level={4}>Project Name <DownOutlined style={{ marginLeft: '5px', fontSize: '15px' }} /></Title>
                      </Space>
                    </a>
                  </Dropdown>
                </Space>
                <Space align="center">
                  {isFavourite ? <StarOutlined onClick={handleFavourite} style={{ marginLeft: '15px', fontSize: '20px', color: '#ffc53d' }} />
                    : <StarTwoTone onClick={handleFavourite} style={{ marginLeft: '15px', fontSize: '20px', color: "yellow" }} />}
                </Space>
                <Space align="center">
                  <ClockCircleOutlined style={{ color: '#000', fontSize: '20px', marginLeft: '15px' }}></ClockCircleOutlined>
                </Space>
                <Space align="center">
                  <p style={{marginLeft: '10px'}}>Set status</p>
                </Space>
              
             
            </Row>
          </Col>
          <Col className="gutter-row" span={6}></Col>
          <Col className="gutter-row" span={12}>
            <Row>
              <Col span={6}>
                <Space>
                  <Avatar.Group
                    maxCount={4}
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                    }}
                    style={{ marginLeft: '20px' , marginTop: '15px'}}
                  >
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                    <Avatar
                      style={{
                        backgroundColor: '#f56a00',
                      }}
                    >
                      K
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{
                        backgroundColor: '#1677ff',
                      }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                </Space>
              </Col>
              <Col span={3}>
                <Space>
                  <Button type="primary" onClick={handleButtonClick}>
                    <TeamOutlined style={{ marginRight: '4px' }} />
                    Share
                  </Button>
                </Space>
              </Col>
              <Col span={9}>
                <Space>
                  <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ marginLeft: '20px' , marginTop: '15px'}}/>
                </Space>
              </Col>
              <Col span={3}>
                <Space>
                  <PlusCircleTwoTone style={{ marginLeft: '15px', fontSize: '30px', marginTop: '15px' }} />
                </Space>
              </Col>
              <Col span={3}>
                <Space>
                  <AvatarMenu user={currentUser} />
                </Space>
              </Col>
            </Row>

          </Col>
        </Row>

      </Header>
      {/* Other components */}
      
    </div>
  );
};

export default App;
