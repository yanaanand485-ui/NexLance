import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus } from 'lucide-react';

export const FreelancerServices = () => {
  const {
    freelancerProfile,
    openAddServiceModal,
    openEditServiceModal,
    deleteFreelancerService
  } = useApp();

  const services = freelancerProfile?.services || [];

  return (
    <div className="dashboard-main" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>
            My Services
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#64748B', margin: 0 }}>
            Manage the services you offer to clients.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddServiceModal}
          className="btn btn-primary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Services Grid or Empty State */}
      {services.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {service.category || 'General'}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>
                    {service.deliveryTime || (service.deliveryDays ? `${service.deliveryDays} Days` : '5 Days')}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.4rem 0' }}>
                  {service.title}
                </h3>

                <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                  {service.description || service.tagline || 'Standard fixed deliverable package.'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
                  {service.price || service.startingPrice || '$300'}
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => openEditServiceModal(service)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteFreelancerService(service.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', padding: '0.25rem 0.4rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '3rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            No Services Added Yet
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '400px', margin: '0 auto 1.25rem auto' }}>
            You haven't added any services yet. Click below to add your first service.
          </p>
          <button
            type="button"
            onClick={openAddServiceModal}
            className="btn btn-primary btn-sm"
          >
            + Add Your Service
          </button>
        </div>
      )}
    </div>
  );
};
