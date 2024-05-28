import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useCreateFilmMutation } from '../../../api/filmApi';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimeField } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface CreateFilmModalProps {
    closeModal: () => void;
    cinemaId: string;
}

type FormValues = {
    name: string;
    duration: Dayjs;
};

const CreateFilmModal = (props: CreateFilmModalProps) => {
    const { cinemaId, closeModal } = props;
    const { t } = useTranslation('filmsPage');

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();
    const [createFilm] = useCreateFilmMutation();
    
    const defaultDuration =  dayjs().set('hour', 1).set('minute', 0).set('second', 0);

    useEffect(() => {
        setValue('duration', defaultDuration)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await createFilm({
            cinemaId: cinemaId,
            request: {
                name: data.name,
                duration: data.duration.format('HH:mm:ss')
            }
        });

        closeModal();
    };

    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogTitle>{t("model.titleText")}</DialogTitle>
            <DialogContent sx={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('name', {
                            required: {
                                value: true,
                                message: t("model.nameInput.requiredHelperText")
                            },
                            maxLength: {
                                value: 100,
                                message: t("model.nameInput.maxLengthHelperText", {
                                    value: 100
                                })
                            },
                        })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        label={t("model.nameInput.label")}
                        fullWidth
                        margin="normal"
                    />
                     <DateTimeField
                        label={t("model.durationInput.label")}
                        format="HH:mm:ss"
                        defaultValue={defaultDuration}
                        onChange={(date) => date && setValue('duration', date)}
                        fullWidth
                        margin="normal"
                    />
                    <DialogActions>
                        <Button type="submit" color="primary">
                            {t("model.createButtonText")}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateFilmModal;
