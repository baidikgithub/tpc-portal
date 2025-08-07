'use client';
import React from 'react';
import { Layout, Typography, Row, Col, Image, Button } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const AppLandingPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <Header
        style={{
          background: 'transparent',
          padding: '0 60px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Row justify="space-between" align="middle">
          {/* Logo and Title */}
          <Col>
            <Row align="middle" gutter={16} wrap={false}>
              <Col>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  }}
                >
                  <Image
                    src="/logo.png" // Replace with your logo path
                    alt="Logo"
                    preview={false}
                    width={32}
                    height={32}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Col>
              <Col>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    color: '#fff',
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  Aievari
                </Title>
              </Col>
            </Row>
          </Col>

          {/* Navigation */}
          <Col>
            <Row align="middle" gutter={32} wrap={false}>
              {['Home', 'About Us', 'Investment', 'Pages', 'Blog', 'Contacts'].map(
                (item) => (
                  <Col key={item}>
                    <a
                      href="#"
                      style={{
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: 16,
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                      }}
                    >
                      {item}
                    </a>
                  </Col>
                )
              )}
              <Col>
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    backgroundColor: '#f7a600',
                    border: 'none',
                    fontWeight: 600,
                  }}
                >
                  LOGIN
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>

      {/* Hero Section */}
      <Content
        style={{
          backgroundImage: 'url(/background.jpg)', // Replace with your background path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          <Title
            level={1}
            style={{
              color: '#fff',
              fontSize: '3rem',
              fontWeight: 700,
              marginBottom: '24px',
            }}
          >
            Best secure investment plan
          </Title>

          <Row gutter={24} justify="center">
            <Col>
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: '#f7a600',
                  border: 'none',
                  fontWeight: 600,
                }}
              >
                GET STARTED
              </Button>
            </Col>
            <Col>
              <Button
                type="default"
                size="large"
                icon={
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      display: 'inline-block',
                      borderRadius: '50%',
                      backgroundColor: '#f7a600',
                      textAlign: 'center',
                      lineHeight: '20px',
                      color: '#fff',
                      marginRight: 8,
                    }}
                  >
                    ▶
                  </span>
                }
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 500,
                }}
              >
                watch video
              </Button>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AppLandingPage;
