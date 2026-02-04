import React from "react";
import { Dialog, DialogContent, IconButton, Box, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/Close";

interface ModalHeaderProps {
  open?: boolean;
  onClose?: () => void;
  title: string;
  width?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  open = true,
  onClose,
  width = '510px',
  title,
  icon,
  children
}) => {

  const iconContainerStyles = {
    width: 60,
    height: 60,
    backgroundColor: "blue",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  };

  const headerStyles = {
    flex: 1,
    height: 60,
    backgroundColor: "blue",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 2,
    paddingRight: 2
  };

  const paperStyles = {
    width: width,
    borderRadius: 1.5
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: paperStyles }}
    >

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 60
      }}>

        {icon && (
          <Box sx={iconContainerStyles}>
            {icon}
          </Box>
        )}

        <Box sx={headerStyles}>
          <Typography variant='h4' sx={{ color: '#fff' }}>
            {title}
          </Typography>

          <IconButton onClick={onClose} sx={{ color: '#fff' }}>
            <CloseRoundedIcon />
          </IconButton>

        </Box>
      </Box>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalHeader;