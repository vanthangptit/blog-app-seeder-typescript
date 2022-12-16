import * as React from 'react';
import { styled } from '@mui/system';
import { Dialog, DialogTitle, Button } from '@mui/material';
import { MessageError } from '@components/MessageError';

const DialogContent = styled('div')({
  padding: '20px 20px 40px'
});

const GroupButtons = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '35px'
});

const ConfirmModal = ({
  isOpen,
  handleClose,
  deletedSuccessful,
  errorMessageDelete,
  handleClickConfirmButton
}: {
  isOpen: boolean;
  deletedSuccessful: boolean;
  errorMessageDelete?: string;
  handleClose: () => void;
  handleClickConfirmButton: () => void
}) => {
  return (
    <div>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogContent>
          <DialogTitle>
            {deletedSuccessful ? 'Successfully deleted' : 'Are you sure you want to delete?'}
          </DialogTitle>
          <GroupButtons>
            {deletedSuccessful ? (
              <>
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleClickConfirmButton}
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#bc2e1d',
                    '&:hover': {
                      bgcolor: '#bc2e1d'
                    }
                  }}
                >
                  Confirm
                </Button>
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </>
            )}
          </GroupButtons>
          {errorMessageDelete && <MessageError style={{ marginTop: '15px', marginBottom: '0',  textAlign: 'center' }}>{errorMessageDelete}</MessageError>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
