import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TransitionsDialog({modelButton , submitButton, children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    < >
     

      <div>
        {modelButton!= null?  <div onClick={handleClickOpen}>
          {modelButton}
        </div>: <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> }
      
       
        
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="bg-black">
           
            <DialogTitle>{""}</DialogTitle>

            <DialogContent>
              {children}
            </DialogContent>
            
            <DialogActions>
              {submitButton !== null && submitButton}
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </>
  );
}