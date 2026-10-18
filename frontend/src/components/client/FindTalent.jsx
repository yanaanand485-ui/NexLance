
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { VerifiedSkillBadge, CareerScoreBadge } from './ClientBadge';

const skills = ['all', 'React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Python', 'DevOps'];

const styles = {
  filter: { display: 'grid', gap: 16, padding: 20, marginBottom: 24, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12 },
  search: { display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: '1px solid #CBD5E1', borderRadius: 8 },
  input: { flex: 1, minWidth: 0, border: 0, outline: 0 },
  row: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: 24 },
  card: { padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 },
  avatar: { width: 56, height: 56, borderRadius: 12, objectFit: 'cover' },
  muted: { color: '#64748B', fontSize: 13 },
  overlay: { position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16, background: '#0F172A99' },
  modal: { position: 'relative', background: '#fff', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', padding: 28, borderRadius: 16 },
  button: { padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }
};

export const FindTalent = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('all');
  const [minScore, setMinScore] = useState(80);
  const [active, setActive] = useState(null);

  const freelancers = FREELANCERS.filter(f =>
    [f.name, f.title, ...f.topSkills.map(s => s.name)].some(v => v.toLowerCase().includes(search.trim().toLowerCase())) &&
    (skill === 'all' || f.topSkills.some(s => s.name.toLowerCase().includes(skill.toLowerCase()))) &&
    f.careerScore >= minScore
  );

  const contact = () => {
    showToast(`Direct message sent to ${active.name}!`, 'success');
    setActive(null);
  };

  const renderSkills = f => f.topSkills.map(s => (
    <VerifiedSkillBadge key={s.name} skill={s.name} score={s.score} />
  ));

  const actions = f => (
    <div style={{ width: '100%', marginTop: '0.5rem' }}>
      <button className="btn btn-secondary btn-sm" onClick={() => setActive(f)} style={{ width: '100%' }}>
        View Profile
      </button>
    </div>
  );

  return (
    <div className="dashboard-main">
      <h1 className="dashboard-title">Find Talent</h1>
      <p className="dashboard-subtitle">Find skilled freelancers with verified scores and proven experience.</p>

      <div style={styles.filter}>
        <div style={styles.search}>
          <Search size={18} color="#94A3B8" />
          <input style={styles.input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role or skill..." />
        </div>

        <div style={styles.row}>
          <label>Minimum Career Score:</label>
          <select value={minScore} onChange={e => setMinScore(+e.target.value)}>
            {[70, 80, 85, 90].map(n => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>

        <div style={styles.row}>
          <strong>Popular Skills:</strong>
          {skills.map(s => (
            <button key={s} style={{ ...styles.button, background: skill === s ? '#1E40AF' : '#F8FAFC', color: skill === s ? '#fff' : '#475569', border: `1px solid ${skill === s ? '#1E40AF' : '#E2E8F0'}` }} onClick={() => setSkill(s)}>
              {s === 'all' ? 'All Skills' : s}
            </button>
          ))}
        </div>
      </div>

      <p>Showing {freelancers.length} Verified Freelancers</p>

      <div style={styles.grid}>
        {freelancers.map(f => (
          <div className="card card-hover" key={f.id} style={styles.card}>
            <div>
              <div style={{ marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>{f.name}</h3>
                <p style={{ ...styles.muted, margin: '2px 0 4px 0' }}>{f.title}</p>
                <span style={styles.muted}>{f.location || 'Remote'}</span>
              </div>

              <div style={styles.row}>
                <CareerScoreBadge score={f.careerScore} />
                <strong>${f.rawRate || 65}/hr</strong>
                <span>Rating: {f.rating || 4.9} ({f.totalReviews || 18})</span>
              </div>

              <p style={styles.muted}>{f.bio ? f.bio.slice(0, 110) + (f.bio.length > 110 ? '...' : '') : 'Specialized in building modern applications.'}</p>
              <div style={styles.row}>{f.topSkills.slice(0, 4).map(s => <VerifiedSkillBadge key={s.name} skill={s.name} score={s.score} />)}</div>
            </div>
            {actions(f)}
          </div>
        ))}
      </div>

      {!freelancers.length && <p style={{ textAlign: 'center', padding: 32 }}>No freelancers found. Try changing your filters.</p>}

      {active && (
        <div style={styles.overlay} onClick={() => setActive(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={{ ...styles.button, float: 'right' }} aria-label="Close profile" onClick={() => setActive(null)}><X /></button>

            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>{active.name}</h2>
              <p style={{ ...styles.muted, margin: '0 0 8px 0' }}>{active.title}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CareerScoreBadge score={active.careerScore} />
                <strong> ${active.rawRate || 65}/hour</strong>
              </div>
            </div>

            <h3>About</h3>
            <p>{active.bio || active.overview || 'Expert software professional with a strong project track record.'}</p>
            <h3>Verified Skill Assessments</h3>
            <div style={styles.row}>{renderSkills(active)}</div>

            <div style={{ marginTop: 24 }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={contact}>Hire / Contact</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
