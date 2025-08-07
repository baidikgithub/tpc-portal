"use client";
import React, { useState, useEffect } from "react";
import { Row, Col, Space, Button, Table, Input, Dropdown, Menu, message, Switch, DatePicker } from "antd";
import { DownloadOutlined, BarChartOutlined, TableOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

// Mock user data
type Customer = {
  key: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  tag?: string;
};

const mockUsers: Customer[] = [
  { key: "1", name: "John Doe", phone: "1234567890", email: "john@example.com", address: "Mumbai", tag: "VIP" },
  { key: "2", name: "Jane Smith", phone: "9876543210", email: "jane@example.com", address: "Pune", tag: "Regular" },
  { key: "3", name: "Mike Johnson", phone: "5551234567", email: "mike@example.com", address: "Delhi", tag: "New" },
  { key: "4", name: "Sarah Wilson", phone: "4445556666", email: "sarah@example.com", address: "Bangalore", tag: "VIP" },
  { key: "5", name: "David Brown", phone: "3332221111", email: "david@example.com", address: "Chennai", tag: "Regular" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Tag", dataIndex: "tag", key: "tag" },
];

export default function UsersDataPage() {
  const [isGraphical, setIsGraphical] = useState(true);
  const [users, setUsers] = useState<Customer[]>(mockUsers);
  const [filteredData, setFilteredData] = useState<Customer[]>(mockUsers);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // In real app, fetch users here
    setUsers(mockUsers);
    setFilteredData(mockUsers);
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const lower = value.toLowerCase();
    setFilteredData(
      users.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.phone.includes(value) ||
          (item.address && item.address.toLowerCase().includes(lower)) ||
          (item.tag && item.tag.toLowerCase().includes(lower))
      )
    );
  };

  const downloadMenu = (
    <Menu>
      <Menu.Item key="csv">Download as CSV</Menu.Item>
      <Menu.Item key="excel">Export to Excel</Menu.Item>
    </Menu>
  );

  return (
    <main className="p-6">
      <Row align="middle" justify="space-between" style={{ width: "100%" }}>
        <Col>
          <Space>
            <span style={{ fontWeight: 600, fontSize: 20 }}>Users</span>
            <Switch
              checkedChildren={<BarChartOutlined />}
              unCheckedChildren={<TableOutlined />}
              checked={isGraphical}
              onChange={setIsGraphical}
            />
            <span style={{ color: "#888" }}>{isGraphical ? "Graphical" : "Classical"}</span>
          </Space>
        </Col>
        <Col>
          <Dropdown overlay={downloadMenu} placement="bottomRight">
            <Button icon={<DownloadOutlined />}>Download</Button>
          </Dropdown>
        </Col>
      </Row>

      <Space style={{ margin: "16px 0" }}>
        <RangePicker onChange={() => {}} />
        <Input.Search
          placeholder="Name / Mobile / Address / Tag"
          style={{ width: 300 }}
          allowClear
          value={searchValue}
          onChange={e => handleSearch(e.target.value)}
          onSearch={handleSearch}
        />
      </Space>

      {isGraphical ? (
        <div style={{ minHeight: 200, background: "#fafafa", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 24, marginBottom: 24 }}>
          {/* Replace with actual chart/graph */}
          Graphical View Coming Soon
        </div>
      ) : (
        <Table dataSource={filteredData} columns={columns} rowKey="key" pagination={{ pageSize: 8 }} />
      )}
    </main>
  );
}



