import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TransitionsDialog({
  modelButton,
  submitButtonText,
  closeButtonText,
  handleSubmit,
  maxWidth,
  children,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        {modelButton != null ? (
          <div onClick={handleClickOpen}>{modelButton}</div>
        ) : (
          <Button variant="outlined" onClick={handleClickOpen}>
            Slide in alert dialog
          </Button>
        )}

        <Dialog
          open={open}
          fullWidth={true}
          maxWidth={maxWidth ||"sm"}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="bg-black">
            {/* <DialogTitle>{""}</DialogTitle> */}

            <DialogContent>{children}</DialogContent>

            <DialogActions sx={{ paddingTop: 0, padding: 1.5 }}>
              <Grid spacing={1} justifyContent="center" container>
                {handleSubmit && (
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        handleSubmit();
                        handleClose();
                      }}
                    >
                      {submitButtonText ?? "Apply"}
                    </Button>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth onClick={handleClose}>
                    {closeButtonText || "Cancel"}
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </>
  );
}
