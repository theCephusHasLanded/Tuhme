import { useState } from 'react';

const ImageUpload = ({ onNext, onPrev, onDataUpdate, data, serviceType }) => {
  const [imagePreview, setImagePreview] = useState(data.imageUrl || '');
  const [imageUrl, setImageUrl] = useState(data.imageUrl || '');
  const [uploadedFile, setUploadedFile] = useState(data.image || null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        onDataUpdate({ image: file, imageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlInput = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
      onDataUpdate({ imageUrl: url, image: null });
    }
  };

  const handleNext = () => {
    if (imagePreview) {
      onNext();
    }
  };

  const getTitle = () => {
    return serviceType === 'pickup' ? 'Item Details' : 'Item You Want Sourced';
  };

  const getDescription = () => {
    return serviceType === 'pickup' 
      ? 'Upload images of items you want tailored or reference photos for alterations'
      : 'Upload images or provide links to items you want us to source and deliver';
  };

  return (
    <div className="image-upload-section">
      <h2>{getTitle()}</h2>
      <p className="section-description">
        {getDescription()}
      </p>

      <div className="upload-options">
        <div className="upload-method">
          <h3>Upload Image</h3>
          <div className="upload-tips">
            <p>{serviceType === 'pickup' ? 'Photos of your current items' : 'Screenshots from websites'}</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            Choose File
          </label>
        </div>

        <div className="url-method">
          <h3>Or provide a link</h3>
          <div className="upload-tips">
            <p>{serviceType === 'pickup' ? 'Reference images from Pinterest/Instagram' : 'Direct product links from stores'}</p>
          </div>
          <input
            type="url"
            placeholder={serviceType === 'pickup' ? 'https://pinterest.com/pin/...' : 'https://store.com/product/...'}
            value={imageUrl}
            onChange={handleUrlInput}
            className="url-input"
          />
        </div>
      </div>

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Selected item" />
          <p className="preview-label">
            {serviceType === 'pickup' ? 'Item to be tailored' : 'Item to be sourced'}
          </p>
        </div>
      )}

      {serviceType === 'sourcing' && (
        <div className="sourcing-info">
          <h3>What happens next?</h3>
          <ul>
            <li>We'll source the exact item or closest match</li>
            <li>Authenticate luxury pieces for quality assurance</li>
            <li>Include custom tailoring if needed</li>
            <li>Deliver to your specified address</li>
          </ul>
        </div>
      )}

      <div className="form-navigation">
        <button className="prev-button" onClick={onPrev}>
          Back
        </button>
        <button 
          className="next-button"
          onClick={handleNext}
          disabled={!imagePreview}
        >
          Continue to Tailoring
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;