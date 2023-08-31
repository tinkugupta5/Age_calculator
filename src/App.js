import React, { useState } from 'react';
import { Button } from '@mui/material';
import FormComponent from './Components/FormComponent';
import ModalForm from './Components/ModalForm'; 

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleFormSubmitSuccess = () => {
    handleCloseModal(); 
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Open Form</Button>
      <ModalForm open={modalOpen} onClose={handleCloseModal}>
      <FormComponent onSubmitSuccess={handleFormSubmitSuccess} />
      </ModalForm>
    </div>
  );
};

export default App;
