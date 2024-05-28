import { Button } from "@mui/material";
import { useState } from "react";
import RegisterEmployeeModal from "../registerEmployeeModal/RegisterEmployeeModal";
import { useTranslation } from 'react-i18next';

const RegisterEmployeeButton = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('usersPage');

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={openModal}>
                {t("registerButtonText")}
            </Button>
            {open &&
                <RegisterEmployeeModal
                    closeModal={closeModal}
                />
            }
        </>
    );
}

export default RegisterEmployeeButton;


