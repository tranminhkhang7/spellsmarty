import React from 'react';
import YouTubeVideo from './YoutubeVideo';

const App = () => {
  const videoId = 'h6fcK_fRYaI';
  const startTimestamp = 10; // 15 seconds

  return (
    <div className="app">
      <h1>Spell Smarty</h1>
      <YouTubeVideo videoId={videoId} start={startTimestamp} />
    </div>
  );
};

export default App;
