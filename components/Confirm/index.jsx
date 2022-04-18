import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Store } from '../../utils/Store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function Confirm({ btnText, msgText, onApprove }) {
  const [open, setOpen] = useState(false),
    handleOpen = () => setOpen(true),
    handleClose = () => setOpen(false);

  const { state: { lang } } = useContext(Store)

  const Text = {
    en: {
      yes: "yes",
      no: "no"
    },
    he: {
      yes: "yes",
      no: "no"
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>{btnText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {msgText}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "1rem 0" }}>
            <Button variant='contained' color='warning' onClick={onApprove}>{Text[lang]["yes"]}</Button>
            <Button variant='contained' onClick={handleClose}>{Text[lang]["no"]}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}