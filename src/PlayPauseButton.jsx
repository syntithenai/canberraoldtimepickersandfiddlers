import React from "react";
import { Button } from "react-bootstrap";

const PlayPauseButton = ({ isPlaying, startPlaying, stopPlaying}) => {
  return (
    <Button style={{marginRight:'0.5em',marginTop:'0.2em'}} variant={!isPlaying ? 'success' : 'warning' } onClick={isPlaying ? stopPlaying : startPlaying}>
      {isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="6" y="5" width="4" height="14" />
          <rect x="14" y="5" width="4" height="14" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
    </Button>
  );
};

export default PlayPauseButton;