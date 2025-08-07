import React from 'react';
import { Form, Input, Row, Col, Card, Button, Typography, Checkbox, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;
const { TextArea } = Input;

const VolunteeringForm: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Volunteering</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Form.List name="volunteering">
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
                      name={[name, 'organizationName']}
                      label="Organization Name"
                      rules={[{ required: true, message: 'Please enter organization name!' }]}
                    >
                      <Input 
                        prefix={<HeartOutlined />}
                        placeholder="Organization/Non-profit Name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'role']}
                      label="Role"
                      rules={[{ required: true, message: 'Please enter your role!' }]}
                    >
                      <Input 
                        placeholder="e.g., Volunteer Coordinator"
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
                      name={[name, 'currentlyVolunteering']}
                      valuePropName="checked"
                    >
                      <Checkbox>Currently Volunteering</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'endDate']}
                      label="End Date"
                      dependencies={[name, 'currentlyVolunteering']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const currentlyVolunteering = getFieldValue(['volunteering', name, 'currentlyVolunteering']);
                            if (!currentlyVolunteering && !value) {
                              return Promise.reject(new Error('Please select end date or check currently volunteering!'));
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
                        disabled={form.getFieldValue(['volunteering', name, 'currentlyVolunteering'])}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  label="Description"
                  rules={[{ required: true, message: 'Please enter volunteer description!' }]}
                >
                  <TextArea
                    placeholder="Describe your volunteer work, responsibilities, and impact..."
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
                Add Volunteering Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default VolunteeringForm; 