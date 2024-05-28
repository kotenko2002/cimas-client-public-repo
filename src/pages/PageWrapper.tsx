import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, toastSettings } from '../constants';
import { useAppSelector } from '../hooks/redux';
import { Role } from '../contracts/authTypes';
import { toast } from 'react-toastify';

export interface PageWrapperProps {
    requiredRoles?: Role[];
    requireAuth?: boolean;
    children: ReactNode;
};


const PageWrapper = ({ requireAuth = false, requiredRoles = [], children }: PageWrapperProps) => {
    const { isAuth, user } = useAppSelector(state => state.auth);

    const unauthenticated = (requireAuth && !isAuth) || (requiredRoles.length > 0 && !isAuth);
    const insufficientPermissions = requiredRoles.length > 0 && !requiredRoles.some(role => user.roles.includes(role));

    if (unauthenticated || insufficientPermissions) {
        const toastMessage = unauthenticated
            ? "Для початку увійдіть у систему"
            : "Ви не маєте прав на перегляд цієї сторінки";
        const navigateTo = unauthenticated
            ? Routes.AUTH_PAGE_ROUTE
            : Routes.HOME_PAGE_ROUTE;

        toast.error(toastMessage, toastSettings);

        return <Navigate to={navigateTo} replace />;
    }

    return <>{children}</>;
};

export default PageWrapper;
