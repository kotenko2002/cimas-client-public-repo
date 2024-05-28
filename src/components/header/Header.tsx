import styles from './Header.module.less';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import LogoutButton from './logoutButton/LogoutButton';
import { Routes } from "../../constants";
import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { Role } from '../../contracts/authTypes';
import FinishWorkdayButton from './finishWorkdayButton/FinishWorkdayButton';
import StartWorkdayButton from './startWorkdayButton/StartWorkdayButton';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { WorkdayResponse } from '../../contracts/workdayTypes';

const getMenuItems = (t: TFunction<"header", undefined>) => {
    return {
        Owner: [
            {
                label: t("menuItems.owner.employees"),
                url: Routes.EMPLOYEES_PAGE_ROUTE
            },
            {
                label: t("menuItems.owner.cinemas"),
                url: Routes.CINEMAS_PAGE_ROUTE
            }
        ],
        Worker: [
            {
                label: t("menuItems.worker.products"),
                url: Routes.PRODUCTS_PAGE_ROUTE
            },
            {
                label: t("menuItems.worker.films"),
                url: Routes.FILMS_PAGE_ROUTE
            },
            {
                label: t("menuItems.worker.sessions"),
                url: Routes.SESSIONS_PAGE_ROUTE
            }
        ],
        Reviewer: [
            {
                label: t("menuItems.reviewer.reports"),
                url: Routes.REPORTS_PAGE_ROUTE
            }
        ]
    }
}

const renderMenuItems = (
    role: Role,
    workday: WorkdayResponse | null,
    t: TFunction<"header", undefined>,
    navigate: NavigateFunction) => 
{
    if(role === 'Worker' && !workday) {
        return null;
    }

    return getMenuItems(t)[role].map((item, index) => {
        const isActive = window.location.pathname === item.url;
        const itemClassName = isActive ? `${styles.item} ${styles.active}` : styles.item;

        return (
            <Button
                key={index}
                onClick={() => navigate(item.url)}
                className={itemClassName}
            >
                {item.label}
            </Button>
        );
    });
};

const renderWorkdayButton = (workday: WorkdayResponse | null) => {
    return workday 
        ? <FinishWorkdayButton className={styles.wordayButton}/>
        : <StartWorkdayButton className={styles.wordayButton}/> 
}

const Header = () => {
    const { t } = useTranslation('header');

    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);
    const { workday } = useAppSelector(state => state.workday);

    const isHomePageActive = window.location.pathname === Routes.HOME_PAGE_ROUTE;
    const homePageClassName = isHomePageActive ? `${styles.item} ${styles.active}` : styles.item;

    return (
        <div className={styles.header}>
            <div className={styles.menuItems}>
                <Button
                    onClick={() => navigate(Routes.HOME_PAGE_ROUTE)}
                    className={homePageClassName}
                >
                    {t("menuItems.general.home")}
                </Button>
                {user.roles.map(role => renderMenuItems(role, workday, t, navigate))}
                {user.roles.includes("Worker") && renderWorkdayButton(workday)}
            </div>
            <LogoutButton />
        </div>
    );
};

export default Header;
