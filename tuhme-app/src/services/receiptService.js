import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

export const generateReceipt = async (orderData, paymentData) => {
  try {
    const receipt = {
      orderId: orderData.id,
      customerInfo: {
        phone: orderData.delivery?.phone || orderData.pickup?.phone,
        address: orderData.delivery?.address,
        borough: orderData.delivery?.borough
      },
      serviceDetails: {
        serviceType: orderData.serviceType,
        alterations: orderData.tailoring?.alterations || [],
        specialRequests: orderData.tailoring?.specialRequests || ''
      },
      paymentInfo: {
        amount: paymentData.amount,
        method: 'Square Card Reader',
        transactionId: paymentData.transactionId,
        lastFourDigits: paymentData.lastFourDigits,
        cardBrand: paymentData.cardBrand,
        processingFee: paymentData.processingFee || 0
      },
      receiptNumber: generateReceiptNumber(),
      generatedAt: serverTimestamp(),
      deliveredAt: serverTimestamp(),
      businessInfo: {
        name: 'TUHME',
        address: 'Manhattan & Brooklyn, NY',
        phone: '+1 (555) TUHME-01',
        email: 'hello@tuhme.com'
      }
    };

    const docRef = await addDoc(collection(db, 'receipts'), receipt);
    return { id: docRef.id, ...receipt };
  } catch (error) {
    console.error('Error generating receipt:', error);
    throw error;
  }
};

export const sendReceiptViaWhatsApp = (receipt) => {
  const message = formatReceiptMessage(receipt);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${receipt.customerInfo.phone.replace(/\D/g, '')}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

export const markOrderAsDelivered = async (orderId, receiptData) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: 'delivered',
      deliveredAt: serverTimestamp(),
      receiptId: receiptData.id,
      paymentConfirmed: true,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error marking order as delivered:', error);
    throw error;
  }
};

const generateReceiptNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `TU${year}${month}${day}${random}`;
};

const formatReceiptMessage = (receipt) => {
  const formatCurrency = (amount) => `$${(amount / 100).toFixed(2)}`;
  
  let message = `🧾 TUHME Digital Receipt\n\n`;
  message += `Receipt #: ${receipt.receiptNumber}\n`;
  message += `Order #: ${receipt.orderId.slice(-8).toUpperCase()}\n`;
  message += `Date: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}\n\n`;
  
  message += `📍 Service Details:\n`;
  message += `Service: ${receipt.serviceDetails.serviceType === 'pickup' ? 'Pickup & Tailoring' : 'Sourcing & Delivery'}\n`;
  
  if (receipt.serviceDetails.alterations.length > 0) {
    message += `Alterations:\n`;
    receipt.serviceDetails.alterations.forEach(alteration => {
      message += `• ${alteration}\n`;
    });
  }
  
  if (receipt.serviceDetails.specialRequests) {
    message += `Special Requests: ${receipt.serviceDetails.specialRequests}\n`;
  }
  
  message += `\n💳 Payment Details:\n`;
  message += `Amount: ${formatCurrency(receipt.paymentInfo.amount)}\n`;
  message += `Method: ${receipt.paymentInfo.method}\n`;
  message += `Card: ${receipt.paymentInfo.cardBrand} ****${receipt.paymentInfo.lastFourDigits}\n`;
  message += `Transaction ID: ${receipt.paymentInfo.transactionId}\n`;
  
  if (receipt.paymentInfo.processingFee > 0) {
    message += `Processing Fee: ${formatCurrency(receipt.paymentInfo.processingFee)}\n`;
  }
  
  message += `\n📞 Contact:\n`;
  message += `${receipt.businessInfo.name}\n`;
  message += `${receipt.businessInfo.phone}\n`;
  message += `${receipt.businessInfo.email}\n\n`;
  
  message += `Thank you for choosing TUHME! 🙏\n`;
  message += `For any questions about this order, please reply to this message.`;
  
  return message;
};

export const generateDigitalReceiptHTML = (receipt) => {
  const formatCurrency = (amount) => `$${(amount / 100).toFixed(2)}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>TUHME Receipt #${receipt.receiptNumber}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
          background: #f5f5f5;
        }
        .receipt {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #d4af37;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 2.5rem;
          font-weight: bold;
          color: #d4af37;
          letter-spacing: 0.3em;
          margin-bottom: 10px;
        }
        .tagline {
          color: #666;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .receipt-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .label {
          color: #666;
        }
        .value {
          color: #333;
          font-weight: 500;
        }
        .amount {
          font-size: 1.2rem;
          font-weight: bold;
          color: #d4af37;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 0.9rem;
        }
        ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 3px;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">TUHME</div>
          <div class="tagline">Premium Clothing Delivery & Tailoring</div>
        </div>
        
        <div class="receipt-info">
          <div>
            <div class="section-title">Receipt Information</div>
            <div class="detail-row">
              <span class="label">Receipt #:</span>
              <span class="value">${receipt.receiptNumber}</span>
            </div>
            <div class="detail-row">
              <span class="label">Order #:</span>
              <span class="value">${receipt.orderId.slice(-8).toUpperCase()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          <div>
            <div class="section-title">Customer Information</div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">${receipt.customerInfo.phone}</span>
            </div>
            <div class="detail-row">
              <span class="label">Address:</span>
              <span class="value">${receipt.customerInfo.address}</span>
            </div>
            <div class="detail-row">
              <span class="label">Borough:</span>
              <span class="value">${receipt.customerInfo.borough}</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Service Details</div>
          <div class="detail-row">
            <span class="label">Service Type:</span>
            <span class="value">${receipt.serviceDetails.serviceType === 'pickup' ? 'Pickup & Tailoring' : 'Sourcing & Delivery'}</span>
          </div>
          ${receipt.serviceDetails.alterations.length > 0 ? `
            <div class="detail-row">
              <span class="label">Alterations:</span>
              <div>
                <ul>
                  ${receipt.serviceDetails.alterations.map(alt => `<li>${alt}</li>`).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
          ${receipt.serviceDetails.specialRequests ? `
            <div class="detail-row">
              <span class="label">Special Requests:</span>
              <span class="value">${receipt.serviceDetails.specialRequests}</span>
            </div>
          ` : ''}
        </div>
        
        <div class="section">
          <div class="section-title">Payment Details</div>
          <div class="detail-row">
            <span class="label">Payment Method:</span>
            <span class="value">${receipt.paymentInfo.method}</span>
          </div>
          <div class="detail-row">
            <span class="label">Card:</span>
            <span class="value">${receipt.paymentInfo.cardBrand} ****${receipt.paymentInfo.lastFourDigits}</span>
          </div>
          <div class="detail-row">
            <span class="label">Transaction ID:</span>
            <span class="value">${receipt.paymentInfo.transactionId}</span>
          </div>
          ${receipt.paymentInfo.processingFee > 0 ? `
            <div class="detail-row">
              <span class="label">Processing Fee:</span>
              <span class="value">${formatCurrency(receipt.paymentInfo.processingFee)}</span>
            </div>
          ` : ''}
          <div class="detail-row" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
            <span class="label" style="font-size: 1.1rem;">Total Amount:</span>
            <span class="amount">${formatCurrency(receipt.paymentInfo.amount)}</span>
          </div>
        </div>
        
        <div class="footer">
          <div style="margin-bottom: 10px;">
            <strong>TUHME</strong><br>
            Manhattan & Brooklyn, NY<br>
            ${receipt.businessInfo.phone} • ${receipt.businessInfo.email}
          </div>
          <div style="font-size: 0.8rem; color: #999;">
            Thank you for choosing TUHME!<br>
            For questions about this receipt, please contact us using the information above.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};