'use client';

import { Row, Col, Divider } from 'antd';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';

export default function UsersDataPage() {
  return (
    <main className="p-4">
      <Row gutter={16}>
        <Col xs={24} md={8} lg={6}>
          <LeftSidebar
            name="Nicholas Swatz"
            employeeID="202422006"
            phone="(629) 555-0123"
            email="nicholasswatz@gmail.com"
            address="390 Market Street, Suite 200"
            city="San Francisco CA"
            postcode="94102"
            dob="Sep 26, 1988"
            nationalID="GER10654"
            title="Project Manager"
            hireDate="Jan 05, 2023"
            avatarUrl="https://i.pravatar.cc/150"
          />
        </Col>

        <Col xs={24} md={16} lg={18}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <RightSidebar
              title="Experience"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' }
              ]}
            />
            <RightSidebar
              title="Education"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' }
              ]}
            />
            <RightSidebar
              title="Skills"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' }
              ]}
            />
            <RightSidebar
              title="Projects"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' }
              ]}
            />
            <RightSidebar
              title="Certifications"
              fields={[
                { name: 'role', label: 'Role / Job Title', type: 'text', rules: [{ required: true }] },
                { name: 'company', label: 'Company', type: 'text', rules: [{ required: true }] },
                { name: 'startDate', label: 'Start Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'endDate', label: 'End Date', type: 'date', picker: 'month', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' }
              ]}
            />
          </div>
        </Col>

      </Row>
    </main>
  );
}
