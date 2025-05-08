import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Paper
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const ImageUploader = ({ onImagesChange, initialImages = [] }) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  
  // Initialize with initial images if provided
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      // Convert base64 strings back to images
      const reconstructedImages = initialImages.map((base64String, index) => {
        // Create a dummy file object since we can't reconstruct the original File object
        return {
          preview: base64String,
          isStored: true, // Flag to indicate this is a stored image, not a fresh upload
          id: `stored_${index}`
        };
      });
      
      setImages(reconstructedImages);
    }
  }, [initialImages.length]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length === 0) return;

    const newImages = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isStored: false
    }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    
    // Convert to base64 for sending via WhatsApp and storage
    processImagesForStorage(updatedImages);
  };
  
  // Process images for storage and sending
  const processImagesForStorage = (imageList) => {
    // Convert fresh uploads to base64, keep stored images as is
    const processPromises = imageList.map(img => {
      if (img.isStored) {
        // Already a base64 string
        return Promise.resolve(img.preview);
      } else {
        // Fresh upload, convert to base64
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(img.file);
        });
      }
    });
    
    // Notify parent component
    Promise.all(processPromises).then(results => {
      onImagesChange(results);
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    // Only revoke object URL if it's a fresh upload
    if (!updatedImages[index].isStored) {
      URL.revokeObjectURL(updatedImages[index].preview);
    }
    
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    
    // Update storage with remaining images
    if (updatedImages.length === 0) {
      onImagesChange([]);
    } else {
      processImagesForStorage(updatedImages);
    }
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
        Upload Images of Items You Want
      </Typography>
      
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={4} sm={3} key={index}>
            <Paper 
              elevation={2} 
              sx={{ 
                position: 'relative',
                height: 100,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  p: '4px',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.7)',
                  }
                }}
                onClick={() => removeImage(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <img
                src={image.preview}
                alt={`Upload ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Paper>
          </Grid>
        ))}
        
        <Grid item xs={4} sm={3}>
          <Paper
            elevation={1}
            sx={{
              height: 100,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              bgcolor: 'rgba(0,0,0,0.03)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.05)',
              }
            }}
            onClick={handleAddClick}
          >
            <AddIcon sx={{ fontSize: 24, color: 'text.secondary', mb: 1 }} />
            <Typography variant="caption" color="text.secondary">
              Add Image
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {images.length === 0 && (
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={handleAddClick}
          sx={{ 
            mt: 2,
            borderRadius: 50,
            borderStyle: 'dashed'
          }}
        >
          Upload Images
        </Button>
      )}
    </Box>
  );
};

export default ImageUploader;