import React from 'react';
import { Button, Space, Card, Typography } from 'antd';
import { SaveOutlined, SendOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface SubmitButtonProps {
  onSaveDraft: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSaveDraft, onSubmit, loading }) => {
  return (
    <Card 
      style={{ 
        marginTop: 24, 
        borderRadius: 8,
        background: '#fafafa',
        border: '1px solid #d9d9d9'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ marginBottom: 16 }}>
          Ready to Submit Your Profile?
        </Title>
        <Space size="large">
          <Button 
            onClick={onSaveDraft}
            icon={<SaveOutlined />}
            size="large"
            style={{ 
              minWidth: '140px',
              height: '48px',
              fontSize: '16px'
            }}
          >
            Save Draft
          </Button>
          <Button 
            type="primary" 
            onClick={onSubmit}
            loading={loading}
            icon={<SendOutlined />}
            size="large"
            style={{ 
              minWidth: '140px',
              height: '48px',
              fontSize: '16px'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Profile'}
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default SubmitButton; 