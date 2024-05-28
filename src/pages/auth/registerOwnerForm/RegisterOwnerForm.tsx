import styles from './RegisterOwnerForm.module.less';
import { useRegisterOwnerMutation } from "../../../api/authApi";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { toastSettings } from '../../../constants';
import { useTranslation } from 'react-i18next';

type FormValues = {
    companyName: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

interface RegisterOwnerFormProps {
    switchToLoginTab: () => void;
}

const RegisterOwnerForm = (props: RegisterOwnerFormProps) => {
    const { switchToLoginTab } = props;
    const { t } = useTranslation('authPage');

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [registerOwner, {isLoading}] = useRegisterOwnerMutation();
    
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const response = await registerOwner({
            companyName: data.companyName,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password
        });

        if (!('error' in response)) {
            toast.success(t('registerTab.successMessage'), toastSettings);
            switchToLoginTab();
        }
    };

    return (
        <div className={styles.registerOwnerPageContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('companyName', {
                        required: {
                            value: true,
                            message: t("registerTab.companyNameInput.requiredHelperText")
                        },
                        maxLength: {
                            value: 100,
                            message: t("registerTab.companyNameInput.maxLengthHelperText", {
                                value: 100
                            })
                        } 
                    })}
                    error={Boolean(errors.companyName)}
                    helperText={errors.companyName?.message}
                    label={t("registerTab.companyNameInput.label")}
                    fullWidth
                    margin="normal"
                />
                <div className={styles.fullName}>
                    <TextField
                        {...register('firstName', {
                            required: {
                                value: true,
                                message: t("registerTab.firstNameInput.requiredHelperText")
                            },
                            maxLength: {
                                value: 100,
                                message: t("registerTab.firstNameInput.maxLengthHelperText", {
                                    value: 100
                                })
                            } 
                        })}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName?.message}
                        label={t("registerTab.firstNameInput.label")}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        {...register('lastName', {
                            required: {
                                value: true,
                                message: t("registerTab.lastNameInput.requiredHelperText")
                            },
                            maxLength: {
                                value: 100,
                                message: t("registerTab.lastNameInput.maxLengthHelperText", {
                                    value: 100
                                })
                            }  
                        })}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName?.message}
                        label={t("registerTab.lastNameInput.label")}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <TextField
                       {...register('username', { 
                        required: {
                            value: true,
                            message: t("registerTab.usernameInput.requiredHelperText")
                        }, 
                        minLength: {
                            value: 4,
                            message: t("registerTab.usernameInput.minLengthHelperText", {
                                value: 4
                            })
                        },
                        maxLength: {
                            value: 15,
                            message: t("registerTab.usernameInput.maxLengthHelperText", {
                                value: 15
                            })
                        } 
                    })}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                    label={t("registerTab.usernameInput.label")}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('password', { 
                        required: {
                            value: true,
                            message: t("registerTab.passwordInput.requiredHelperText")
                        }, 
                        minLength: {
                            value: 6,
                            message: t("registerTab.passwordInput.minLengthHelperText", {
                                value: 6
                            })
                        },
                        maxLength: {
                            value: 20,
                            message: t("registerTab.passwordInput.maxLengthHelperText", {
                                value: 20
                            })
                        }  
                    })}
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    label={t("registerTab.passwordInput.label")}
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
                <Button
                    type="submit"
                    disabled={isLoading}
                    className={styles.registerButton}
                    size="large"
                    variant="contained"
                    color="primary"
                >
                    {t("registerTab.registerButtonText")}
                </Button>
            </form>
        </div>
    );
}

export default RegisterOwnerForm;
