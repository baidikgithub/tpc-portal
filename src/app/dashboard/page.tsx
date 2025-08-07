'use client'
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Statistic, Button, Table, Select, Input, Space, Progress, Alert, Dropdown, Menu } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  DownloadOutlined, 
  SearchOutlined, 
  FilterOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  FileTextOutlined,
  EyeOutlined,
  MoreOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import TopMenuBar from '@/components/TopMenuBar';

const { Search } = Input;
const { Option } = Select;

interface Student {
  key: string;
  name: string;
  rollNumber: string;
  department: string;
  cgpa: number;
  status: 'Registered' | 'Not Registered';
  mockTestTaken: boolean;
  mockTestScore?: number;
  resumeUploaded: boolean;
  registrationDate?: string;
}

interface Department {
  name: string;
  totalStudents: number;
  registeredStudents: number;
  percentageFilled: number;
}

const mockStudents: Student[] = [
  {
    key: '1',
    name: 'John Doe',
    rollNumber: '2021001',
    department: 'Computer Science',
    cgpa: 8.5,
    status: 'Registered',
    mockTestTaken: true,
    mockTestScore: 85,
    resumeUploaded: true,
    registrationDate: '2024-01-15'
  },
  {
    key: '2',
    name: 'Jane Smith',
    rollNumber: '2021002',
    department: 'Electrical Engineering',
    cgpa: 7.8,
    status: 'Not Registered',
    mockTestTaken: false,
    resumeUploaded: false
  },
  {
    key: '3',
    name: 'Mike Johnson',
    rollNumber: '2021003',
    department: 'Mechanical Engineering',
    cgpa: 9.2,
    status: 'Registered',
    mockTestTaken: true,
    mockTestScore: 92,
    resumeUploaded: true,
    registrationDate: '2024-01-10'
  },
  {
    key: '4',
    name: 'Sarah Wilson',
    rollNumber: '2021004',
    department: 'Computer Science',
    cgpa: 8.0,
    status: 'Registered',
    mockTestTaken: true,
    mockTestScore: 78,
    resumeUploaded: true,
    registrationDate: '2024-01-20'
  },
  {
    key: '5',
    name: 'David Brown',
    rollNumber: '2021005',
    department: 'Civil Engineering',
    cgpa: 7.5,
    status: 'Not Registered',
    mockTestTaken: false,
    resumeUploaded: false
  }
];

const departments: Department[] = [
  { name: 'Computer Science', totalStudents: 150, registeredStudents: 120, percentageFilled: 80 },
  { name: 'Electrical Engineering', totalStudents: 120, registeredStudents: 85, percentageFilled: 71 },
  { name: 'Mechanical Engineering', totalStudents: 100, registeredStudents: 95, percentageFilled: 95 },
  { name: 'Civil Engineering', totalStudents: 80, registeredStudents: 45, percentageFilled: 56 },
  { name: 'Chemical Engineering', totalStudents: 60, registeredStudents: 40, percentageFilled: 67 }
];

const DashboardPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [mockTestFilter, setMockTestFilter] = useState<string>('all');
  const [cgpaFilter, setCgpaFilter] = useState<string>('all');

  // Calculate statistics
  const totalStudents = students.length;
  const registeredStudents = students.filter(s => s.status === 'Registered').length;
  const notRegisteredStudents = totalStudents - registeredStudents;
  const totalDepartments = departments.length;
  const mockTestTakenStudents = students.filter(s => s.mockTestTaken).length;
  const averageMockTestScore = students
    .filter(s => s.mockTestScore)
    .reduce((acc, s) => acc + (s.mockTestScore || 0), 0) / students.filter(s => s.mockTestScore).length;

  // Filter students
  useEffect(() => {
    let filtered = students;

    if (searchText) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(s => s.department === departmentFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    if (mockTestFilter !== 'all') {
      filtered = filtered.filter(s => 
        mockTestFilter === 'yes' ? s.mockTestTaken : !s.mockTestTaken
      );
    }

    if (cgpaFilter !== 'all') {
      const minCgpa = parseFloat(cgpaFilter);
      filtered = filtered.filter(s => s.cgpa >= minCgpa);
    }

    setFilteredStudents(filtered);
  }, [students, searchText, departmentFilter, statusFilter, mockTestFilter, cgpaFilter]);

  // Table columns
  const columns: ColumnsType<Student> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Student, b: Student) => a.name.localeCompare(b.name),
    },
    {
      title: 'Roll Number',
      dataIndex: 'rollNumber',
      key: 'rollNumber',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departments.map(dept => ({ text: dept.name, value: dept.name })),
      onFilter: (value, record: Student) => record.department === value,
    },
    {
      title: 'CGPA',
      dataIndex: 'cgpa',
      key: 'cgpa',
      sorter: (a: Student, b: Student) => a.cgpa - b.cgpa,
      render: (cgpa: number) => (
        <span style={{ color: cgpa >= 8.0 ? '#52c41a' : cgpa >= 7.0 ? '#faad14' : '#ff4d4f' }}>
          {cgpa}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ 
          color: status === 'Registered' ? '#52c41a' : '#ff4d4f',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Mock Test',
      dataIndex: 'mockTestTaken',
      key: 'mockTestTaken',
      render: (taken: boolean, record: Student) => (
        <span>
          {taken ? (
            <span style={{ color: '#52c41a' }}>
              Yes ({record.mockTestScore}%)
            </span>
          ) : (
            <span style={{ color: '#ff4d4f' }}>No</span>
          )}
        </span>
      ),
    },
    {
      title: 'Resume',
      dataIndex: 'resumeUploaded',
      key: 'resumeUploaded',
      render: (uploaded: boolean) => (
        <span style={{ color: uploaded ? '#52c41a' : '#ff4d4f' }}>
          {uploaded ? 'Uploaded' : 'Not Uploaded'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Student) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" icon={<EyeOutlined />}>
                View Details
              </Menu.Item>
              <Menu.Item key="download" icon={<DownloadOutlined />}>
                Download Resume
              </Menu.Item>
              <Menu.Item key="approve" icon={<FileTextOutlined />}>
                Approve CV
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleExport = () => {
    // Export logic here
    console.log('Exporting filtered data...');
  };

  const departmentColumns = [
    {
      title: 'Department',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Students',
      dataIndex: 'totalStudents',
      key: 'totalStudents',
      sorter: (a: Department, b: Department) => a.totalStudents - b.totalStudents,
    },
    {
      title: 'Registered',
      dataIndex: 'registeredStudents',
      key: 'registeredStudents',
    },
    {
      title: 'Not Registered',
      key: 'notRegistered',
      render: (record: Department) => record.totalStudents - record.registeredStudents,
    },
    {
      title: 'Percentage Filled',
      dataIndex: 'percentageFilled',
      key: 'percentageFilled',
      render: (percentage: number) => (
        <Progress 
          percent={percentage} 
          size="small" 
          status={percentage >= 80 ? 'success' : percentage >= 60 ? 'normal' : 'exception'}
        />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <TopMenuBar />
      <Content style={{ padding: '24px' }}>
        {/* Overall Statistics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Students"
                value={totalStudents}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Registered Students"
                value={registeredStudents}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Not Registered"
                value={notRegisteredStudents}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Departments"
                value={totalDepartments}
                prefix={<BookOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Mock Test Statistics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Mock Test Taken"
                value={mockTestTakenStudents}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#13c2c2' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Average Score"
                value={averageMockTestScore.toFixed(1)}
                suffix="%"
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                onClick={handleExport}
                style={{ width: '100%', height: '100%' }}
              >
                Export to Excel
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Alerts */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <Alert
              message="Low Registration Alert"
              description="Civil Engineering department has only 56% registration rate. Consider sending reminders."
              type="warning"
              showIcon
              style={{ marginBottom: '8px' }}
            />
            <Alert
              message="Resume Upload Reminder"
              description="5 students haven't uploaded their resumes yet."
              type="info"
              showIcon
            />
          </Col>
        </Row>

        {/* Department Summary */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <Card 
              title="Department-wise Summary" 
              extra={
                <Space>
                  <Button icon={<PieChartOutlined />}>Pie Chart</Button>
                  <Button icon={<BarChartOutlined />}>Bar Chart</Button>
                  <Button icon={<LineChartOutlined />}>Line Chart</Button>
                </Space>
              }
            >
              <Table
                dataSource={departments}
                columns={departmentColumns}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
        </Row>

        {/* Student Data Management */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card 
              title="Student Data Management"
              extra={
                <Space>
                  <Select
                    placeholder="Department"
                    style={{ width: 150 }}
                    value={departmentFilter}
                    onChange={setDepartmentFilter}
                  >
                    <Option value="all">All Departments</Option>
                    {departments.map(dept => (
                      <Option key={dept.name} value={dept.name}>{dept.name}</Option>
                    ))}
                  </Select>
                  <Select
                    placeholder="Status"
                    style={{ width: 120 }}
                    value={statusFilter}
                    onChange={setStatusFilter}
                  >
                    <Option value="all">All Status</Option>
                    <Option value="Registered">Registered</Option>
                    <Option value="Not Registered">Not Registered</Option>
                  </Select>
                  <Select
                    placeholder="Mock Test"
                    style={{ width: 120 }}
                    value={mockTestFilter}
                    onChange={setMockTestFilter}
                  >
                    <Option value="all">All</Option>
                    <Option value="yes">Taken</Option>
                    <Option value="no">Not Taken</Option>
                  </Select>
                  <Select
                    placeholder="CGPA"
                    style={{ width: 100 }}
                    value={cgpaFilter}
                    onChange={setCgpaFilter}
                  >
                    <Option value="all">All CGPA</Option>
                    <Option value="8.0">≥8.0</Option>
                    <Option value="7.5">≥7.5</Option>
                    <Option value="7.0">≥7.0</Option>
                  </Select>
                  <Search
                    placeholder="Search students..."
                    allowClear
                    style={{ width: 200 }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Space>
              }
            >
              <Table
                dataSource={filteredStudents}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} students`,
                }}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
