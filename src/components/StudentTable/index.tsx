import React from 'react';
import { Table, Checkbox, Space, Typography, Dropdown, Menu } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  DownOutlined, 
  LockOutlined, 
  CalendarOutlined,
  TableOutlined,
  LinkOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
// import StudentTag from '../StudentTag';
import StudentDate from '../StudentDate';
import WeekCount from '../WeekCount';

interface Student {
  key: string;
  name: string;
  company: string;
  guide: string;
  jobDomain: string;
  startingDate: string;
  endingDate: string;
  week: number;
}

interface StudentTableProps {
  studentsData: Student[];
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

const companyMenu = (
  <Menu>
    <Menu.Item key="copy-url" icon={<LinkOutlined />}>
      Copy Column URL
    </Menu.Item>
    <Menu.Item key="add-filter" icon={<FilterOutlined />}>
      Add Filter
    </Menu.Item>
    <Menu.Item key="add-sort" icon={<SortAscendingOutlined />}>
      Add Sort
    </Menu.Item>
    <Menu.Item key="add-group" icon={<AppstoreOutlined />}>
      Add Group
    </Menu.Item>
    <Menu.Item key="hide-column" icon={<EyeInvisibleOutlined />}>
      Hide Column
    </Menu.Item>
  </Menu>
);

const columns: ColumnsType<Student> = [
  {
    title: '',
    dataIndex: 'checkbox',
    key: 'checkbox',
    width: 40,
    render: () => <Checkbox />, 
  },
  {
    title: (
      <Space size={2}>
        <TableOutlined style={{ fontSize: '10px' }} />
        <LockOutlined style={{ fontSize: '10px' }} />
      </Space>
    ),
    dataIndex: 'type',
    key: 'type',
    width: 50,
    render: () => null,
  },
  {
    title: (
      <Space size={2}>
        Name
        <DownOutlined style={{ fontSize: '8px' }} />
      </Space>
    ),
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Typography.Text strong>{text}</Typography.Text>,
  },
  {
    title: (
      <Space size={2}>
        Company
        <Dropdown overlay={companyMenu} trigger={["click"]} placement="bottomLeft">
          <DownOutlined style={{ fontSize: '8px', cursor: 'pointer' }} onClick={e => e.stopPropagation()} />
        </Dropdown>
      </Space>
    ),
    dataIndex: 'company',
    key: 'company',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: (
      <Space size={2}>
        Guide Allotted
        <DownOutlined style={{ fontSize: '8px' }} />
      </Space>
    ),
    dataIndex: 'guide',
    key: 'guide',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
  },
  {
    title: (
      <Space size={2}>
        Job Domain
        <DownOutlined style={{ fontSize: '8px' }} />
      </Space>
    ),
    dataIndex: 'jobDomain',
    key: 'jobDomain',
  },
  {
    title: (
      <Space size={2}>
        <CalendarOutlined style={{ fontSize: '10px' }} />
        Starting Date
        <DownOutlined style={{ fontSize: '8px' }} />
      </Space>
    ),
    dataIndex: 'startingDate',
    key: 'startingDate',
    render: (date) => <StudentDate date={date} />,
  },
  {
    title: (
      <Space size={2}>
        <CalendarOutlined style={{ fontSize: '10px' }} />
        Ending Date
        <DownOutlined style={{ fontSize: '8px' }} />
      </Space>
    ),
    dataIndex: 'endingDate',
    key: 'endingDate',
    render: (date) => <StudentDate date={date} />,
  },
  {
    title: (
      <Space size={2}>
        # Week
        <DownOutlined style={{ fontSize: '8px' }} />
      </Space>
    ),
    dataIndex: 'week',
    key: 'week',
    render: (count) => <WeekCount count={count} />,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    width: 40,
    render: () => null,
  },
];

const StudentTable: React.FC<StudentTableProps> = ({ studentsData, size = 'middle', className }) => {
  return (
    <div className={className}>
      <Table 
        columns={columns} 
        dataSource={studentsData} 
        pagination={false}
        rowKey="key"
        size={size}
        style={{ 
          border: '1px solid #e0e0e0'
        }}
        className="custom-table"
      />
      <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        {studentsData.length} rows
      </div>
    </div>
  );
};

export default StudentTable;
