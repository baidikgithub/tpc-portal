'use client';

import React from 'react';
import {
  Typography,
  Space,
  Divider,
  Avatar,
  Upload,
  Button,
  Tooltip,
  Dropdown,
  Menu,
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  IdcardOutlined,
  CalendarOutlined,
  UserOutlined,
  SolutionOutlined,
  UploadOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface LeftSidebarProps {
  name: string;
  employeeID: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  dob: string;
  nationalID: string;
  title: string;
  hireDate: string;
  avatarUrl?: string;
  onAvatarUpload?: (file: File) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  name,
  employeeID,
  phone,
  email,
  address,
  city,
  postcode,
  dob,
  nationalID,
  title,
  hireDate,
  avatarUrl,
}) => {
  // Dropdown menu items for three-dot menu
  const menu = (
    <Menu
      items={[
        { key: 'edit', label: 'Edit Profile' },
        { key: 'changePhoto', label: 'Change Photo' },
        { key: 'settings', label: 'Settings' },
      ]}
    />
  );

  return (
    <div
      style={{
        position: 'relative',
        flex: '0 0 300px',
        // background: '#fff',
        // borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        padding: '32px 24px',
        top: 2,
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Top-right three-dot edit button */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
          <Tooltip title="More options">
            <Button
              shape="circle"
              icon={<EllipsisOutlined />}
              size="small"
              type="text"
              aria-label="More options"
            />
          </Tooltip>
        </Dropdown>
      </div>

      {/* Avatar Upload */}
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          const isImage = file.type.startsWith('image/');
          if (!isImage) {
            alert('You can only upload image files!');
          }
          return isImage || Upload.LIST_IGNORE;
        }}
        accept="image/*"
      >
        <Tooltip title="Click to upload profile photo">
          <Avatar
            size={110}
            src={avatarUrl || undefined}
            icon={!avatarUrl && <UserOutlined />}
            style={{
              cursor: 'pointer',
              marginBottom: 8,
              boxShadow: '0 0 6px rgba(0,0,0,0.15)',
            }}
          />
        </Tooltip>
        <Button
          icon={<UploadOutlined />}
          size="small"
          style={{ marginTop: 8, borderRadius: 6 }}
          block
        >
          Upload Photo
        </Button>
      </Upload>

      {/* Name + Employee ID */}
      <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
        {name}
      </Title>
      <Text type="secondary">{employeeID}</Text>

      {/* ABOUT SECTION */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: 15 }}>About</Text>
        <Space>
          <PhoneOutlined style={{ color: '#1890ff' }} />
          <Text>{phone || 'N/A'}</Text>
        </Space>
        <Space>
          <MailOutlined style={{ color: '#1890ff' }} />
          <Text>{email || 'N/A'}</Text>
        </Space>
      </Space>

      {/* ADDRESS SECTION */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: 15 }}>Address</Text>
        <Space>
          <HomeOutlined style={{ color: '#722ed1' }} />
          <Text>{address || 'N/A'}</Text>
        </Space>
        <Space>
          <EnvironmentOutlined style={{ color: '#52c41a' }} />
          <Text>{city || 'N/A'}</Text>
        </Space>
        <Space>
          <SolutionOutlined style={{ color: '#eb2f96' }} />
          <Text>{postcode || 'N/A'}</Text>
        </Space>
      </Space>

      {/* EMPLOYEE DETAILS SECTION */}

      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: 15 }}>Student Details</Text>
        <Space>
          <CalendarOutlined style={{ color: '#fa8c16' }} />
          <Text>Date of birth: {dob || 'N/A'}</Text>
        </Space>
        <Space>
          <IdcardOutlined style={{ color: '#13c2c2' }} />
          <Text>National ID: {nationalID || 'N/A'}</Text>
        </Space>
        <Space>
          <UserOutlined style={{ color: '#2f54eb' }} />
          <Text>Title: {title || 'N/A'}</Text>
        </Space>
        <Space>
          <CalendarOutlined style={{ color: '#faad14' }} />
          <Text>Hire date: {hireDate || 'N/A'}</Text>
        </Space>
      </Space>
    </div>
  );
};

export default LeftSidebar;
