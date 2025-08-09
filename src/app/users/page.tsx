'use client';

import { Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

// Import reusable components
import { HeaderSwitch } from '@/components/HeaderSwitch';
import { IconButtonDropdown } from '@/components/IconButtonDropdown';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { SearchFilter } from '@/components/SearchFilter';
import { DataTable } from '@/components/DataTable';
import type { ColumnsType } from 'antd/es/table';

export interface Customer {
  key: string;
  name: string;
  phone: string;
  address: string;
  tag: string;
  email?: string;
}

const columns: ColumnsType<Customer> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Tag', dataIndex: 'tag', key: 'tag' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
];

const DUMMY_USERS: Customer[] = [
  { key: '1', name: 'John Doe', phone: '1234567890', address: '123 Main St, Mumbai', tag: 'Premium', email: 'john@gmail.com' },
  { key: '2', name: 'Jane Smith', phone: '9876543210', address: '456 Park Ave, Delhi', tag: 'Standard', email: 'jane@gmail.com' },
  { key: '3', name: 'Alice Johnson', phone: '5554443333', address: '789 Church Rd, Bangalore', tag: 'Trial', email: 'alice@hotmail.com' },
];

export default function UsersDataPage() {
  const [isGraphical, setIsGraphical] = useState(true);
  const [users, setUsers] = useState<Customer[]>([]);
  const [filteredData, setFilteredData] = useState<Customer[]>([]);

  useEffect(() => {
    setUsers(DUMMY_USERS);
    setFilteredData(DUMMY_USERS);
  }, []);

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    setFilteredData(
      users.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.phone.includes(value) ||
          item.address.toLowerCase().includes(lower) ||
          item.tag.toLowerCase().includes(lower) ||
          (item.email && item.email.toLowerCase().includes(lower))
      )
    );
  };

  return (
    <main className="p-4">
      <Row align="middle" justify="space-between" gutter={[16, 16]} className="mb-3">
        <Col>
          <HeaderSwitch
            title="Users"
            leftLabel="Graphical"
            rightLabel="Classical"
            checked={isGraphical}
            onChange={setIsGraphical}
          />
        </Col>
        <Col>
          <IconButtonDropdown
            buttonName="Download"
            icon={<DownloadOutlined />}
            dropdownOptions={[
              { key: '1', label: 'Download as CSV' },
              { key: '2', label: 'Export to Excel' },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-3">
        <Col xs={24} sm={24} md={12} lg={8}>
          <DateRangeFilter onChange={() => {}} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <SearchFilter
            placeholder="Name / Mobile / Address / Tag / Email"
            style={{ width: '100%' }}
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      <div className="bg-white rounded-lg shadow-sm">
        <DataTable 
          data={filteredData} 
          columns={columns} 
          rowKey="key"
          size="middle"
        />
      </div>
    </main>
  );
}
