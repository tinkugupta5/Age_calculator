import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

const ModalForm = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
