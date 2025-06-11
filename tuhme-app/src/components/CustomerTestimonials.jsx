import { useState, useEffect } from 'react';

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Sample testimonials with realistic human avatars
  const testimonials = [
    {
      id: 2,
      name: "Marcus Johnson",
      location: "Tribeca",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      text: "The convenience is unmatched. Same-day delivery from multiple boutiques, and their stylists really understand luxury fashion.",
      service: "Personal Shopping"
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "SoHo",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      text: "I discovered brands I never knew existed. TUHME's curation is impeccable - they bring the entire luxury ecosystem to your doorstep.",
      service: "Brand Discovery"
    },
    {
      id: 4,
      name: "Arjun Patel",
      location: "Brooklyn Heights",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      text: "Worth every penny. The time I save plus the access to exclusive pieces makes this service invaluable for busy professionals.",
      service: "Express Service"
    },
    {
      id: 5,
      name: "Zara Williams",
      location: "Chelsea",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      text: "The styling advice is phenomenal. They helped me build a capsule wardrobe with pieces from Loro Piana and The Row.",
      service: "Style Consultation"
    },
    {
      id: 6,
      name: "Damon Carter",
      location: "Financial District",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      text: "Finally, a service that understands luxury menswear. From Tom Ford suits to casual Brunello Cucinelli - they get it right.",
      service: "Menswear Specialist"
    },
    {
      id: 7,
      name: "Kavya Reddy",
      location: "Midtown East",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      text: "As a finance professional, I appreciate efficiency. TUHME delivers premium quality with unmatched convenience - exactly what I need.",
      service: "Professional Wardrobe"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <p className="testimonials-subtitle">
            Join thousands of satisfied customers who've discovered luxury shopping reimagined
          </p>
        </div>

        <div className="testimonials-carousel">
          <button className="testimonial-nav prev" onClick={prevTestimonial}>‹</button>
          
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => {
              const position = index - currentTestimonial;
              const isActive = position === 0;
              const isNext = position === 1 || position === -(testimonials.length - 1);
              const isPrev = position === -1 || position === (testimonials.length - 1);
              
              return (
                <div
                  key={testimonial.id}
                  className={`testimonial-card ${isActive ? 'active' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''}`}
                  style={{
                    transform: `translateX(${position * 100}%) scale(${isActive ? 1 : 0.8})`,
                    opacity: isActive ? 1 : 0.6,
                    zIndex: isActive ? 10 : 1
                  }}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="testimonial-text">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-location">{testimonial.location}</p>
                        <span className="service-type">{testimonial.service}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="testimonial-nav next" onClick={nextTestimonial}>›</button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Customer Satisfaction</span>
          </div>
          <div className="stat">
            <span className="stat-number">$2.3M+</span>
            <span className="stat-label">In Luxury Goods Delivered</span>
          </div>
          <div className="stat">
            <span className="stat-number">24hr</span>
            <span className="stat-label">Average Delivery Time</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;