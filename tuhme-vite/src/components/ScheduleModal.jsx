import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ScheduleModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    address: '',
    date: '',
    time: '3:00 PM - 4:00 PM',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Get today's date in YYYY-MM-DD format for date picker min value
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 2,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Schedule Your Try-On</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Delivery Address"
            name="address"
            placeholder="Enter your Manhattan address"
            value={formData.address}
            onChange={handleChange}
          />
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ 
                  shrink: true 
                }}
                inputProps={{
                  min: today
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="time-label">Time</InputLabel>
                <Select
                  labelId="time-label"
                  id="time"
                  name="time"
                  value={formData.time}
                  label="Time"
                  onChange={handleChange}
                >
                  <MenuItem value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</MenuItem>
                  <MenuItem value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</MenuItem>
                  <MenuItem value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</MenuItem>
                  <MenuItem value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</MenuItem>
                  <MenuItem value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <TextField
            margin="normal"
            fullWidth
            id="instructions"
            label="Special Instructions (Optional)"
            name="instructions"
            multiline
            rows={2}
            value={formData.instructions}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ borderRadius: 50, px: 3 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: 50, 
            px: 3,
            fontWeight: 600
          }}
        >
          Confirm & Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal;