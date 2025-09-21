"use client";

import React, { useState, useRef } from 'react';
import {
  Card,
  Button,
  Input,
  Space,
  Typography,
  Progress,
  Alert,
  Result,
  Divider,
  Tag,
  List,
  Statistic,
  Segmented
} from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  TrophyOutlined,
  SoundOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface DailySound {
  id: string;
  title: string;
  description: string;
  audioFile: string;
  date: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
}

interface GameStats {
  streak: number;
  totalGuesses: number;
  correctGuesses: number;
  averageAttempts: number;
}

export default function PlayerPanel() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [selectedSoundId, setSelectedSoundId] = useState('today');
  const maxAttempts = 3;
  const maxPlays = 5;

  // Available sounds
  const availableSounds: Record<string, DailySound> = {
    today: {
      id: 'today',
      title: 'Sound of the Day - Sep 21',
      description: 'Daily sound challenge for September 21st, 2025',
      audioFile: 'https://sound-of-the-day.s3.ap-southeast-2.amazonaws.com/20250921_sound_of_the_day.mp3',
      date: '2025-09-21',
      difficulty: 'easy',
      hints: [
        'This sound is part of today\'s challenge',
        'Listen carefully to identify the source',
        'Think about common everyday sounds'
      ]
    },
    tomorrow: {
      id: 'tomorrow',
      title: 'Sound of the Day - Sep 22',
      description: 'Daily sound challenge for September 22nd, 2025',
      audioFile: 'https://sound-of-the-day.s3.ap-southeast-2.amazonaws.com/20250922_sound_of_the_day.mp3',
      date: '2025-09-22',
      difficulty: 'medium',
      hints: [
        'This sound will be tomorrow\'s challenge',
        'Listen for distinctive characteristics',
        'Consider both natural and artificial sounds'
      ]
    }
  };

  const currentSound = availableSounds[selectedSoundId];

  // Mock game statistics
  const gameStats: GameStats = {
    streak: 7,
    totalGuesses: 23,
    correctGuesses: 18,
    averageAttempts: 2.1
  };

  const recentResults = [
    { date: '2025-09-20', sound: 'Sound of the Day - Sep 20', attempts: 2, correct: true },
    { date: '2025-09-19', sound: 'Sound of the Day - Sep 19', attempts: 1, correct: true },
    { date: '2025-09-18', sound: 'Sound of the Day - Sep 18', attempts: 3, correct: false },
    { date: '2025-09-17', sound: 'Sound of the Day - Sep 17', attempts: 2, correct: true },
  ];

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (playCount < maxPlays) {
        audioRef.current.play();
        setIsPlaying(true);
        setPlayCount(prev => prev + 1);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleSoundChange = (soundId: string) => {
    setSelectedSoundId(soundId);
    resetGame();
  };

  const handleGuessSubmit = () => {
    if (!currentGuess.trim()) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Simple matching logic (in real app, this would be more sophisticated)
    const guess = currentGuess.toLowerCase();

    if (guess.includes('bird') || guess.includes('chirp') || guess.includes('sound')) {
      setGameState('won');
    } else if (newAttempts >= maxAttempts) {
      setGameState('lost');
    }

    setCurrentGuess('');
  };

  const resetGame = () => {
    setGameState('playing');
    setAttempts(0);
    setCurrentGuess('');
    setShowHint(false);
    setPlayCount(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = { easy: 'green', medium: 'orange', hard: 'red' };
    return colors[difficulty as keyof typeof colors] || 'default';
  };

  const getScorePoints = () => {
    const basePoints = { easy: 100, medium: 200, hard: 300 };
    const difficultyPoints = basePoints[currentSound.difficulty];
    const attemptMultiplier = Math.max(1, maxAttempts - attempts + 1);
    return difficultyPoints * attemptMultiplier;
  };

  if (gameState === 'won') {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Result
          status="success"
          title="Congratulations! You guessed it right!"
          subTitle={
            <Space direction="vertical">
              <Text>The sound was: <strong>{currentSound.title}</strong></Text>
              <Text>Attempts used: {attempts}/{maxAttempts}</Text>
              <Text>Points earned: <strong>{getScorePoints()}</strong></Text>
            </Space>
          }
          extra={[
            <Button key="again" type="primary" onClick={resetGame}>
              Play Again
            </Button>,
            <Button key="stats">View Stats</Button>
          ]}
        />
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Result
          status="error"
          title="Game Over!"
          subTitle={
            <Space direction="vertical">
              <Text>The correct answer was: <strong>{currentSound.title}</strong></Text>
              <Text>{currentSound.description}</Text>
              <Text>Better luck next time!</Text>
            </Space>
          }
          extra={[
            <Button key="again" type="primary" onClick={resetGame}>
              Try Again
            </Button>,
            <Button key="stats">View Stats</Button>
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>
            <SoundOutlined /> Guess the Sound of the Day
          </Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <Text type="secondary">
                Listen carefully and guess what you hear!
              </Text>
              <Tag color={getDifficultyColor(currentSound.difficulty)}>
                {currentSound.difficulty.toUpperCase()}
              </Tag>
            </Space>

            <div>
              <Text strong style={{ marginRight: '16px' }}>Select Sound:</Text>
              <Segmented
                value={selectedSoundId}
                onChange={(value) => handleSoundChange(value as string)}
                options={[
                  {
                    label: 'Today (Sep 21)',
                    value: 'today',
                  },
                  {
                    label: 'Tomorrow (Sep 22)',
                    value: 'tomorrow',
                  },
                ]}
              />
            </div>

            <Card size="small" style={{ background: '#f6f6f6' }}>
              <Space direction="vertical" size="small">
                <Text strong>{currentSound.title}</Text>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  {currentSound.description}
                </Text>
              </Space>
            </Card>
          </Space>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Card style={{ flex: 1, minWidth: 400 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <audio
                  ref={audioRef}
                  onEnded={handleAudioEnded}
                  preload="metadata"
                  key={currentSound.id}
                >
                  <source src={currentSound.audioFile} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <Button
                  type="primary"
                  size="large"
                  icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  onClick={toggleAudio}
                  disabled={playCount >= maxPlays}
                  style={{ fontSize: '18px', height: '60px', width: '200px' }}
                >
                  {isPlaying ? 'Pause' : 'Play Sound'}
                </Button>

                <div style={{ marginTop: '16px' }}>
                  <Text type="secondary">
                    Plays remaining: {maxPlays - playCount}/{maxPlays}
                  </Text>
                  <Progress
                    percent={(playCount / maxPlays) * 100}
                    showInfo={false}
                    strokeColor="#ff4d4f"
                  />
                </div>
              </div>

              <Divider />

              <div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text strong>Your Guess:</Text>
                  <Input.Search
                    placeholder="What do you think this sound is?"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    onSearch={handleGuessSubmit}
                    enterButton="Submit Guess"
                    size="large"
                    disabled={attempts >= maxAttempts}
                  />
                  <Text type="secondary">
                    Attempts: {attempts}/{maxAttempts}
                  </Text>
                  <Progress
                    percent={(attempts / maxAttempts) * 100}
                    showInfo={false}
                    strokeColor="#faad14"
                  />
                </Space>
              </div>

              {attempts > 0 && !showHint && (
                <Alert
                  message="Need a hint?"
                  description={
                    <Button type="link" onClick={() => setShowHint(true)}>
                      Click here for a hint (costs 50 points)
                    </Button>
                  }
                  type="info"
                  showIcon
                />
              )}

              {showHint && (
                <Alert
                  message="Hint"
                  description={currentSound.hints[Math.min(attempts - 1, currentSound.hints.length - 1)]}
                  type="warning"
                  showIcon
                />
              )}
            </Space>
          </Card>

          <Card title="Your Stats" style={{ minWidth: 300 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Statistic
                title="Current Streak"
                value={gameStats.streak}
                prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
              />
              <Statistic
                title="Success Rate"
                value={Math.round((gameStats.correctGuesses / gameStats.totalGuesses) * 100)}
                suffix="%"
              />
              <Statistic
                title="Average Attempts"
                value={gameStats.averageAttempts}
                precision={1}
              />

              <Divider />

              <div>
                <Text strong>Recent Results</Text>
                <List
                  size="small"
                  dataSource={recentResults}
                  renderItem={(item) => (
                    <List.Item>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <div>
                          <div>{item.sound}</div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {item.date}
                          </Text>
                        </div>
                        <Space>
                          <Text type="secondary">{item.attempts} tries</Text>
                          {item.correct ?
                            <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                          }
                        </Space>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </Space>
          </Card>
        </div>
      </Space>
    </div>
  );
}