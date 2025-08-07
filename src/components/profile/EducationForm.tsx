import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import { BookOutlined, TrophyOutlined, FileTextOutlined, ExperimentOutlined } from '@ant-design/icons';
import { FormComponentProps } from '@/types/profile';

interface EducationFormProps extends FormComponentProps {}

const { TextArea } = Input;

const EducationForm: React.FC<EducationFormProps> = ({ form }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 16, color: '#1890ff' }}>Education & Experience</h3>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="experience"
            label="Experience"
            rules={[
              { required: true, message: 'Please enter your experience!' },
              { min: 10, message: 'Experience must be at least 10 characters!' }
            ]}
          >
            <TextArea
              prefix={<ExperimentOutlined />}
              placeholder="Describe your work experience, internships, or relevant activities..."
              rows={4}
              showCount
              maxLength={500}
              style={{ resize: 'vertical' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="education"
            label="Education"
            rules={[
              { required: true, message: 'Please enter your education details!' },
              { min: 10, message: 'Education must be at least 10 characters!' }
            ]}
          >
            <TextArea
              prefix={<BookOutlined />}
              placeholder="List your educational background, degrees, institutions..."
              rows={4}
              showCount
              maxLength={500}
              style={{ resize: 'vertical' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="accomplishments"
            label="Accomplishments"
            rules={[
              { required: true, message: 'Please enter your accomplishments!' },
              { min: 10, message: 'Accomplishments must be at least 10 characters!' }
            ]}
          >
            <TextArea
              prefix={<TrophyOutlined />}
              placeholder="List your achievements, awards, honors, or notable projects..."
              rows={4}
              showCount
              maxLength={500}
              style={{ resize: 'vertical' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="certifications"
            label="Certifications"
            rules={[
              { required: true, message: 'Please enter your certifications!' },
              { min: 10, message: 'Certifications must be at least 10 characters!' }
            ]}
          >
            <TextArea
              prefix={<FileTextOutlined />}
              placeholder="List your certifications, licenses, or professional qualifications..."
              rows={4}
              showCount
              maxLength={500}
              style={{ resize: 'vertical' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default EducationForm; 