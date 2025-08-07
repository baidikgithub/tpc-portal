'use client';

import React from 'react';
import { Form, message, Typography, Row, Col, Button, Space } from 'antd';
import { SendOutlined, SaveOutlined } from '@ant-design/icons';
import { StudentProfileFormData } from '@/types/profile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import EducationSection from '@/components/profile/EducationSection';
import ExperienceSection from '@/components/profile/ExperienceSection';
import SkillsForm from '@/components/profile/SkillsForm';
import CertificationsForm from '@/components/profile/CertificationsForm';
import VolunteeringForm from '@/components/profile/VolunteeringForm';
import ExtraInfoForm from '@/components/profile/ExtraInfoForm';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm<StudentProfileFormData>();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: StudentProfileFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Profile submitted with values:', JSON.stringify(values, null, 2));
      message.success('Profile submitted successfully! 🎉');
      
      // You can add actual API call here
      // const response = await fetch('/api/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      
    } catch (error) {
      console.error('Error submitting profile:', error);
      message.error('Failed to submit profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
    message.error('Please check the form and try again.');
  };

  const handleSaveDraft = () => {
    const values = form.getFieldsValue();
    console.log('Draft saved:', JSON.stringify(values, null, 2));
    message.success('Draft saved successfully!');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '24px', 
      backgroundColor: '#f5f5f5',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Fixed Submit Button */}
      <div style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 1000,
        background: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid #d9d9d9'
      }}>
        <Space>
          <Button 
            onClick={handleSaveDraft}
            icon={<SaveOutlined />}
            size="middle"
          >
            Save Draft
          </Button>
          <Button 
            type="primary" 
            onClick={() => form.submit()}
            loading={loading}
            icon={<SendOutlined />}
            size="middle"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Space>
      </div>

      {/* Main Layout */}
      <Row gutter={24}>
        {/* Left Sidebar - Profile Header */}
        <Col xs={24} lg={6}>
          <ProfileHeader 
            form={form}
            firstName={form.getFieldValue(['personalInfo', 'firstName'])}
            lastName={form.getFieldValue(['personalInfo', 'lastName'])}
            role="Student"
          />
        </Col>

        {/* Right Side - Form Components */}
        <Col xs={24} lg={18}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
            style={{ maxWidth: '100%' }}
            initialValues={{
              education: [{}],
              experience: [{}],
              certifications: [{}],
              volunteering: [{}],
              skills: []
            }}
          >
            {/* Personal Information */}
            <PersonalInfoForm form={form} />
            
            {/* Education Section */}
            <EducationSection form={form} />
            
            {/* Experience Section */}
            <ExperienceSection form={form} />
            
            {/* Skills */}
            <SkillsForm form={form} />
            
            {/* Certifications */}
            <CertificationsForm form={form} />
            
            {/* Volunteering */}
            <VolunteeringForm form={form} />
            
            {/* Extra Information */}
            <ExtraInfoForm form={form} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
