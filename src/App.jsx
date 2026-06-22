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
    description: 'A data-driven RPG system built in Unity where 16 different MBTI personalities embark on an epic journey. (Note: Currently a Unity project repository in development, not playable in browser)',
    cover: coverMBTI,
    url: 'https://github.com/HarryNox/MBTIQuest',
    isExternal: true
  },
  {
    id: 'balance-bird',
    title: 'Balance Bird',
    description: 'Test your reflexes and balance! Keep the bird flying through challenging obstacles in this addictive, fast-paced arcade experience.',
    cover: coverBalance,
    url: '/Sakura-HarryNox_GAMEROOM/games/BalanceBird/index.html',
    isExternal: false
  },
  {
    id: 'kanetsuki-rush',
    title: 'Kanetsuki Rush',
    description: 'Feel the rush as you strike the temple bell! A dynamic action game with intense rhythm and striking visual effects.',
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
                    PLAY NOW
                  </>
                )}
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
