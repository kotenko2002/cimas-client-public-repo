import styles from './ConfirmationModal.module.less';
import { Button, Dialog, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
    open: boolean;
    messages: string[];
    onConfirm: () => void
    onCancel: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const { messages, open, onConfirm, onCancel } = props;
    const { t } = useTranslation("confirmationModal");

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogContent className={styles.content}>
                {messages.map((message, index) => 
                    <div key={index} className={styles.message}>
                        {message}
                    </div>
                )}
                <div className={styles.buttons}>
                    <Button onClick={onConfirm} color="error">
                        {t("confirm")}
                    </Button>
                    <Button onClick={onCancel}>
                        {t("cancel")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
