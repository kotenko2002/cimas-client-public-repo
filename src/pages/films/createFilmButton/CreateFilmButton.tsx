import { Button } from "@mui/material";
import { useState } from "react";
import CreateFilmModal from "../createFilmModal/CreateFilmModal";
import { useTranslation } from 'react-i18next';

export interface CreateFilmButtonProps {
    cinemaId: string;
}

const CreateFilmButton = (props: CreateFilmButtonProps) => {
    const { cinemaId } = props;
    const { t } = useTranslation('filmsPage');

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
                <CreateFilmModal
                    cinemaId={cinemaId}
                    closeModal={closeModal}
                />
            }
        </>
    );
}

export default CreateFilmButton;
