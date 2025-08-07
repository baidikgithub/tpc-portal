import React, { useState } from 'react';
import { Form, Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FormComponentProps } from '@/types/profile';

interface ResumeUploadProps extends FormComponentProps {}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ form }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadProps: UploadProps = {
    name: 'file',
    fileList,
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        message.error('You can only upload PDF files!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }
      return false; // Prevent auto upload
    },
    onChange: (info) => {
      setFileList(info.fileList.slice(-1)); // Only keep the latest file
      if (info.file.status === 'removed') {
        form.setFieldsValue({ cv: undefined });
      } else {
        form.setFieldsValue({ cv: info.file });
      }
    },
    onRemove: () => {
      setFileList([]);
      form.setFieldsValue({ cv: undefined });
    },
    maxCount: 1,
    accept: '.pdf',
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 16, color: '#1890ff' }}>Resume Upload</h3>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            name="cv"
            label="Upload CV (PDF only)"
            rules={[
              { required: true, message: 'Please upload your CV!' },
              {
                validator: (_, value) => {
                  if (!value || !value.originFileObj) {
                    return Promise.reject(new Error('Please upload your CV!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload {...uploadProps}>
              <Button 
                icon={<UploadOutlined />} 
                size="large"
                style={{ width: '100%', height: '60px' }}
              >
                Click to Upload CV (PDF only, max 10MB)
              </Button>
            </Upload>
          </Form.Item>
          {fileList.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '8px 12px', 
                backgroundColor: '#f6f6f6', 
                borderRadius: '6px',
                border: '1px solid #d9d9d9'
              }}>
                <FileTextOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                <span style={{ flex: 1 }}>{fileList[0].name}</span>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setFileList([]);
                    form.setFieldsValue({ cv: undefined });
                  }}
                  danger
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ResumeUpload; 