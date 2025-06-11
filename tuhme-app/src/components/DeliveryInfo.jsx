import DeliveryWidget from './DeliveryWidget';
import FAQWidget from './FAQWidget';

const DeliveryInfo = () => {
  return (
    <section className="delivery-info">
      <DeliveryWidget />
      <FAQWidget 
        title="Delivery FAQ"
        variant="delivery"
      />
    </section>
  );
};

export default DeliveryInfo;