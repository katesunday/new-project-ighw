import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import s from './AppModal.module.css';
import Paper from "@mui/material/Paper";

type ModalProps = {
    title: string
    description?: string
    children: React.ReactNode
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AppModal: React.FC<ModalProps> = React.memo(({title, description, children}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                onClick={handleOpen}
                style={{borderRadius: '30px'}}
                className={s.btnsDelete}
                sx={{mt: 3, mb: 2}}
                variant={'contained'}
                color={title === 'delete' ? 'error' : 'secondary'}>
                {title}
            </Button>
            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="parent-modal-title"
                   aria-describedby="parent-modal-description">
                <Paper>
                    <Box
                        sx={style}
                        className={s.box}>
                        {description && <Typography id="modal-modal-title" variant="h6" component="h2">
                            {description}
                        </Typography>}
                        <div className={s.modal}>
                            {children}
                            <Button
                                style={{borderRadius: '30px', marginLeft: '100px'}}
                                className={s.btnsClose}
                                onClick={handleClose}
                                sx={{mt: 3, mb: 2}}
                                variant={'contained'}
                                color={'error'}>
                                Close
                            </Button>
                        </div>
                    </Box>
                </Paper>
            </Modal>
        </div>
    );
})

export default AppModal;