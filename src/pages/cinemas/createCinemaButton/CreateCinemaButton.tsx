import { useState } from 'react';
import { Button } from '@mui/material';
import CreateCinemaModal from '../createCinemaModal/CreateCinemaModal';
import { useTranslation } from 'react-i18next';


const CreateCinemaButton = () => {
    const { t } = useTranslation('cinemasPage');

    const [open, setOpen] = useState(false);
    
    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={openModal}>
                {t("createButtonText")}
            </Button>
            {open && 
                <CreateCinemaModal closeModal={closeModal} />
            }
        </>
    );
};

export default CreateCinemaButton;
