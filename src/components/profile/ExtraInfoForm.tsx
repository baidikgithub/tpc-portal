import React from 'react';
import { Form, Input, Card, Typography } from 'antd';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;
const { TextArea } = Input;

const ExtraInfoForm: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Additional Information</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Form.Item
        name="extraInfo"
        label="Additional Comments"
      >
        <TextArea
          placeholder="Any additional information, achievements, or declarations you'd like to share..."
          rows={4}
          showCount
          maxLength={500}
          style={{ resize: 'vertical' }}
        />
      </Form.Item>
    </Card>
  );
};

export default ExtraInfoForm; 