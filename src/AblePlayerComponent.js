import { useEffect, useRef } from "react";

const AblePlayerComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure Able Player initializes after the component mounts
    if (window.AblePlayer) {
      new window.AblePlayer(videoRef.current);
    }
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        id="able-video"
        data-able-player
        width="640"
        height="360"
        preload="auto"
        playsInline
      >
        <source src="https://your-video-url.mp4" type="video/mp4" />
        <track
          kind="captions"
          src="https://your-captions.vtt"
          srcLang="en"
          label="English"
        />
      </video>
    </div>
  );
};

export default AblePlayerComponent;