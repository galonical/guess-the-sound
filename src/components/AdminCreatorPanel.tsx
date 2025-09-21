"use client";

import React, { useState } from 'react';
import {
  Upload,
  Button,
  Form,
  Input,
  DatePicker,
  Card,
  List,
  Typography,
  Space,
  message,
  Divider,
  Tag
} from 'antd';
import { UploadOutlined, SoundOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface SoundEntry {
  id: string;
  title: string;
  description: string;
  audioFile: string;
  date: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FormValues {
  title: string;
  description: string;
  audioFile: string;
  date: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function AdminCreatorPanel() {
  const [form] = Form.useForm();
  const [soundEntries, setSoundEntries] = useState<SoundEntry[]>([
    {
      id: '1',
      title: 'Sound of the Day - Sep 21',
      description: 'Daily sound challenge for September 21st, 2025',
      audioFile: 'https://sound-of-the-day.s3.ap-southeast-2.amazonaws.com/20250921_sound_of_the_day.mp3',
      date: '2025-09-21',
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Sound of the Day - Sep 22',
      description: 'Daily sound challenge for September 22nd, 2025',
      audioFile: 'https://sound-of-the-day.s3.ap-southeast-2.amazonaws.com/20250922_sound_of_the_day.mp3',
      date: '2025-09-22',
      difficulty: 'medium'
    }
  ]);
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'audio',
    accept: 'audio/*',
    beforeUpload: (file) => {
      const isAudio = file.type.startsWith('audio/');
      if (!isAudio) {
        message.error('You can only upload audio files!');
      }
      return isAudio || Upload.LIST_IGNORE;
    },
    customRequest: ({ file, onSuccess }) => {
      // Simulate upload process
      setTimeout(() => {
        onSuccess?.("ok");
        message.success(`${(file as File).name} uploaded successfully`);
      }, 1000);
    },
  };

  const onFinish = (values: FormValues) => {
    setUploading(true);

    // Simulate API call
    setTimeout(() => {
      const newEntry: SoundEntry = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        audioFile: values.audioFile,
        date: values.date,
        difficulty: values.difficulty
      };

      setSoundEntries(prev => [newEntry, ...prev]);
      form.resetFields();
      setUploading(false);
      message.success('Sound of the day added successfully!');
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setSoundEntries(prev => prev.filter(entry => entry.id !== id));
    message.success('Sound entry deleted successfully!');
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = { easy: 'green', medium: 'orange', hard: 'red' };
    return colors[difficulty as keyof typeof colors] || 'default';
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>
            <SoundOutlined /> Admin Creator Panel
          </Title>
          <Text type="secondary">
            Add and manage sounds of the day for players to guess
          </Text>
        </div>

        <Card title="Add New Sound of the Day" style={{ width: '100%' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="title"
              label="Sound Title"
              rules={[{ required: true, message: 'Please enter a title for the sound' }]}
            >
              <Input placeholder="e.g., Morning Forest Birds" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <TextArea
                rows={3}
                placeholder="Describe the sound to help with difficulty assessment"
              />
            </Form.Item>

            <Form.Item
              name="audioFile"
              label="Audio File"
              rules={[{ required: true, message: 'Please upload an audio file' }]}
            >
              <Upload {...uploadProps} maxCount={1}>
                <Button icon={<UploadOutlined />}>
                  Select Audio File
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="date"
              label="Scheduled Date"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="difficulty"
              label="Difficulty Level"
              rules={[{ required: true, message: 'Please select difficulty' }]}
            >
              <Space>
                <Button type={form.getFieldValue('difficulty') === 'easy' ? 'primary' : 'default'}
                        onClick={() => form.setFieldsValue({ difficulty: 'easy' })}>
                  Easy
                </Button>
                <Button type={form.getFieldValue('difficulty') === 'medium' ? 'primary' : 'default'}
                        onClick={() => form.setFieldsValue({ difficulty: 'medium' })}>
                  Medium
                </Button>
                <Button type={form.getFieldValue('difficulty') === 'hard' ? 'primary' : 'default'}
                        onClick={() => form.setFieldsValue({ difficulty: 'hard' })}>
                  Hard
                </Button>
              </Space>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={uploading} size="large">
                Add Sound of the Day
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Divider />

        <Card title="Manage Existing Sounds" style={{ width: '100%' }}>
          <List
            dataSource={soundEntries}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key="edit" icon={<EditOutlined />} type="text">Edit</Button>,
                  <Button
                    key="delete"
                    icon={<DeleteOutlined />}
                    type="text"
                    danger
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      {item.title}
                      <Tag color={getDifficultyColor(item.difficulty)}>
                        {item.difficulty.toUpperCase()}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <Text>{item.description}</Text>
                      <Text type="secondary">
                        Scheduled for: {item.date} | Audio: {item.audioFile}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </div>
  );
}