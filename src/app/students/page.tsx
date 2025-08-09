'use client';

import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RecordsLayout from '@/components/RecordsLayout';
import { Student, ViewType } from '@/types/common';

// Mock data - replace with actual API call
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Computer Science',
    batch: '2023-24',
    rollNumber: 'CS001',
    company: 'Tech Corp',
    guide: 'Dr. Smith',
    status: 'placed',
    profileCompleted: true,
    createdAt: '2023-08-01',
    updatedAt: '2023-08-09'
  },
  // Add more mock data as needed
];

const StudentRecordsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>('all');

  const columns: ColumnsType<Student> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      filters: Array.from(new Set(students.map(s => s.department))).map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
      filters: Array.from(new Set(students.map(s => s.batch))).map(batch => ({
        text: batch,
        value: batch,
      })),
      onFilter: (value, record) => record.batch === value,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company) => company || '-',
    },
    {
      title: 'Guide',
      dataIndex: 'guide',
      key: 'guide',
      render: (guide) => guide || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'placed' ? 'success' :
          status === 'inProgress' ? 'processing' :
          'default'
        }>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Profile',
      dataIndex: 'profileCompleted',
      key: 'profileCompleted',
      render: (completed) => (
        <Tag color={completed ? 'success' : 'warning'}>
          {completed ? 'Completed' : 'Incomplete'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleViewStudent(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEditStudent(record)}
          />
        </Space>
      ),
    },
  ];

  const availableViews: ViewType[] = ['all', 'byCompany', 'byGuide', 'byBatch', 'byDepartment'];

  useEffect(() => {
    // Replace with actual API call
    setStudents(MOCK_STUDENTS);
    setFilteredStudents(MOCK_STUDENTS);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredStudents(
      students.filter(student =>
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.rollNumber.toLowerCase().includes(searchValue) ||
        (student.company && student.company.toLowerCase().includes(searchValue)) ||
        (student.guide && student.guide.toLowerCase().includes(searchValue))
      )
    );
  };

  const handleViewStudent = (student: Student) => {
    // Implement view logic
    console.log('View student:', student);
  };

  const handleEditStudent = (student: Student) => {
    // Implement edit logic
    console.log('Edit student:', student);
  };

  const handleHideColumnsToggle = () => {
    setHideColumnsModalVisible(!hideColumnsModalVisible);
  };

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const filteredColumns = columns
    .filter(col => !selectedColumns.includes(col.key as string))
    .map(col => col.title as string);

  return (
    <RecordsLayout
      title="Student Records"
      hideColumnsModalVisible={hideColumnsModalVisible}
      searchText={searchText}
      selectedColumns={selectedColumns}
      filteredColumns={filteredColumns}
      selectedView={selectedView}
      availableViews={availableViews}
      onViewChange={setSelectedView}
      onHideColumnsToggle={handleHideColumnsToggle}
      onSearchTextChange={(value) => {
        setSearchText(value);
        handleSearch(value);
      }}
      onHideAll={() => setSelectedColumns(columns.map(col => col.key as string))}
      onShowAll={() => setSelectedColumns([])}
      onColumnToggle={handleColumnToggle}
    >
      <Table 
        columns={columns.filter(col => !selectedColumns.includes(col.key as string))}
        dataSource={filteredStudents}
        rowKey="id"
        size="middle"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} students`
        }}
      />
    </RecordsLayout>
  );
};

export default StudentRecordsPage;
