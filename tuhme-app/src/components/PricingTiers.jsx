import PricingWidget from './PricingWidget';
import ProcessWidget from './ProcessWidget';
import FAQWidget from './FAQWidget';

const PricingTiers = () => {

  return (
    <section className="pricing-tiers luxury-section">
      <PricingWidget />
      <ProcessWidget />
      <FAQWidget />
    </section>
  );
};

export default PricingTiers;