import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useCreateSessionMutation } from '../../../api/sessionApi';
import { useGetHallsByCinemaIdQuery } from '../../../api/hallApi';
import { useGetFilmsByCinemaIdQuery } from '../../../api/filmApi';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type FormValues = {
    hallId: string;
    filmId: string;
    price: number;
    startDateTime: Dayjs;
};

export interface CreateSessionModalProps {
    cinemaId: string;
    closeModal: () => void;
}

const CreateSessionModal = (props: CreateSessionModalProps) => {
    const { cinemaId, closeModal } = props;
    const { t } = useTranslation('sessionsPage');

    const { data: halls } = useGetHallsByCinemaIdQuery(cinemaId);
    const { data: films } = useGetFilmsByCinemaIdQuery(cinemaId);

    const { register, handleSubmit, formState, setValue } = useForm<FormValues>();
    const { errors } = formState;
    const [createSession] = useCreateSessionMutation();
    
    const currentTime = dayjs().startOf('minute');

    useEffect(() => {
        setValue('startDateTime', currentTime)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const response = await createSession({
            hallId: data.hallId,
            filmId: data.filmId,
            startTime: data.startDateTime.toISOString(),
            price: data.price
        });

        if (!('error' in response)) {
            closeModal();
        }
    };
    
    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogTitle>{t("controlPanel.createButton.model.titleText")}</DialogTitle>
            <DialogContent sx={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        select
                        fullWidth
                        label={t("controlPanel.createButton.model.hallInput.label")}
                        defaultValue=''
                        inputProps={register('hallId', {
                            required: t("controlPanel.createButton.model.hallInput.requiredHelperText") 
                        })}
                        error={Boolean(errors.hallId)}
                        helperText={errors.hallId?.message}
                        margin="normal"
                    >
                        {!halls || halls.length === 0
                            ?  
                            <MenuItem value={""} disabled={true}>
                                {t("controlPanel.createButton.model.hallInput.emptyListText")}
                            </MenuItem>
                            :
                            halls.map((hall) => 
                                <MenuItem key={hall.id} value={hall.id}>
                                    {hall.name}
                                </MenuItem>
                            )
                        }
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label={t("controlPanel.createButton.model.filmInput.label")}
                        defaultValue=''
                        inputProps={register('filmId', {
                            required: t("controlPanel.createButton.model.filmInput.requiredHelperText")
                        })}
                        error={Boolean(errors.filmId)}
                        helperText={errors.filmId?.message}
                        margin="normal"
                    >
                        {!films || films.length === 0
                            ?  
                            <MenuItem value={""} disabled={true}>
                                {t("controlPanel.createButton.model.filmInput.emptyListText")}
                            </MenuItem>
                            :
                            films.map((film) => 
                                <MenuItem key={film.id} value={film.id}>
                                    {film.name}
                                </MenuItem>
                            )
                        }
                    </TextField>
 
                    <DateTimeField
                        label={t("controlPanel.createButton.model.startDateTinmeInput.label")}
                        format="L HH:mm"
                        value={currentTime}
                        onChange={(date) => date && setValue('startDateTime', date)}
                        fullWidth
                        margin="normal"
                    />
                    
                    <TextField
                        fullWidth
                        label={t("controlPanel.createButton.model.priceInput.label")}
                        defaultValue=''
                        inputProps={register('price', {
                            required: t("controlPanel.createButton.model.priceInput.requiredHelperText"),
                            min: {
                                value: 0,
                                message: t("controlPanel.createButton.model.priceInput.minValueHelperText", {
                                    value: 0
                            })}
                        })}
                        error={Boolean(errors.price)}
                        helperText={errors.price?.message}
                        margin="normal"
                    />
                    
                    <DialogActions>
                        <Button type="submit" color="primary">
                            {t("controlPanel.createButton.model.createButtonText")}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateSessionModal;
