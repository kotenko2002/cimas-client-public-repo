import styles from './LogoutButton.module.less';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../constants";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/slices/authSlice"
import { resetWorkday } from '../../../store/slices/workdaySlice';
import LanguageChanger from '../../LanguageChanger';
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
    const { t } = useTranslation('header');
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetWorkday());

        navigate(Routes.AUTH_PAGE_ROUTE);
        window.location.reload();
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {/* <LanguageChanger/> */}
            <Button className={styles.logoutButton} size="small" onClick={handleLogout}>
                {t("logoutButtonText")}
            </Button>
        </div>
    );
};

export default LogoutButton;