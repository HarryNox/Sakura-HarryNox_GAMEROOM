import { useState } from 'react';
import './index.css';

// Importing generated placeholder cover arts
import coverSakura from './assets/covers/sakura_gamelab.png';
import coverBalance from './assets/covers/balance_bird.png';
import coverKanetsuki from './assets/covers/kanetsuki_rush.png';

const gamesData = [
  {
    id: 'sakura-gamelab',
    title: 'Sakura GameLab',
    description: 'A collection of experimental mini-games developed in a lab environment. Experience various mechanics and enjoy the beautiful sakura-themed aesthetics.',
    cover: coverSakura,
    url: '/Sakura-HarryNox_GAMEROOM/games/harrynox-sakura-gamelab/index.html'
  },
  {
    id: 'balance-bird',
    title: 'Balance Bird',
    description: 'Test your reflexes and balance! Keep the bird flying through challenging obstacles in this addictive, fast-paced arcade experience.',
    cover: coverBalance,
    url: '/Sakura-HarryNox_GAMEROOM/games/BalanceBird/index.html'
  },
  {
    id: 'kanetsuki-rush',
    title: 'Kanetsuki Rush',
    description: 'Feel the rush as you strike the temple bell! A dynamic action game with intense rhythm and striking visual effects.',
    cover: coverKanetsuki,
    url: '/Sakura-HarryNox_GAMEROOM/games/re_kanetsukirush/index.html'
  }
];

function App() {
  const [selectedGame, setSelectedGame] = useState(gamesData[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleBack = () => {
    setIsPlaying(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar Game List */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>GAMEROOM</h1>
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
                Back to Library
              </button>
            </div>
            <iframe 
              src={selectedGame.url} 
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                PLAY NOW
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">Select a game from the library</div>
        )}
      </div>
    </div>
  );
}

export default App;
