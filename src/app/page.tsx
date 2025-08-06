'use client';
import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/Header/index';
import StudentTable from '@/components/StudentTable';
import SubToolBar from '@/components/SubToolBar';
import TopMenuBar from '@/components/TopMenuBar';
import { Content } from 'antd/es/layout/layout';

const App: React.FC = () => {
  return (
    <Layout>
      <AppHeader
        logoSrc="/logo.png" // Replace with your actual logo path
        title="DJSC INFORMATION TECHNOLOGY"
        subtitle="Placement Portal"
      />
      <TopMenuBar />
      {/* <SubToolBar /> */}
      <Content style={{ margin: '16px' }}>
        {/* <StudentTable /> */}
      </Content>
    </Layout>
  );
};

export default App;
