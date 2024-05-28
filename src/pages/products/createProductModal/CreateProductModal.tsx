import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useCreateProductMutation } from '../../../api/productApi';
import { useTranslation } from 'react-i18next';

type FormValues = {
    name: string;
    price: number;
};

export interface CreateProductModalProps {
    cinemaId: string
    closeModal: () => void;
}

const CreateProductModal = (props: CreateProductModalProps) => {
    const { cinemaId, closeModal } = props;
    const { t } = useTranslation("productsPage");

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [createProduct] = useCreateProductMutation();
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await createProduct({
            cinemaId: cinemaId,
            request: {
                name: data.name,
                price: data.price
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
                            }
                        })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        label={t("model.nameInput.label")}
                        autoFocus
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        {...register('price', { 
                            required: {
                                value: true,
                                message: t("model.priceInput.requiredHelperText")
                            },
                            min: {
                                value: 0,
                                message: t("model.priceInput.minValueHelperText", {
                                    value: 0
                                })
                            }
                        })}
                        error={Boolean(errors.price)}
                        helperText={errors.price?.message}
                        label={t("model.priceInput.label")}
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

export default CreateProductModal;
