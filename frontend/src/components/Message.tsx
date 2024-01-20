import React, { ReactNode } from 'react';
import { Alert } from '@mui/material';

type MessageProps = {
    children: ReactNode;
    severity: 'error' | 'info' | 'success' | 'warning';
}

const Message: React.FC<MessageProps> = ({severity, children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default Message;