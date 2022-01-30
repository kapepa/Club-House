import React, {FC, useEffect, useRef} from "react";

interface IMedia {
  peer: any,
}

const Media: FC<IMedia> = ({peer}) => {
  const videoRef = useRef<HTMLVideoElement | HTMLAudioElement | HTMLMediaElement>(null);

  useEffect(() => {
    peer.on('stream', (stream: MediaSource ) => {
      const video = (videoRef.current as HTMLMediaElement);
      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        video.src = window.URL.createObjectURL(stream)
      }
      video.play();
    })
  },[]);

  return <audio ref={videoRef} controls={true} />
}

export default Media