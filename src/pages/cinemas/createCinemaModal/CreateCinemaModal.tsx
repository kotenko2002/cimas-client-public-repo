import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useCreateCinemaMutation } from '../../../api/cinemaApi';
import { useTranslation } from 'react-i18next';

type FormValues = {
    name: string;
    address: string;
};

export interface CreateCinemaModalProps {
    closeModal: () => void;
}

const CreateCinemaModal = (props: CreateCinemaModalProps) => {
    const { closeModal } = props;
    const { t } = useTranslation('cinemasPage');

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [createCinema] = useCreateCinemaMutation();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await createCinema({
            name: data.name,
            address: data.address
        });

        closeModal();
    };

    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogTitle>{t("modal.title")}</DialogTitle>
            <DialogContent sx={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('name', {
                            required: {
                                value: true,
                                message: t("modal.nameInput.requiredhelperTextMessage")
                            },
                            maxLength:
                            {
                                value: 100,
                                message: t("modal.nameInput.maxLengthHelperText", {
                                    value: 100
                                })
                            }
                        })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        label={t("modal.nameInput.label")}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        {...register('address', {
                            required: {
                                value: true,
                                message: t("modal.addressInput.requiredhelperTextMessage")
                            },
                            maxLength: {
                                value: 100,
                                message: t("modal.addressInput.maxLengthHelperText", {
                                    value: 100
                                })
                            }
                        })}
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                        label={t("modal.addressInput.label")}
                        fullWidth
                        margin="normal"
                    />
                    <DialogActions>
                        <Button type="submit" color="primary">
                            {t("modal.createButtonText")}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateCinemaModal;
