import React from 'react';
import { Form, Input, Row, Col, Card, Button, Typography, Checkbox, DatePicker, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;
const { TextArea } = Input;

const EducationSection: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Education</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Form.List name="education">
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
                      name={[name, 'instituteName']}
                      label="Institute Name"
                      rules={[{ required: true, message: 'Please enter institute name!' }]}
                    >
                      <Input 
                        prefix={<BookOutlined />}
                        placeholder="University/College Name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'degree']}
                      label="Degree"
                      rules={[{ required: true, message: 'Please enter your degree!' }]}
                    >
                      <Input 
                        placeholder="e.g., Bachelor of Science"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'fieldOfStudy']}
                      label="Field of Study"
                      rules={[{ required: true, message: 'Please enter your field of study!' }]}
                    >
                      <Input 
                        placeholder="e.g., Computer Science"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'startYear']}
                      label="Start Year"
                      rules={[{ required: true, message: 'Please select start year!' }]}
                    >
                      <DatePicker 
                        picker="year"
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select start year"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'currentlyStudying']}
                      valuePropName="checked"
                    >
                      <Checkbox>Currently Studying</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'endYear']}
                      label="End Year"
                      dependencies={[name, 'currentlyStudying']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const currentlyStudying = getFieldValue(['education', name, 'currentlyStudying']);
                            if (!currentlyStudying && !value) {
                              return Promise.reject(new Error('Please select end year or check currently studying!'));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <DatePicker 
                        picker="year"
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Select end year"
                        disabled={form.getFieldValue(['education', name, 'currentlyStudying'])}
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
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default EducationSection; 