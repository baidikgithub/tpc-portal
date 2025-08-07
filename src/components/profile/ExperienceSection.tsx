import React from 'react';
import { Form, Input, Row, Col, Card, Button, Typography, Checkbox, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, BankOutlined } from '@ant-design/icons';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;
const { TextArea } = Input;

const ExperienceSection: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Work Experience</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Form.List name="experience">
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
                      name={[name, 'companyName']}
                      label="Company Name"
                      rules={[{ required: true, message: 'Please enter company name!' }]}
                    >
                      <Input 
                        prefix={<BankOutlined />}
                        placeholder="Company/Organization Name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'position']}
                      label="Position"
                      rules={[{ required: true, message: 'Please enter your position!' }]}
                    >
                      <Input 
                        placeholder="e.g., Software Engineer"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'startDate']}
                      label="Start Date"
                      rules={[{ required: true, message: 'Please select start date!' }]}
                    >
                      <DatePicker 
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select start date"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'currentlyWorking']}
                      valuePropName="checked"
                    >
                      <Checkbox>Currently Working</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="End Date"
                      dependencies={[name, 'currentlyWorking']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const currentlyWorking = getFieldValue(['experience', name, 'currentlyWorking']);
                            if (!currentlyWorking && !value) {
                              return Promise.reject(new Error('Please select end date or check currently working!'));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <DatePicker 
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select end date"
                        disabled={form.getFieldValue(['experience', name, 'currentlyWorking'])}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  label="Description"
                  rules={[{ required: true, message: 'Please enter job description!' }]}
                >
                  <TextArea
                    placeholder="Describe your responsibilities, achievements, and key contributions..."
                    rows={4}
                    showCount
                    maxLength={500}
                    style={{ resize: 'vertical' }}
                  />
                </Form.Item>
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
                Add Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default ExperienceSection; 