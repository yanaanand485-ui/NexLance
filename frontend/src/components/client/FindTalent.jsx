import React, { useState, useEffect } from 'react';
import { Search, X, Mail, Phone, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifiedSkillBadge, CareerScoreBadge } from './ClientBadge';
import { DUMMY_JSON_USERS_URL, transformDummyUser } from '../../services/dummyJsonApi';

const skills = ['all', 'React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Python', 'DevOps'];

const styles = {
  filter: { display: 'grid', gap: 16, padding: 20, marginBottom: 24, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12 },
  search: { display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: '1px solid #CBD5E1', borderRadius: 8 },
  input: { flex: 1, minWidth: 0, border: 0, outline: 0 },
  row: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 24 },
  card: { padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16, border: '1px solid #E2E8F0', borderRadius: 12, backgroundColor: '#FFFFFF' },
  muted: { color: '#64748B', fontSize: 13 },
  overlay: { position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16, background: '#0F172A99' },
  modal: { position: 'relative', background: '#fff', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', padding: 28, borderRadius: 16 },
  button: { padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }
};

export const FindTalent = () => {
  const { showToast } = useApp();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('all');
  const [minScore, setMinScore] = useState(70);
  const [active, setActive] = useState(null);

  // Fetch users via fetch().then().catch().finally() - strictly no async/await
  const fetchUsers = () => {
    fetch(DUMMY_JSON_USERS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers((data.users || []).map(transformDummyUser));
      })
      .catch((err) => {
        console.error('Error fetching talent:', err);
        setError('Failed to load talent data. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || [
      u.name,
      u.email,
      u.title,
      u.company,
      ...(u.topSkills ? u.topSkills.map((s) => s.name) : [])
    ].some((val) => val && val.toLowerCase().includes(q));

    const matchesSkill = skill === 'all' || (u.topSkills && u.topSkills.some((s) => s.name.toLowerCase().includes(skill.toLowerCase())));
    const matchesScore = (u.careerScore || 0) >= minScore;

    return matchesSearch && matchesSkill && matchesScore;
  });

  const contact = () => {
    if (!active) return;
    showToast(`Direct message sent to ${active.name}!`, 'success');
    setActive(null);
  };

  const renderSkills = (f) => (f.topSkills || []).map((s) => (
    <VerifiedSkillBadge key={s.name} skill={s.name} score={s.score} />
  ));

  return (
    <div className="dashboard-main">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="dashboard-title">Find Talent</h1>
        <p className="dashboard-subtitle">
          Find skilled freelancers with verified scores and proven experience.
        </p>
      </div>

      {/* Search & Filters */}
      <div style={styles.filter}>
        <div style={styles.search}>
          <Search size={18} color="#94A3B8" />
          <input
            style={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, email or skill..."
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              aria-label="Clear search"
            >
              <X size={16} color="#94A3B8" />
            </button>
          )}
        </div>

        <div style={styles.row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label htmlFor="min-score-select" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Minimum Career Score:</label>
            <select
              id="min-score-select"
              value={minScore}
              onChange={(e) => setMinScore(+e.target.value)}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #CBD5E1' }}
            >
              {[70, 75, 80, 85, 90].map((n) => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.row}>
          <strong style={{ fontSize: '0.875rem' }}>Popular Skills:</strong>
          {skills.map((s) => (
            <button
              key={s}
              style={{
                ...styles.button,
                fontSize: '0.8rem',
                background: skill === s ? '#1E40AF' : '#F8FAFC',
                color: skill === s ? '#fff' : '#475569',
                border: `1px solid ${skill === s ? '#1E40AF' : '#E2E8F0'}`
              }}
              onClick={() => setSkill(s)}
            >
              {s === 'all' ? 'All Skills' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ ...styles.muted, fontSize: '0.95rem' }}>Loading talent...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div style={{ padding: '1.5rem', backgroundColor: '#FEF2F2', borderRadius: 8, textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: '#B91C1C', fontSize: '0.9rem', margin: '0 0 0.75rem 0' }}>{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchUsers();
            }}
            className="btn btn-secondary btn-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Count */}
      {!loading && !error && (
        <p style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600, marginBottom: '1rem' }}>
          Showing {filteredUsers.length} Verified Freelancers
        </p>
      )}

      {/* Freelancers Grid */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div style={styles.grid}>
          {filteredUsers.map((f) => (
            <div className="card card-hover" key={f.id} style={styles.card}>
              <div>
                <div style={{ marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {f.name}
                  </h3>
                  <p style={{ ...styles.muted, margin: '2px 0 3px 0' }}>{f.title}</p>
                  {f.company && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, ...styles.muted, fontSize: 12 }}>
                      <Building size={12} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.company}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email */}
                {f.email && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 10px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: 6,
                    marginBottom: 12,
                    fontSize: '0.8rem',
                    color: '#2563EB'
                  }}>
                    <Mail size={13} color="#64748B" />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.email}
                    </span>
                  </div>
                )}

                {/* Score & Rate */}
                <div style={{ ...styles.row, marginBottom: 12 }}>
                  <CareerScoreBadge score={f.careerScore} />
                  <strong>${f.rawRate}/hr</strong>
                  <span style={styles.muted}>★ {f.rating} ({f.totalReviews})</span>
                </div>

                <p style={{ ...styles.muted, margin: '0 0 12px 0', lineHeight: 1.4 }}>
                  {f.bio}
                </p>

                {/* Skills */}
                <div style={styles.row}>
                  {(f.topSkills || []).slice(0, 3).map((s) => (
                    <VerifiedSkillBadge key={s.name} skill={s.name} score={s.score} />
                  ))}
                </div>
              </div>

              <div style={{ width: '100%', marginTop: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActive(f)}
                  style={{ width: '100%' }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredUsers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: '0.95rem', color: '#64748B', margin: '0 0 1rem 0' }}>
            No freelancers found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSkill('all');
              setMinScore(70);
            }}
            className="btn btn-outline btn-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Modal */}
      {active && (
        <div style={styles.overlay} onClick={() => setActive(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              style={{ ...styles.button, float: 'right', border: 'none', background: 'transparent' }}
              aria-label="Close profile"
              onClick={() => setActive(null)}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
                {active.name}
              </h2>
              <p style={{ ...styles.muted, margin: '0 0 6px 0' }}>
                {active.title} {active.company ? `• ${active.company}` : ''}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <CareerScoreBadge score={active.careerScore} />
                <strong>${active.rawRate}/hour</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 16, fontSize: '0.85rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Mail size={14} color="#64748B" />
                <span>{active.email}</span>
              </div>
              {active.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={14} color="#64748B" />
                  <span>{active.phone}</span>
                </div>
              )}
              <div>
                <span style={{ fontWeight: 600 }}>Location:</span> {active.location}
              </div>
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '14px 0 6px 0' }}>About</h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              {active.bio}
            </p>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '16px 0 8px 0' }}>
              Verified Skill Assessments
            </h3>
            <div style={styles.row}>
              {renderSkills(active)}
            </div>

            <div style={{ marginTop: 24 }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={contact}>
                Hire / Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
