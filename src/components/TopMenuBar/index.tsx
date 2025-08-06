import React from 'react';
import { Menu, Dropdown, Button, Row, Col, Space } from 'antd';
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  CopyOutlined,
  HighlightOutlined,
  UploadOutlined,
  DeleteOutlined,
  RightOutlined,
  SearchOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const studentsMenu = (
  <Menu>
    <Menu.Item key="rename" icon={<EditOutlined />}>
      Rename table
    </Menu.Item>
    <Menu.Item key="edit-desc" icon={<FileTextOutlined />}>
      Edit table description
    </Menu.Item>
    <Menu.Item key="duplicate" icon={<CopyOutlined />}>
      Duplicate table
    </Menu.Item>
    <Menu.Item key="find-duplicates" icon={<HighlightOutlined style={{ color: '#fadb14' }} />}>
      Find Duplicates <span role="img" aria-label="sparkle">✨</span>
    </Menu.Item>
    <Menu.SubMenu
      key="append-csv"
      icon={<UploadOutlined />}
      title={
        <span>
          Append data from CSV <RightOutlined style={{ fontSize: 10, marginLeft: 4 }} />
        </span>
      }
    >
      {/* Add submenu items here if needed */}
    </Menu.SubMenu>
    <Menu.Item key="delete" icon={<DeleteOutlined />} style={{ color: '#d4380d' }}>
      Delete table
    </Menu.Item>
  </Menu>
);

const TopMenuBar: React.FC = () => {
  return (
    <Row
      style={{
        background: '#5c246e',
        padding: '8px 12px',
        color: 'white',
        alignItems: 'center',
      }}
      justify="space-between"
    >
      <Col>
        <Space size="middle">
          <Dropdown overlay={studentsMenu} trigger={['click']} placement="bottomLeft">
            <Button
              type="text"
              style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '12px',
                padding: '4px 8px',
                background: 'transparent',
                border: 0,
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Students <DownOutlined style={{ fontSize: '10px', marginLeft: 4 }} />
            </Button>
          </Dropdown>
          <Button type="link" style={{ color: '#d9d9d9', fontWeight: 600, fontSize: '12px', padding: '4px 8px' }}>Companies</Button>
          <Button type="link" style={{ color: '#d9d9d9', fontWeight: 600, fontSize: '12px', padding: '4px 8px' }}>Guides</Button>
          <Button type="link" style={{ color: '#d9d9d9', fontWeight: 600, fontSize: '12px', padding: '4px 8px' }}>Status</Button>
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
