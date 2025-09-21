"use client";

import React, { useState } from 'react';
import { Card, Button, Space, Typography, Row, Col } from 'antd';
import { UserOutlined, CrownOutlined, SoundOutlined, SettingOutlined } from '@ant-design/icons';
import AdminCreatorPanel from './AdminCreatorPanel';
import PlayerPanel from './PlayerPanel';

const { Title, Text } = Typography;

type UserRole = 'player' | 'admin' | null;

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  if (selectedRole === 'admin') {
    return (
      <div>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Button
            type="link"
            onClick={() => setSelectedRole(null)}
            icon={<SettingOutlined />}
          >
            Switch Role
          </Button>
        </div>
        <AdminCreatorPanel />
      </div>
    );
  }

  if (selectedRole === 'player') {
    return (
      <div>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Button
            type="link"
            onClick={() => setSelectedRole(null)}
            icon={<SettingOutlined />}
          >
            Switch Role
          </Button>
        </div>
        <PlayerPanel />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>
            <SoundOutlined /> Welcome to Guess the Sound!
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Choose your role to get started
          </Text>
        </div>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={10}>
            <Card
              hoverable
              style={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedRole('player')}
            >
              <Space direction="vertical" size="large" style={{ textAlign: 'center', width: '100%' }}>
                <UserOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={3}>Player</Title>
                <Text type="secondary" style={{ textAlign: 'center' }}>
                  Listen to daily sounds and test your guessing skills.
                  Compete for high scores and maintain your streak!
                </Text>
                <Button type="primary" size="large">
                  Start Playing
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={10}>
            <Card
              hoverable
              style={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedRole('admin')}
            >
              <Space direction="vertical" size="large" style={{ textAlign: 'center', width: '100%' }}>
                <CrownOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                <Title level={3}>Admin / Creator</Title>
                <Text type="secondary" style={{ textAlign: 'center' }}>
                  Upload and manage sounds of the day.
                  Create engaging audio challenges for players.
                </Text>
                <Button type="primary" size="large" style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}>
                  Manage Sounds
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: '32px' }}>
          <Text type="secondary">
            New here? Start as a Player to experience the game,
            or choose Admin to create your own sound challenges!
          </Text>
        </div>
      </Space>
    </div>
  );
}