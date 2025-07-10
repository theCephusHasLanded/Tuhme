import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const InteractiveInfoSection = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const tabData = [
    {
      id: 'questions',
      title: 'Common Questions',
      icon: 'secure',
      items: [
        {
          id: 'fit',
          title: 'What if items don\'t fit?',
          content: 'No problem! We return anything you don\'t want directly to the store. You only pay for what you keep.',
          icon: 'fit'
        },
        {
          id: 'payment',
          title: 'What payment methods do you accept?',
          content: 'We use Square Reader for secure payments: chip cards, contactless cards, Apple Pay, and Google Pay.',
          icon: 'payment'
        },
        {
          id: 'any-store',
          title: 'Can I order from any store?',
          content: 'Yes! Any local store in Manhattan or Brooklyn, even if they\'re not on our partner list.',
          icon: 'shopping'
        }
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery Options',
      icon: 'delivery',
      items: [
        {
          id: 'same-day',
          title: 'Same-Day Delivery',
          content: 'Orders placed before 12:00 PM are delivered the same day. Perfect for last-minute needs.',
          badge: 'Most Popular',
          icon: 'express'
        },
        {
          id: 'next-day',
          title: 'Next-Day Delivery',
          content: 'Orders placed after 12:00 PM arrive the next business day. Reliable and convenient.',
          icon: 'time'
        },
        {
          id: 'weekend',
          title: 'Weekend Delivery',
          content: 'Available Saturday & Sunday when stores are open. Great for weekend styling sessions.',
          icon: 'weekend'
        },
        {
          id: 'express',
          title: 'Express Service',
          content: 'Rush delivery in 2-4 hours for urgent needs. Additional fees apply.',
          badge: 'Premium',
          icon: 'professional'
        }
      ]
    },
    {
      id: 'areas',
      title: 'Service Areas',
      icon: 'globe',
      items: [
        {
          id: 'manhattan',
          title: 'Manhattan - Complete Coverage',
          content: 'All neighborhoods including Upper East Side, Upper West Side, Midtown, Lower Manhattan, Chelsea, Village, and more.',
          badge: 'Full Coverage',
          icon: 'home'
        },
        {
          id: 'brooklyn',
          title: 'Brooklyn - Select Areas',
          content: 'Williamsburg, DUMBO, Brooklyn Heights, Park Slope, Fort Greene, and expanding to new neighborhoods.',
          badge: 'Growing',
          icon: 'shopping'
        }
      ]
    }
  ];

  return (
    <section className="interactive-info-section">
      <div className="info-container">
        <div className="section-header">
          <h2>Everything You Need to Know</h2>
          <p>Quick answers to help you get started with TUHME</p>
        </div>
        
        <div className="info-tabs-container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveDropdown(null);
                }}
              >
                <TuhmeIcon type={tab.icon} size={20} />
                <span>{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {tabData.map((tab) => (
              <div
                key={tab.id}
                className={`tab-panel ${activeTab === tab.id ? 'active' : ''}`}
              >
                <div className="dropdown-items">
                  {tab.items.map((item) => (
                    <div key={item.id} className="dropdown-item">
                      <button
                        className={`dropdown-trigger ${activeDropdown === item.id ? 'active' : ''}`}
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <div className="trigger-content">
                          <div className="trigger-icon">
                            <TuhmeIcon type={item.icon} size={18} />
                          </div>
                          <div className="trigger-text">
                            <span className="trigger-title">{item.title}</span>
                            {item.badge && (
                              <span className="trigger-badge">{item.badge}</span>
                            )}
                          </div>
                        </div>
                        <div className={`expand-arrow ${activeDropdown === item.id ? 'rotated' : ''}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path 
                              d="M6 9l6 6 6-6" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                      
                      <div className={`dropdown-content ${activeDropdown === item.id ? 'expanded' : ''}`}>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveInfoSection;