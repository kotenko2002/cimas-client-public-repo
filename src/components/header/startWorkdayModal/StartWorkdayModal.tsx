import styles from './StartWorkdayModal.module.less';
import { useState } from 'react';
import { useGetAllCinemasQuery } from "../../../api/cinemaApi";
import { useStartWorkdayMutation } from "../../../api/workdayApi";
import { Button, TextField, Dialog, DialogActions, DialogContent, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface WorkdayStartModalProps {
    closeModal: () => void;
}

const StartWorkdayModal = ({ closeModal }: WorkdayStartModalProps) => {
    const { t } = useTranslation('header');

    const [cinemaId, setCinemaId] = useState('');
    const [error, setError] = useState(false);

    const { data: cinemas } = useGetAllCinemasQuery();
    const [startWorkday] = useStartWorkdayMutation();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!cinemaId) {
            setError(true);
        } else {
            await startWorkday(cinemaId);
            closeModal();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCinemaId(event.target.value);
        setError(false);
    };

    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogContent sx={{ width: "400px" }}>
                <form onSubmit={onSubmit}>
                    <TextField
                        select
                        label={t("startWorkday.modal.cinemaInput.label")}
                        value={cinemaId}
                        onChange={handleChange}
                        error={error}
                        helperText={error && t("startWorkday.modal.cinemaInput.requiredHelperText")}
                        fullWidth
                    >
                        {cinemas && cinemas.length > 0 ?
                            cinemas.map((cinema) => 
                                <MenuItem key={cinema.id} value={cinema.id}>
                                    {t("startWorkday.modal.cinemaInput.item", {
                                        cinemaName: cinema.name,
                                        cinemaAddress: cinema.address
                                    })}
                                </MenuItem>
                            )
                            :
                            <MenuItem disabled>
                                {t("startWorkday.modal.cinemaInput.emptyListText")}
                            </MenuItem>
                        }
                    </TextField>
                    <DialogActions className={styles.actions}>
                        <Button
                            type="submit"
                            color="primary"
                            className={styles.startButton}
                        >
                            {t("startWorkday.modal.buttonText")}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StartWorkdayModal;
