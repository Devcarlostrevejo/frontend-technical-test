import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ModalHeader from "../../../ui/ModalHeader";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

interface ModalAccountSuspendedProps {
  open: boolean;
  onClose: () => void;
}

const ModalAccountSuspended: React.FC<ModalAccountSuspendedProps> = ({ open, onClose }) => {

  const handleContactSupport = () => {
    console.log("Redirecting to support...");
    onClose();
  };

  return (
    <ModalHeader
      open={open}
      onClose={onClose}
      title="Account Suspended"
      icon={<NoAccountsIcon sx={{ fontSize: 25 }} />}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Your account is suspended. Contact support to resolve this issue.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={handleContactSupport}
          sx={{
            backgroundColor: '#007bff',
            '&:hover': {
              backgroundColor: '#0056b3'
            }
          }}
        >
          Contact Support
        </Button>
      </Box>
    </ModalHeader>
  );
};

export default ModalAccountSuspended;