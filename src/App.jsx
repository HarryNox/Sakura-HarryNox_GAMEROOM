import { useState } from 'react';
import './index.css';

// Importing generated placeholder cover arts
import coverMBTI from './assets/covers/mbti_quest.png';
import coverBalance from './assets/covers/balance_bird.png';
import coverKanetsuki from './assets/covers/kanetsuki_rush.png';

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

  const handlePlay = () => {
    if (selectedGame.isExternal) {
      window.open(selectedGame.url, '_blank');
    } else {
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
              src={`${selectedGame.url}?t=${Date.now()}`} 
              className="game-iframe" 
              title={selectedGame.title}
              allow="autoplay; fullscreen"
            ></iframe>
          </div>
        ) : selectedGame ? (
          <div 
            className="game-details" 
            style={{ backgroundImage: `url(${selectedGame.cover})` }}
          >
            <div className="game-details-overlay"></div>
            <div className="game-info">
              <h1 className="game-title">{selectedGame.title}</h1>
              <p className="game-description">{selectedGame.description}</p>
              <button className="play-button" onClick={handlePlay}>
                {selectedGame.isExternal ? (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    VIEW REPOSITORY
                  </>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    プレイする
                  </>
                )}
              </button>
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
