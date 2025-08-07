import React from 'react';
import { Form, Input, Row, Col, Card, Typography } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, GlobalOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { FormComponentProps } from '@/types/profile';

const { Title } = Typography;
const { TextArea } = Input;

const PersonalInfoForm: React.FC<FormComponentProps> = ({ form }) => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Personal Information</Title>}
      style={{ marginBottom: 24, borderRadius: 8 }}
      headStyle={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name={['personalInfo', 'firstName']}
            label="First Name"
            rules={[
              { required: true, message: 'Please enter your first name!' },
              { min: 2, message: 'First name must be at least 2 characters!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your first name"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name={['personalInfo', 'lastName']}
            label="Last Name"
            rules={[
              { required: true, message: 'Please enter your last name!' },
              { min: 2, message: 'Last name must be at least 2 characters!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your last name"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name={['personalInfo', 'email']}
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email address"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name={['personalInfo', 'phoneNumber']}
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your phone number!' },
              { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number!' },
              { min: 10, message: 'Phone number must be at least 10 digits!' }
            ]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Enter your phone number"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            name={['personalInfo', 'portfolioUrl']}
            label="Portfolio Website"
            rules={[
              { type: 'url', message: 'Please enter a valid URL!' }
            ]}
          >
            <Input 
              prefix={<GlobalOutlined />} 
              placeholder="https://your-portfolio.com"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name={['personalInfo', 'githubUrl']}
            label="GitHub Profile"
            rules={[
              { type: 'url', message: 'Please enter a valid GitHub URL!' }
            ]}
          >
            <Input 
              prefix={<GithubOutlined />} 
              placeholder="https://github.com/username"
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name={['personalInfo', 'linkedinUrl']}
            label="LinkedIn Profile"
            rules={[
              { type: 'url', message: 'Please enter a valid LinkedIn URL!' }
            ]}
          >
            <Input 
              prefix={<LinkedinOutlined />} 
              placeholder="https://linkedin.com/in/username"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={['personalInfo', 'bio']}
        label="Short Bio"
        rules={[
          { required: true, message: 'Please enter your bio!' },
          { min: 20, message: 'Bio must be at least 20 characters!' }
        ]}
      >
        <TextArea
          placeholder="Tell us about yourself, your interests, and what you're passionate about..."
          rows={4}
          showCount
          maxLength={300}
          style={{ resize: 'vertical' }}
        />
      </Form.Item>
    </Card>
  );
};

export default PersonalInfoForm; 