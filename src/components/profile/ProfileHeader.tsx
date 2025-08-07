import React, { useState } from 'react';
import { Avatar, Upload, Typography, Space, Card } from 'antd';
import { UserOutlined, CameraOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ProfileHeaderProps } from '@/types/profile';

const { Title, Text } = Typography;

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ form, avatar, firstName, lastName, role }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadProps: UploadProps = {
    name: 'avatar',
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        return false;
      }
      return false; // Prevent auto upload
    },
    onChange: (info) => {
      setFileList(info.fileList.slice(-1));
      if (info.file.status === 'removed') {
        form.setFieldsValue({ avatar: undefined });
      } else {
        form.setFieldsValue({ avatar: info.file });
      }
    },
    maxCount: 1,
    accept: 'image/*',
  };

  return (
    <Card 
      style={{ 
        height: 'fit-content',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'sticky',
        top: 24
      }}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        {/* Avatar Section */}
        <div style={{ marginBottom: 24 }}>
          <Upload {...uploadProps} showUploadList={false}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                size={120}
                src={fileList[0]?.thumbUrl || avatar}
                icon={<UserOutlined />}
                style={{ 
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: '#1890ff',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px solid white'
                }}
              >
                <CameraOutlined style={{ color: 'white', fontSize: 14 }} />
              </div>
            </div>
          </Upload>
        </div>
        
        {/* Name and Role */}
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ color: 'white', marginBottom: 8 }}>
            {firstName && lastName ? `${firstName} ${lastName}` : 'Your Name'}
          </Title>
          {role && (
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, display: 'block' }}>
              {role}
            </Text>
          )}
        </div>
        
        {/* Contact Info */}
        <div style={{ textAlign: 'left' }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.9)' }}>
              <MailOutlined style={{ marginRight: 8 }} />
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                {form.getFieldValue(['personalInfo', 'email']) || 'email@example.com'}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.9)' }}>
              <PhoneOutlined style={{ marginRight: 8 }} />
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                {form.getFieldValue(['personalInfo', 'phoneNumber']) || '+1 234 567 8900'}
              </Text>
            </div>
            {form.getFieldValue(['personalInfo', 'portfolioUrl']) && (
              <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.9)' }}>
                <GlobalOutlined style={{ marginRight: 8 }} />
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                  Portfolio
                </Text>
              </div>
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader; 