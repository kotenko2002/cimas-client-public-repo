import { Button } from "@mui/material";
import { useState } from "react";
import CreateSessionModal from "../createSessionModal/CreateSessionModal";
import { useTranslation } from 'react-i18next';

export interface CreateSessionButtonProps {
    cinemaId: string;
}

const CreateSessionButton = (props: CreateSessionButtonProps) => {
    const { cinemaId } = props;
    const { t } = useTranslation('sessionsPage');

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
                {t("controlPanel.createButton.text")}
            </Button>
            {open &&
                <CreateSessionModal
                    cinemaId={cinemaId}
                    closeModal={closeModal}
                />
            }
        </>
    );
};

export default CreateSessionButton;
