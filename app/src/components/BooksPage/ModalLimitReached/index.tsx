import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ModalHeader from "../../../ui/ModalHeader";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

interface ModalLimitReachedProps {
  open: boolean;
  onClose: () => void;
}

const ModalLimitReached: React.FC<ModalLimitReachedProps> = ({ open, onClose }) => {
  
  const handleViewMyBooks = () => {
    console.log("Redirecting to my books...");
    onClose();
  };

  return (
    <ModalHeader
      open={open}
      onClose={onClose}
      title="Limit Reached"
      icon={<ProductionQuantityLimitsIcon sx={{fontSize: 25}} />}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          You've reached your borrowing limit. Return a book to borrow more.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={handleViewMyBooks}
          sx={{
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3'
            }
          }}
        >
          View My Books
        </Button>
      </Box>
    </ModalHeader>
  );
};

export default ModalLimitReached;