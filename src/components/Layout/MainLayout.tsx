'use client';

import { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, App, Switch, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined,
  BulbFilled, BulbOutlined, FullscreenExitOutlined, FullscreenOutlined, UserOutlined, MenuOutlined,
  DashboardOutlined, SettingOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';


const { Header, Sider, Content } = Layout;

const getMenuItems = (router: any) => [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    onClick: () => router.push('/dashboard'),
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users',
    onClick: () => router.push('/users'),
  },
  {
    key: 'records',
    icon: <SettingOutlined />,
    label: 'Records',
    onClick: () => router.push('/records'),
  },
];

const getProfileMenu = (handleLogout: () => void) => {
  return {
    items: [
      {
        key: 'profile',
        label: 'Profile',
        onClick: () => console.log('Go to profile'),
      },
      
      {
        key: 'logout',
        label: 'Logout',
        onClick: handleLogout,
      },
    ],
  };
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  const { message } = App.useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // const { darkMode, toggleDarkMode } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  // Resize handler
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
      setCollapsed(width < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial selected key
  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setSelectedKey(path || 'dashboard');
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      document.cookie = 'token=; Max-Age=0; path=/';
      document.cookie = 'userRole=; Max-Age=0; path=/';
      message.success('Logged out successfully');
      router.push('/auth/login');
    } catch {
      message.error('Logout failed');
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <Layout className="min-h-screen">
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          style={{ position: 'fixed', height: '100vh', left: 0, top: 0, bottom: 0}}
        >
          <div className="h-8 m-4 bg-white/10 rounded" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={getMenuItems(router)}
            style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}
          />
        </Sider>
      )}

      <Layout
        style={{
          marginLeft: !isMobile ? (collapsed ? 80 : 250) : 0,
          transition: 'margin-left 0.2s ease',
          minHeight: '100vh',
        }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            background: colorBgContainer,
            position: 'fixed',
            width: `calc(100% - ${!isMobile ? (collapsed ? 80 : 250) : 0}px)`,
            zIndex: 1000,
          }}
        >
          {!isMobile ? (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
          ) : (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 20 }}
            />
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
            /> */}

            {!isMobile && (
              <Button
                type="text"
                icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={toggleFullScreen}
              />
            )}

            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} />

            <Dropdown menu={getProfileMenu(handleLogout)} trigger={['click']} placement="bottomRight" arrow>
              <Avatar style={{ cursor: 'pointer', backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: '69px 6px 24px 6px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
