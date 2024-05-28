import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import StartWorkdayModal from "../startWorkdayModal/StartWorkdayModal";

interface StartWorkdayButtonProps {
    className: string;
}

const StartWorkdayButton = ({ className }: StartWorkdayButtonProps) => {
    const { t } = useTranslation('header');
    
    const [open, setOpen] = useState(false);
    
    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="outlined"
                className={className}
                onClick={openModal}
            >
                {t("startWorkday.buttonText")}
            </Button>
            {open && <StartWorkdayModal closeModal={closeModal}/>}
        </>
    );
};

export default StartWorkdayButton;
