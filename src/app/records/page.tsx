'use client'
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
  // SubToolBar state
  const [hideColumnsModalVisible, setHideColumnsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const columns = [
    'Company',
    'Guide Allotted', 
    'Job Domain',
    'Starting Date',
    'Ending Date',
    'Week'
  ];

  const filteredColumns = columns.filter(column =>
    column.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleHideAll = () => {
    setSelectedColumns([...columns]);
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
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <TopMenuBar />
      <SubToolBar 
        hideColumnsModalVisible={hideColumnsModalVisible}
        searchText={searchText}
        selectedColumns={selectedColumns}
        filteredColumns={filteredColumns}
        onHideColumnsToggle={handleHideColumnsToggle}
        onSearchTextChange={handleSearchTextChange}
        onHideAll={handleHideAll}
        onShowAll={handleShowAll}
        onColumnToggle={handleColumnToggle}
      />
      <Content style={{ background: '#f5f5f5' }}>
        <StudentTable studentsData={studentsData} />
      </Content>
    </Layout>
  );
};

export default RecordsPage;