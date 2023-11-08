import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { ForwardToInbox, PhoneForwarded, PsychologyAlt, SupportAgent, WhatsApp } from '@mui/icons-material';
import { Store } from '../context/dataStore';


export default function HelpSpeed() {
  const { setOpenChat} =Store()

  const supportAgent = ()=>{
    setOpenChat(true) 
   }
  
  const actions = [
    { icon: <ForwardToInbox />, name: 'Send Email' },
    { icon: <WhatsApp />, name: 'Whats App' },
    { icon: <PhoneForwarded />, name: 'Phon Call' },
    { icon: <SupportAgent />, name: 'customers service' , do :supportAgent},
  ];
  return (
    <Box sx={{  transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 10, right: 16 }}
        icon={<PsychologyAlt />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.do}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
