'use client';

import { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import RecordsLayout from '@/components/RecordsLayout';
import { Company, ViewType } from '@/types/common';

// Mock data - replace with actual API call
const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Tech Corp',
    industry: 'Information Technology',
    location: 'Bangalore',
    contactPerson: 'Jane Smith',
    email: 'jane@techcorp.com',
    phone: '+91 9876543210',
    status: 'active',
    totalPlacements: 15,
    createdAt: '2023-01-01',
    updatedAt: '2023-08-09'
  },
  // Add more mock data as needed
];

const CompanyRecordsPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<ViewType>('all');

  const columns: ColumnsType<Company> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      filters: Array.from(new Set(companies.map(c => c.industry))).map(industry => ({
        text: industry,
        value: industry,
      })),
      onFilter: (value, record) => record.industry === value,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      filters: Array.from(new Set(companies.map(c => c.location))).map(location => ({
        text: location,
        value: location,
      })),
      onFilter: (value, record) => record.location === value,
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
      title: 'Total Placements',
      dataIndex: 'totalPlacements',
      key: 'totalPlacements',
      sorter: (a, b) => a.totalPlacements - b.totalPlacements,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleViewCompany(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEditCompany(record)}
          />
        </Space>
      ),
    },
  ];

  const availableViews: ViewType[] = ['all', 'byIndustry', 'byLocation'];

  useEffect(() => {
    // Replace with actual API call
    setCompanies(MOCK_COMPANIES);
    setFilteredCompanies(MOCK_COMPANIES);
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setFilteredCompanies(
      companies.filter(company =>
        company.name.toLowerCase().includes(searchValue) ||
        company.industry.toLowerCase().includes(searchValue) ||
        company.location.toLowerCase().includes(searchValue) ||
        company.contactPerson.toLowerCase().includes(searchValue) ||
        company.email.toLowerCase().includes(searchValue) ||
        company.phone.includes(searchValue)
      )
    );
  };

  const handleViewCompany = (company: Company) => {
    // Implement view logic
    console.log('View company:', company);
  };

  const handleEditCompany = (company: Company) => {
    // Implement edit logic
    console.log('Edit company:', company);
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
      title="Company Records"
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
        dataSource={filteredCompanies}
        rowKey="id"
        size="middle"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} companies`
        }}
      />
    </RecordsLayout>
  );
};

export default CompanyRecordsPage;
