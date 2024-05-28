import styles from './LoginForm.module.less';
import { useLoginMutation } from "../../../api/authApi";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Routes, toastSettings } from '../../../constants';
import { useGetCurrentWorkdayQuery } from '../../../api/workdayApi';
import { useAppSelector } from '../../../hooks/redux';
import { selectRoles } from '../../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type FormValues = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const { t } = useTranslation('authPage');

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [login, {isLoading}] = useLoginMutation();
    
    const userRoles = useAppSelector(selectRoles);
    // eslint-disable-next-line no-empty-pattern
    const { } = useGetCurrentWorkdayQuery(undefined, { skip: !userRoles.includes("Worker")});
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const response = await login({
            username: data.username,
            password: data.password
        });

        if (!('error' in response)) {
            toast.success(t('loginTab.successMessage'), toastSettings);
            navigate(Routes.HOME_PAGE_ROUTE);
        } 
    };

    return (
        <div className={styles.loginPageContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('username', { 
                        required: {
                            value: true,
                            message: t("loginTab.usernameInput.requiredHelperText")
                        }, 
                        minLength: {
                            value: 4,
                            message: t("loginTab.usernameInput.minLengthHelperText", {
                                value: 4
                            })
                        },
                        maxLength: {
                            value: 15,
                            message: t("loginTab.usernameInput.maxLengthHelperText", {
                                value: 15
                            })
                        }
                    })}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                    label={t("loginTab.usernameInput.label")}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    {...register('password', { 
                        required: {
                            value: true,
                            message: t("loginTab.passwordInput.requiredHelperText")
                        }, 
                        minLength: {
                            value: 6,
                            message: t("loginTab.passwordInput.minLengthHelperText", {
                                value: 6
                            })
                        },
                        maxLength: {
                            value: 20,
                            message: t("loginTab.passwordInput.maxLengthHelperText", {
                                value: 20
                            })
                        } 
                    })}
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    label={t("loginTab.passwordInput.label")}
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
                    className={styles.loginButton}
                    size="large"
                    variant="contained"
                    color="primary"
                >
                    {t("loginTab.loginButtonText")}
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;