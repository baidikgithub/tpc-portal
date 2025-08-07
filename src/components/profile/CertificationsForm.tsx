import React from 'react';
import { Form, Input, Row, Col, Card, Button, Typography, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;

const CertificationsForm: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Certifications</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Form.List name="certifications">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                size="small"
                style={{ marginBottom: 16, border: '1px solid #f0f0f0' }}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                    size="small"
                  />
                }
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'certificateName']}
                      label="Certificate Name"
                      rules={[{ required: true, message: 'Please enter certificate name!' }]}
                    >
                      <Input 
                        prefix={<FileTextOutlined />}
                        placeholder="e.g., AWS Certified Developer"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'issuer']}
                      label="Issuer"
                      rules={[{ required: true, message: 'Please enter issuer name!' }]}
                    >
                      <Input 
                        placeholder="e.g., Amazon Web Services"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'date']}
                      label="Date Obtained"
                      rules={[{ required: true, message: 'Please select date!' }]}
                    >
                      <DatePicker 
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select date"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'credentialUrl']}
                      label="Credential URL (Optional)"
                    >
                      <Input 
                        placeholder="https://credential-url.com"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                size="large"
                style={{ marginTop: 8 }}
              >
                Add Certification
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default CertificationsForm; 