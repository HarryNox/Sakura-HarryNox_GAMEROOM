import { useState } from 'react';
import './index.css';

// Cover arts replaced with in-game assets and SVGs to comply with non-AI assets rules
import coverMBTI from './assets/covers/mbti_quest.png';
import coverBalance from './assets/covers/balance_bird.svg';
import coverKanetsuki from './assets/covers/kanetsuki_rush.svg';

const gamesData = [
  {
    id: 'mbti-quest',
    title: 'MBTI Quest',
    description: '16種類の性格タイプ（MBTI）が壮大な冒険に出発するデータ駆動型のRPGシステム。独自のスキルを駆使して、Webブラウザ上で本格的な冒険に挑もう！',
    cover: coverMBTI,
    url: '/Sakura-HarryNox_GAMEROOM/games/harrynox-sakura-gamelab/index.html',
    isExternal: false
  },
  {
    id: 'balance-bird',
    title: 'Balance Bird',
    description: 'あなたの反射神経とバランス感覚が試される！迫りくる障害物を巧みに避けながら鳥を飛ばし続ける、中毒性の高いハイスピード・アーケードゲーム。',
    cover: coverBalance,
    url: '/Sakura-HarryNox_GAMEROOM/games/BalanceBird/index.html',
    isExternal: false
  },
  {
    id: 'kanetsuki-rush',
    title: 'Kanetsuki Rush',
    description: '除夜の鐘を激しく打ち鳴らせ！疾走感あふれるリズムと派手なエフェクトが爽快な、新感覚のダイナミック・アクションゲーム。',
    cover: coverKanetsuki,
    url: '/Sakura-HarryNox_GAMEROOM/games/re_kanetsukirush/index.html',
    isExternal: false
  }
];

function App() {
  const [selectedGame, setSelectedGame] = useState(gamesData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState('pc');

  const handlePlay = (mode) => {
    if (selectedGame.isExternal) {
      window.open(selectedGame.url, '_blank');
    } else {
      setPlayMode(mode);
      setIsPlaying(true);
    }
  };

  const handleBack = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`app-container ${isPlaying ? 'is-playing' : ''}`}>
      {/* Sidebar Game List */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>GAMEROOM</h1>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>made by Sakura@HarryNox</div>
        </div>
        <div className="game-list">
          {gamesData.map(game => (
            <div 
              key={game.id} 
              className={`game-item ${selectedGame.id === game.id && !isPlaying ? 'active' : ''}`}
              onClick={() => {
                setSelectedGame(game);
                setIsPlaying(false);
              }}
            >
              <img src={game.cover} alt="" className="game-icon" />
              <span>{game.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {isPlaying ? (
          <div className="player-container">
            <div className="player-header">
              <button className="back-button" onClick={handleBack}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                ライブラリに戻る
              </button>
            </div>
            <iframe 
              src={`${selectedGame.url}?mode=${playMode}&t=${Date.now()}`} 
              className="game-iframe" 
              title={selectedGame.title}
              allow="autoplay; fullscreen"
            ></iframe>
          </div>
        ) : selectedGame ? (
          <div 
            className="game-details" 
            style={{ backgroundImage: `url("${selectedGame.cover}")` }}
          >
            <div className="game-details-overlay"></div>
            <div className="game-info">
              <h1 className="game-title">{selectedGame.title}</h1>
              <p className="game-description">{selectedGame.description}</p>
              <div className="play-button-group" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                {selectedGame.isExternal ? (
                  <button className="play-button" onClick={() => handlePlay('pc')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    VIEW REPOSITORY
                  </button>
                ) : (
                  <>
                    <button className="play-button" onClick={() => handlePlay('mobile')} style={{ flex: 1, backgroundColor: '#f43f5e', borderColor: '#f43f5e', boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                      スマホでプレイ
                    </button>
                    <button className="play-button" onClick={() => handlePlay('pc')} style={{ flex: 1 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      PCでプレイ
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">ライブラリからゲームを選択してください</div>
        )}
      </div>
    </div>
  );
}

export default App;
