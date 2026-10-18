import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  'Web Development',
  'Frontend Engineering',
  'Backend Development',
  'Mobile App Development',
  'UI/UX Design',
  'Consulting'
];

export const ServiceModal = () => {
  const {
    isServiceModalOpen,
    closeServiceModal,
    serviceModalMode,
    selectedServiceToEdit,
    addFreelancerService,
    updateFreelancerService,
    showToast
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('$300');
  const [deliveryTime, setDeliveryTime] = useState('5 Days');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isServiceModalOpen) {
      if (serviceModalMode === 'edit' && selectedServiceToEdit) {
        setTitle(selectedServiceToEdit.title || '');
        setCategory(selectedServiceToEdit.category || CATEGORIES[0]);
        setPrice(selectedServiceToEdit.price || selectedServiceToEdit.startingPrice || '$300');
        setDeliveryTime(selectedServiceToEdit.deliveryTime || (selectedServiceToEdit.deliveryDays ? `${selectedServiceToEdit.deliveryDays} Days` : '5 Days'));
        setDescription(selectedServiceToEdit.description || selectedServiceToEdit.tagline || '');
      } else {
        setTitle('');
        setCategory(CATEGORIES[0]);
        setPrice('$300');
        setDeliveryTime('5 Days');
        setDescription('');
      }
    }
  }, [isServiceModalOpen, serviceModalMode, selectedServiceToEdit]);

  if (!isServiceModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a service title', 'warning');
      return;
    }

    const serviceData = {
      title: title.trim(),
      category,
      price: price.trim() || '$300',
      startingPrice: price.trim() || '$300',
      deliveryTime: deliveryTime.trim() || '5 Days',
      deliveryDays: parseInt(deliveryTime) || 5,
      description: description.trim()
    };

    if (serviceModalMode === 'edit' && selectedServiceToEdit) {
      updateFreelancerService(selectedServiceToEdit.id, serviceData);
    } else {
      addFreelancerService(serviceData);
    }
    closeServiceModal();
  };

  return (
    <div className="modal-backdrop" onClick={closeServiceModal} style={{ zIndex: 1060 }}>
      <div
        className="modal-card"
        style={{
          maxWidth: '480px',
          width: '90%',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            {serviceModalMode === 'edit' ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button
            type="button"
            onClick={closeServiceModal}
            style={{ background: 'none', border: 'none', fontSize: '1.3rem', color: '#64748B', cursor: 'pointer', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Service Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Full-Stack Web App Development"
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
              required
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price & Delivery Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. ₹25,000 ($300)"
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Delivery Time
              </label>
              <input
                type="text"
                value={deliveryTime}
                onChange={e => setDeliveryTime(e.target.value)}
                placeholder="e.g. 5 Days"
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Briefly describe what you will deliver in this service..."
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={closeServiceModal}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ minWidth: '100px' }}
            >
              {serviceModalMode === 'edit' ? 'Save' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
