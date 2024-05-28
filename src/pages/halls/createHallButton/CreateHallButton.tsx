import { useState } from 'react';
import { Button } from '@mui/material';
import CreateHallModal from '../createHallModal/CreateHallModal';
import { useTranslation } from 'react-i18next';

export interface CreateHallButtonProps {
    cinemaId: string;
}

const CreateHallButton = (props: CreateHallButtonProps) => {
    const { cinemaId } = props;
    const { t } = useTranslation("hallsPage");

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
                <CreateHallModal
                    cinemaId={cinemaId}
                    closeModal={closeModal}
                />
            }
        </>
    );
};

export default CreateHallButton;
