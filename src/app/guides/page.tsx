'use client';

import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RecordsLayout from '@/components/RecordsLayout';
import { Guide, ViewType } from '@/types/common';

// Mock data - replace with actual API call
const MOCK_GUIDES: Guide[] = [
  {
    id: '1',
    name: 'Dr. Smith',
    email: 'smith@university.edu',
    department: 'Computer Science',
    designation: 'Associate Professor',
    specialization: 'Machine Learning',
    status: 'active',
    assignedStudents: 8,
    createdAt: '2023-01-01',
    updatedAt: '2023-08-09'
  },
  // Add more mock data as needed
];

const GuideRecordsPage = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>('all');

  const columns: ColumnsType<Guide> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: Array.from(new Set(guides.map(g => g.department))).map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      filters: Array.from(new Set(guides.map(g => g.designation))).map(designation => ({
        text: designation,
        value: designation,
      })),
      onFilter: (value, record) => record.designation === value,
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Assigned Students',
      dataIndex: 'assignedStudents',
      key: 'assignedStudents',
      sorter: (a, b) => a.assignedStudents - b.assignedStudents,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleViewGuide(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEditGuide(record)}
          />
        </Space>
      ),
    },
  ];

  const availableViews: ViewType[] = ['all', 'byDepartment'];

  useEffect(() => {
    // Replace with actual API call
    setGuides(MOCK_GUIDES);
    setFilteredGuides(MOCK_GUIDES);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredGuides(
      guides.filter(guide =>
        guide.name.toLowerCase().includes(searchValue) ||
        guide.department.toLowerCase().includes(searchValue) ||
        guide.designation.toLowerCase().includes(searchValue) ||
        guide.specialization.toLowerCase().includes(searchValue) ||
        guide.email.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleViewGuide = (guide: Guide) => {
    // Implement view logic
    console.log('View guide:', guide);
  };

  const handleEditGuide = (guide: Guide) => {
    // Implement edit logic
    console.log('Edit guide:', guide);
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
      title="Guide Records"
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
        dataSource={filteredGuides}
        rowKey="id"
        size="middle"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} guides`
        }}
      />
    </RecordsLayout>
  );
};

export default GuideRecordsPage;
