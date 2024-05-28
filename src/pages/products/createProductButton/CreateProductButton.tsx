import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateProductModal from "../createProductModal/CreateProductModal";

interface CreateProductButtonProps {
    cinemaId: string;
}

const CreateProductButton = (props: CreateProductButtonProps) => {
    const { cinemaId } = props;
    const { t } = useTranslation("productsPage");

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
                <CreateProductModal
                    cinemaId={cinemaId}
                    closeModal={closeModal}
                />
            }
        </>
    );
};


export default CreateProductButton;
