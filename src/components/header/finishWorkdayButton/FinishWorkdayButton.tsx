import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFinishWorkdayMutation } from "../../../api/workdayApi";
import { Routes } from "../../../constants";
import useConfirm from "../../../hooks/useConfirm";

interface FinishWorkdayButtonProps {
    className: string;
}

const FinishWorkdayButton = ({ className }: FinishWorkdayButtonProps) => {
    const { t } = useTranslation('header');
    const [Dialog, confirm] = useConfirm();
    const navigate = useNavigate();

    const [finishWorkday, {isLoading}] = useFinishWorkdayMutation();
    
    const handleFinishingWorkday = async () => {
        const confirmFinish = await confirm([t("finishWorkday.confirmationText")]);

        if (confirmFinish) {
            await finishWorkday();
            navigate(Routes.HOME_PAGE_ROUTE);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                className={className}
                disabled={isLoading}
                onClick={handleFinishingWorkday}
            >
                {t("finishWorkday.buttonText")}
            </Button>
            <Dialog/>
        </>
    );
};

export default FinishWorkdayButton;