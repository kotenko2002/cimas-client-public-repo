import styles from './CreateHallModal.module.less';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useCreateHallMutation } from '../../../api/hallApi';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useTranslation } from 'react-i18next';

export interface CreateHallModalProps {
    cinemaId: string;
    closeModal: () => void;
}

type FormValues = {
    name: string;
    numberOfRows: number,
    numberOfColumns: number
};

const CreateHallModal = (props: CreateHallModalProps) => {
    const { cinemaId, closeModal } = props;
    const { t } = useTranslation("hallsPage");

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [createHall] = useCreateHallMutation();
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await createHall({
            cinemaId: cinemaId,
            request: {
                name: data.name,
                numberOfRows: data.numberOfRows,
                numberOfColumns: data.numberOfColumns
            }
        });

        closeModal();
    };

    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogTitle>{t("model.titleText")}</DialogTitle>
            <DialogContent sx={{ maxWidth: "500px"}}>
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
                    <div className={styles.rowsAndColums}>
                        <TextField
                            {...register('numberOfRows', {
                                required: {
                                    value: true,
                                    message: t("model.numberOfRowsInput.requiredHelperText")
                                },
                                min: {
                                    value: 1,
                                    message: t("model.numberOfRowsInput.minValueHelperText", {
                                        value: 1
                                    })
                                },
                                max: {
                                    value: 30,
                                    message: t("model.numberOfRowsInput.maxValueHelperText", {
                                        value: 30
                                    })
                                }
                            })}
                            type="number"
                            error={Boolean(errors.numberOfRows)}
                            helperText={errors.numberOfRows?.message}
                            label={<>{t("model.numberOfRowsInput.label")} <TableRowsIcon/></>}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            {...register('numberOfColumns', {
                                required: {
                                    value: true,
                                    message: t("model.numberOfColumnsInput.requiredHelperText")
                                },
                                min: {
                                    value: 1,
                                    message: t("model.numberOfColumnsInput.minValueHelperText", {
                                        value: 1
                                    })
                                },
                                max: {
                                    value: 30,
                                    message: t("model.numberOfColumnsInput.maxValueHelperText", {
                                        value: 30
                                    })
                                }
                            })}
                            type="number"
                            error={Boolean(errors.numberOfColumns)}
                            helperText={errors.numberOfColumns?.message}
                            label={<>{t("model.numberOfColumnsInput.label")} <ViewColumnIcon/></>}
                            fullWidth
                            margin="normal"
                        />
                    </div>
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

export default CreateHallModal;