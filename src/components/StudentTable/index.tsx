import React from 'react';
import { Table, Checkbox, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  DownOutlined, 
  LockOutlined, 
  CalendarOutlined,
  TableOutlined 
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
}

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
        <DownOutlined style={{ fontSize: '8px' }} />
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

const StudentTable: React.FC<StudentTableProps> = ({ studentsData }) => {
  return (
    <div style={{ background: '#fff' }}>
      <Table 
        columns={columns} 
        dataSource={studentsData} 
        pagination={false}
        rowKey="key"
        style={{ 
          border: '1px solid #e0e0e0'
        }}
        className="custom-table"
      />
      <div style={{ 
        padding: '6px 12px', 
        borderTop: '1px solid #e0e0e0',
        background: '#fafafa',
        fontSize: '11px',
        color: '#666'
      }}>
        {studentsData.length} rows
      </div>
    </div>
  );
};

export default StudentTable;
