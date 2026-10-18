
import React, { useState } from 'react';
import { Search, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';

const categories = [
  'all', 'Full-Stack Web Development', 'AI & Machine Learning',
  'Mobile App Development', 'UI/UX & Product Design', 'DevOps & Cloud Architecture'
];

const fallback = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80';

const styles = {
  filter: { background: '#fff', padding: 20, border: '1px solid #E2E8F0', borderRadius: 12, display: 'grid', gap: 14, marginBottom: 24 },
  input: { width: '100%', boxSizing: 'border-box', padding: 12, border: '1px solid #CBD5E1', borderRadius: 8 },
  categories: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))', gap: 24 },
  card: { overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  image: { width: '100%', height: 170, objectFit: 'cover' },
  body: { padding: 20, display: 'flex', flexDirection: 'column', flex: 1 },
  overlay: { position: 'fixed', inset: 0, zIndex: 100, background: '#0009', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modal: { position: 'relative', background: '#fff', padding: 28, borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' },
  avatar: { width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' },
  button: { padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }
};

export const ExploreServices = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(null);

  const services = SERVICES.filter(s =>
    (category === 'all' || s.category === category) &&
    [s.title, s.tagline, s.category].join(' ').toLowerCase().includes(search.trim().toLowerCase())
  );

  const close = () => setActive(null);

  const order = () => {
    showToast(`Order placed for "${active.title}"! Milestone escrow created.`, 'success');
    close();
  };

  return (
    <div className="dashboard-main">
      <h1 className="dashboard-title">Explore Services</h1>
      <p className="dashboard-subtitle">Browse ready-to-deliver packages from verified specialists.</p>

      <div style={styles.filter}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', top: 12, left: 12, color: '#94A3B8' }} />
          <input style={{ ...styles.input, paddingLeft: 40 }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." />
        </div>

        <div style={styles.categories}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              ...styles.button, border: '1px solid',
              background: category === c ? '#1E40AF' : '#F8FAFC',
              color: category === c ? '#fff' : '#475569',
              borderColor: category === c ? '#1E40AF' : '#E2E8F0'
            }}>
              {c === 'all' ? 'All Services' : c}
            </button>
          ))}
        </div>
      </div>

      <p>Showing {services.length} packaged services</p>

      <div style={styles.grid}>
        {services.map(s => (
          <div className="card card-hover" key={s.id} style={styles.card}>
            <div style={{ position: 'relative' }}>
              <img src={s.thumbnail || fallback} alt={s.title} style={styles.image} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }} />
              <span style={{ position: 'absolute', top: 12, left: 12, background: '#0F172ACC', color: '#fff', padding: 6, borderRadius: 16, fontSize: 11 }}>{s.category}</span>
            </div>

            <div style={styles.body}>
              {s.freelancer && (
                <p style={{ fontSize: '0.825rem', color: '#475569', marginBottom: '0.4rem' }}>
                  {s.freelancer.name} · Rating: {s.rating || 4.9} ({s.reviewsCount || 12})
                </p>
              )}

              <h3>{s.title}</h3>
              <p>{(s.tagline || 'Verified professional service package.').slice(0, 95)}{(s.tagline || '').length > 95 ? '...' : ''}</p>

              <p style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span>{s.deliveryDays || 5} days</span>
                <strong>{s.startingPrice || '$250'}</strong>
              </p>

              <button className="btn btn-primary btn-sm" onClick={() => setActive(s)}>View Details & Order</button>
            </div>
          </div>
        ))}
      </div>

      {!services.length && <p>No services found. Try another search or category.</p>}

      {active && (
        <div style={styles.overlay} onClick={close}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button onClick={close} aria-label="Close details" style={{ ...styles.button, float: 'right' }}><X /></button>

            <p>{active.category}</p>
            <h2>{active.title}</h2>

            {active.freelancer && (
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem' }}>
                Offered by {active.freelancer.name} · Rating: {active.rating || 4.9}
              </p>
            )}

            <p>{active.tagline || active.description || 'Full end-to-end delivery of the selected service.'}</p>

            {!!active.highlights?.length && (
              <>
                <h4>What's Included:</h4>
                {active.highlights.map(point => (
                  <p key={point}><CheckCircle2 size={16} color="#16A34A" /> {point}</p>
                ))}
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: 16, background: '#EFF6FF', borderRadius: 10 }}>
              <div><small>Estimated Turnaround</small><p><strong>{active.deliveryDays || 5} Business Days</strong></p></div>
              <div><small>Package Price</small><p><strong>{active.startingPrice || '$350'}</strong></p></div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button style={{ ...styles.button, flex: 1 }} onClick={close}>Close</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={order}>Order Service</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
