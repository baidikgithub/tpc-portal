'use client';
import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/Header/index';
import StudentTable from '@/components/StudentTable';
import SubToolBar from '@/components/SubToolBar';
import TopMenuBar from '@/components/TopMenuBar';
import { Content } from 'antd/es/layout/layout';
import logo from '../../public/logo.jpg';
import AppLandingPage from '@/components/LandingPage';
const App: React.FC = () => {
  return (
    <Layout>
      <AppLandingPage />
    
    </Layout>
  );
};

export default App;
