import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ModalHeader from "../../../ui/ModalHeader";
import BlockIcon from '@mui/icons-material/Block';

interface ModalBookUnavailableProps {
  open: boolean;
  onClose: () => void;
}

const ModalBookUnavailable: React.FC<ModalBookUnavailableProps> = ({ open, onClose }) => {
  return (
    <ModalHeader
      open={open}
      onClose={onClose}
      title="Unavailable"
      icon={<BlockIcon sx={{fontSize: 25}} />}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          This book is currently unavailable. Try again later.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3'
            }
          }}
        >
          Close
        </Button>
      </Box>
    </ModalHeader>
  );
};

export default ModalBookUnavailable;