"use client";
import React, { useState } from "react";
import { Button, Card, Modal, Form, Input, Typography } from "antd";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Redirect or show success
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <Card style={{ width: 420, textAlign: "center", boxShadow: "0 2px 16px #0001" }}>
        <div style={{ marginBottom: 16 }}>
          <Image src="/logo.png" alt="Logo" width={64} height={64} style={{ marginBottom: 8 }} />
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            DJSCE INFORMATION TECHNOLOGY
          </Typography.Title>
          <Typography.Title level={2} style={{ margin: 0, fontWeight: 700, fontSize: 28 }}>
            Placement Portal
          </Typography.Title>
        </div>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, marginBottom: 16 }}>
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 600, color: "#555" }}>
            Placement Aptitude Portal
          </Typography.Title>
          <Typography.Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
            Dwarkadas J. Sanghvi College of Engineering
          </Typography.Text>
          <Button type="primary" size="large" style={{ background: "#19b86e", border: 0, width: 160 }} onClick={() => setShowForm(true)}>
            Login
          </Button>
        </div>
      </Card>
      <Modal
        open={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        title={<span style={{ fontWeight: 600 }}>Login to your account</span>}
      >
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}> 
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}> 
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%", background: "#19b86e", border: 0 }}>
              Login
            </Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Typography.Text>
              Don&apos;t have an account? <a href="/auth/register">Register</a>
            </Typography.Text>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginPage;



