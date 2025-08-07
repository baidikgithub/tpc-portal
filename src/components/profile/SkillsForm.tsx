import React from 'react';
import { Form, Select, Card, Typography } from 'antd';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;

const SkillsForm: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Skills</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Form.Item
        name="skills"
        label="Technical Skills"
        rules={[{ required: true, message: 'Please add at least one skill!' }]}
      >
        <Select
          mode="tags"
          placeholder="Add your skills (e.g., JavaScript, React, Python)"
          size="large"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Card>
  );
};

export default SkillsForm; 