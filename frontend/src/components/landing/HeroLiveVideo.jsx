import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Activity, ShieldCheck, Zap, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroLiveVideo = () => {
  const { navigateTo, handleFindTalent, handleFindWork } = useApp();
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChannel, setActiveChannel] = useState(0);
  const [activeTickerIdx, setActiveTickerIdx] = useState(0);
  const [videoProgress, setVideoProgress] = useState(25);

  const channels = [
    {
      id: 'talent-match',
      title: 'AI Talent Matcher',
      tag: 'Live Engine',
      icon: Zap,
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41443-large.mp4',
      badge: '98% Neural Match Score',
      caption: 'Matching top 1% verified developers to enterprise briefs in < 3 seconds.'
    },
    {
      id: 'live-verify',
      title: 'Skill Assessment',
      tag: 'Interactive IDE',
      icon: ShieldCheck,
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43286-large.mp4',
      badge: 'Live Code Sandbox',
      caption: 'Real-time anti-cheat skill benchmarks with automated code validation.'
    },
    {
      id: 'smart-escrow',
      title: 'Instant Escrow',
      tag: 'Proof Payout',
      icon: Layers,
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41398-large.mp4',
      badge: 'Zero-Dispute Release',
      caption: 'Funds released automatically when milestone proof passes inspection.'
    }
  ];

  const liveTickers = [
    { icon: '⚡', text: 'Alex M. verified in Next.js 15 (Top 1% Global)', time: 'Just now' },
    { icon: '💼', text: 'Enterprise Client posted "Fintech Dashboard" (₹1.8L / $2.2K)', time: '1m ago' },
    { icon: '🛡️', text: 'Proof of Work verified for Priya S. • Escrow Released', time: '3m ago' },
    { icon: '✨', text: 'Smart Match engine connected 18 developers in 1.4s', time: '4m ago' }
  ];

  // Rotate ticker messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTickerIdx((prev) => (prev + 1) % liveTickers.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [liveTickers.length]);

  // Video progress animation simulator if video plays
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleChannelSwitch = (index) => {
    setActiveChannel(index);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const currentChannel = channels[activeChannel];

  return (
    <div className="hero-live-video-card">
      {/* Top Header Bar */}
      <div className="live-video-header">
        <div className="live-video-status">
          <div className="live-pulse-badge">
            <span className="live-pulse-dot"></span>
            <span>LIVE DEMO</span>
          </div>
          <span className="live-viewers-count">
            <Activity size={13} className="activity-icon-pulse" /> 2,840 watching
          </span>
        </div>

        <div className="live-video-channel-pills">
          {channels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <button
                key={ch.id}
                onClick={() => handleChannelSwitch(idx)}
                className={`channel-pill-btn ${activeChannel === idx ? 'active' : ''}`}
                title={ch.title}
              >
                <Icon size={12} />
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Video Frame */}
      <div className="video-player-container" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={currentChannel.videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="hero-video-element"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Gradient Ambient Overlay */}
        <div className="video-gradient-overlay" />

        {/* Centered Play/Pause Button on Hover / Pause */}
        {!isPlaying && (
          <div className="video-play-overlay">
            <div className="play-button-circle">
              <Play size={26} fill="#ffffff" color="#ffffff" style={{ marginLeft: '4px' }} />
            </div>
            <span className="play-overlay-text">Click to Resume Live Stream</span>
          </div>
        )}

        {/* Floating Top Badge on Video */}
        <div className="video-floating-pill">
          <Sparkles size={13} color="#60A5FA" />
          <span>{currentChannel.badge}</span>
        </div>

        {/* Live Audio Equalizer Bars */}
        <div className="video-equalizer-container">
          <div className={`equalizer-bar bar-1 ${isPlaying ? 'animating' : ''}`}></div>
          <div className={`equalizer-bar bar-2 ${isPlaying ? 'animating' : ''}`}></div>
          <div className={`equalizer-bar bar-3 ${isPlaying ? 'animating' : ''}`}></div>
          <div className={`equalizer-bar bar-4 ${isPlaying ? 'animating' : ''}`}></div>
        </div>

        {/* Bottom Video HUD Overlay */}
        <div className="video-hud-overlay">
          <div className="video-caption-box">
            <span className="video-channel-tag">{currentChannel.tag}</span>
            <p className="video-caption-text">{currentChannel.caption}</p>
          </div>

          <div className="video-controls-row" onClick={(e) => e.stopPropagation()}>
            <div className="video-left-controls">
              <button
                onClick={togglePlay}
                className="hud-control-btn"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
              </button>

              <button
                onClick={toggleMute}
                className="hud-control-btn"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <span className="video-live-time">
                <span className="rec-dot"></span> LIVE
              </span>
            </div>

            <div className="video-timeline-wrapper">
              <div className="video-timeline-bar" style={{ width: `${videoProgress}%` }}></div>
            </div>

            <button
              onClick={() => handleFindTalent()}
              className="hud-fullscreen-btn"
              title="Explore Live Platform"
            >
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Realtime Platform Activity Ticker */}
      <div className="live-ticker-strip">
        <div className="ticker-label">
          <span className="ticker-label-badge">LIVE FEED</span>
        </div>
        <div className="ticker-content" key={activeTickerIdx}>
          <span className="ticker-icon">{liveTickers[activeTickerIdx].icon}</span>
          <span className="ticker-text">{liveTickers[activeTickerIdx].text}</span>
          <span className="ticker-time">{liveTickers[activeTickerIdx].time}</span>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="live-video-footer">
        <div className="live-footer-info">
          <CheckCircle2 size={15} color="#10B981" />
          <span>Real-time talent matching & verified skill checks</span>
        </div>
        <div className="live-footer-actions">
          <button
            onClick={handleFindTalent}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '0.825rem', padding: '0.45rem 0.9rem' }}
          >
            Try Live Demo
          </button>
          <button
            onClick={handleFindWork}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.825rem', padding: '0.45rem 0.9rem' }}
          >
            Take Test
          </button>
        </div>
      </div>
    </div>
  );
};
