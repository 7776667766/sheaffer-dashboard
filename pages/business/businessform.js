import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const BusinessForm = ({ open, onClose , businessData}) => {
    console.log("BusinessData",businessData)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rename Business</DialogTitle>
      <DialogContent>
        <p>Form fields go here...</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BusinessForm;