'use client';
import React from 'react';
import { Layout, Typography, Row, Col, Image } from 'antd';

const { Header } = Layout;
const { Title, Text } = Typography;

interface AppHeaderProps {
  logoSrc: string;
  title: string;
  subtitle: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ logoSrc, title, subtitle }) => {
  return (
    <Header style={{ background: '#fff', padding: '0 24px' }}>
      <Row align="middle" gutter={16}>
        <Col>
          <Image
            src={logoSrc}
            alt="Logo"
            preview={false}
            width={50}
            height={50}
            style={{ objectFit: 'contain' }}
          />
        </Col>
        <Col>
          <Title level={5} style={{ margin: 0, color: '#0f1c4d' }}>
            {title}
          </Title>
          <Text strong style={{ color: '#1c2d61', fontSize: 16 }}>
            {subtitle}
          </Text>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
