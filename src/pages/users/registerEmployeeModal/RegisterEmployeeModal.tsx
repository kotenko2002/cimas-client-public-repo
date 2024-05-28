import styles from './RegisterEmployeeModal.module.less';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRegisterNonOwnerMutation } from '../../../api/userApi';
import { toastSettings } from '../../../constants';
import { useTranslation } from 'react-i18next';

type EmployeeRole = "Worker" | "Reviewer";

type FormValues = {
    role: EmployeeRole;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

interface RegisterEmployeeModalProps {
    closeModal: () => void;
}

const RegisterEmployeeModal = (props: RegisterEmployeeModalProps) => {
    const { closeModal } = props;
    const { t } = useTranslation('usersPage');

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [registerEmployee, {isLoading}] = useRegisterNonOwnerMutation();
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const response = await registerEmployee({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
            role: data.role
        });

        if (!('error' in response)) {
            toast.success(t('model.successMessage'), toastSettings);
            closeModal();
        }
    };

    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogTitle>{t("model.titleText")}</DialogTitle>
            <DialogContent sx={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        inputProps={register('role', {
                            required: {
                                value: true,
                                message: t("model.roleInput.requiredHelperText") 
                            }
                        })}
                        select
                        fullWidth
                        label={t("model.roleInput.label")}
                        defaultValue=''
                        error={Boolean(errors.role)}
                        helperText={errors.role?.message}
                        margin="normal"
                    >
                        <MenuItem value={"Worker"}>
                            {t("model.roleInput.menuItems.Worker")}
                        </MenuItem>
                        <MenuItem value={"Reviewer"}>
                            {t("model.roleInput.menuItems.Reviewer")}
                        </MenuItem>
                    </TextField>

                    <div className={styles.fullName}>
                        <TextField
                            {...register('firstName', { 
                                required: {
                                    value: true,
                                    message: t("model.firstNameInput.requiredHelperText")
                                },
                                maxLength: {
                                    value: 100,
                                    message: t("model.firstNameInput.maxLengthHelperText", {
                                        value: 100
                                    })
                                } 
                            })}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message}
                            label={t("model.firstNameInput.label")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            {...register('lastName', {
                                required: {
                                    value: true,
                                    message: t("model.lastNameInput.requiredHelperText")
                                },
                                maxLength: {
                                    value: 100,
                                    message: t("model.lastNameInput.maxLengthHelperText", {
                                        value: 100
                                    })
                                } 
                            })}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message}
                            label={t("model.lastNameInput.label")}
                            fullWidth
                            margin="normal"
                        />
                    </div>

                    <TextField
                        {...register('username', {
                            required: {
                                value: true,
                                message: t("model.usernameInput.requiredHelperText")
                            },
                            minLength: {
                                value: 4,
                                message: t("model.usernameInput.minLengthHelperText", {
                                    value: 4
                                })
                            },
                            maxLength: {
                                value: 15,
                                message: t("model.usernameInput.maxLengthHelperText", {
                                    value: 15
                                })
                            }
                        })}
                        error={Boolean(errors.username)}
                        helperText={errors.username?.message}
                        label={t("model.usernameInput.label")}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        {...register('password', {
                            required: {
                                value: true,
                                message: t("model.passwordInput.requiredHelperText")
                            },
                            minLength: {
                                value: 6,
                                message: t("model.passwordInput.minLengthHelperText", {
                                    value: 6
                                })
                            },
                            maxLength: {
                                value: 20,
                                message: t("model.passwordInput.maxLengthHelperText", {
                                    value: 20
                                })
                            }
                        })}
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        label={t("model.passwordInput.label")}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword
                                    ? <VisibilityOff color={errors.password && 'error'}/>
                                    : <Visibility color={errors.password && 'error'}/>
                                }
                                </IconButton>
                            )
                        }}
                    />
               
                    <DialogActions>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            size="large"
                            variant="contained"
                            color="primary"
                        >
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RegisterEmployeeModal;
