import React from 'react';
import { Menu, Dropdown, Button, Row, Col, Space } from 'antd';
import { DownOutlined, SearchOutlined, AppstoreOutlined } from '@ant-design/icons';

const menuItems = ['Students', 'Companies', 'Guides', 'Status'];

const TopMenuBar: React.FC = () => {
  return (
    <Row 
      style={{ 
        background: '#5c246e', 
        padding: '8px 12px', 
        color: 'white',
        alignItems: 'center'
      }}
      justify="space-between"
    >
      <Col>
        <Space size="middle">
          {menuItems.map((item, index) => (
            <Dropdown
              key={item}
              overlay={<Menu items={[{ label: `Option for ${item}`, key: '1' }]} />}
            >
              <Button 
                type="link" 
                style={{ 
                  color: index === 0 ? '#fff' : '#d9d9d9', 
                  fontWeight: 600,
                  fontSize: '12px',
                  padding: '4px 8px'
                }}
              >
                {item} <DownOutlined style={{ fontSize: '10px' }} />
              </Button>
            </Dropdown>
          ))}
        </Space>
      </Col>
      <Col>
        <Space size="middle">
          <Space size="small">
            <AppstoreOutlined style={{ fontSize: '10px' }} />
            <span style={{ fontSize: '12px', fontWeight: 600 }}>APPS</span>
          </Space>
          <SearchOutlined style={{ fontSize: '14px' }} />
        </Space>
      </Col>
    </Row>
  );
};

export default TopMenuBar;
