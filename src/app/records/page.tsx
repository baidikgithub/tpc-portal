'use client';

import AppHeader from '@/components/Header';
import React, { useState } from 'react';
import { Layout } from 'antd';
import SubToolBar from '@/components/SubToolBar';
import StudentTable from '@/components/StudentTable';
import { Content } from 'antd/es/layout/layout';
import TopMenuBar from '@/components/TopMenuBar';

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

const studentsData: Student[] = [
  {
    key: '1',
    name: 'Oliver',
    company: 'Algoma',
    guide: 'Thomas',
    jobDomain: 'Marketing',
    startingDate: '2019-05-20',
    endingDate: '2019-06-21',
    week: 5,
  },
  {
    key: '2',
    name: 'Jack',
    company: 'Lake Trade',
    guide: 'David',
    jobDomain: 'Technical',
    startingDate: '2019-05-22',
    endingDate: '2019-06-22',
    week: 5,
  },
  {
    key: '3',
    name: 'Harry',
    company: 'Camden',
    guide: 'George',
    jobDomain: 'Technical',
    startingDate: '2019-06-01',
    endingDate: '2019-07-01',
    week: 4,
  },
  {
    key: '4',
    name: 'Jacob',
    company: 'Kannapolis',
    guide: 'George',
    jobDomain: 'Technical',
    startingDate: '2019-06-01',
    endingDate: '2019-07-06',
    week: 5,
  },
  {
    key: '5',
    name: 'James',
    company: 'Cohoes',
    guide: 'Thomas',
    jobDomain: 'Technical',
    startingDate: '2019-05-20',
    endingDate: '2019-06-28',
    week: 6,
  },
];

const RecordsPage: React.FC = () => {
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const columns = [
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Guide Allotted', dataIndex: 'guide', key: 'guide' },
    { title: 'Job Domain', dataIndex: 'jobDomain', key: 'jobDomain' },
    { title: 'Starting Date', dataIndex: 'startingDate', key: 'startingDate' },
    { title: 'Ending Date', dataIndex: 'endingDate', key: 'endingDate' },
    { title: 'Week', dataIndex: 'week', key: 'week' }
  ];

  const filteredColumns = columns.filter(column =>
    column.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleHideAll = () => {
    setSelectedColumns(columns.map(col => col.key));
  };

  const handleShowAll = () => {
    setSelectedColumns([]);
  };

  const handleColumnToggle = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleHideColumnsToggle = () => {
    setHideColumnsModalVisible(!hideColumnsModalVisible);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <Layout className="min-h-screen">
      <TopMenuBar />
      <Content className="p-4">
        <div className="mb-4">
          <SubToolBar
            hideColumnsModalVisible={hideColumnsModalVisible}
            searchText={searchText}
            selectedColumns={selectedColumns}
            filteredColumns={columns.map(col => col.title)}
            onHideColumnsToggle={handleHideColumnsToggle}
            onSearchTextChange={handleSearchTextChange}
            onHideAll={handleHideAll}
            onShowAll={handleShowAll}
            onColumnToggle={handleColumnToggle}
          />
        </div>
        <div className="bg-white rounded-lg shadow">
          <StudentTable 
            studentsData={studentsData}
            size="middle"
            className="overflow-x-auto"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default RecordsPage;
