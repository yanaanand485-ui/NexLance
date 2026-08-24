import React from 'react';
import { ShieldCheck, TrendingUp, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Differentiators = () => {
  const { navigateTo } = useApp();

  const cards = [
    {
      id: 'verified-skills',
      title: 'Verified Skills',
      icon: <ShieldCheck size={22} color="#1E40AF" />,
      description: 'Every skill listed is tested via our rigorous assessment modules, validated by actual industry experts.',
      action: 'skill-verification',
      badge: 'Rigorous Testing'
    },
    {
      id: 'career-score',
      title: 'Career Score',
      icon: <TrendingUp size={22} color="#1E40AF" />,
      description: 'A unified metric of professional reliability, combining feedback, delivery speed, and technical quality.',
      action: 'career-score',
      badge: '91/100 Avg Top Tier'
    },
    {
      id: 'services-marketplace',
      title: 'Services Catalog',
      icon: <Layers size={22} color="#1E40AF" />,
      description: 'Fixed-price services with transparent deliverables, upfront pricing, and guaranteed delivery timelines.',
      action: 'services-marketplace',
      badge: 'Fixed-Price & Scope'
    },
    {
      id: 'smart-match',
      title: 'Smart Match',
      icon: <Sparkles size={22} color="#1E40AF" />,
      description: 'Intelligent matching that maps your project requirements to deep skill signatures for perfect alignment.',
      action: 'comparison',
      badge: '98% Alignment'
    }
  ];

  return (
    <section className="differentiators-section">
      <div className="section-header">
        <h2 className="section-title">Freelancing Built on Proof</h2>
        <p className="section-subtitle">
          We eliminate the guesswork with our data-driven verification system. Every profile is backed by actual work, peer-reviewed scores, and verified competency.
        </p>
      </div>

      <div className="differentiator-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="diff-card card-hover"
            onClick={() => navigateTo(card.action)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="diff-icon-box">
                {card.icon}
              </div>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '0.2rem 0.5rem', borderRadius: '9999px' }}>
                {card.badge}
              </span>
            </div>

            <div>
              <h3 className="diff-card-title" style={{ marginBottom: '0.4rem' }}>{card.title}</h3>
              <p className="diff-card-desc">{card.description}</p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', fontWeight: 700, color: '#1E40AF' }}>
              <span>Explore {card.title}</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
