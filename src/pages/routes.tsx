import { ReactNode } from "react";
import { Role } from "../contracts/authTypes";
import { Routes } from "../constants";
import CinemasPage from "./cinemas/CinemasPage";
import HomePage from "./home/HomePage";
import HallsPage from "./halls/HallsPage";
import AuthPage from "./auth/AuthPage";
import FilmsPage from "./films/FilmsPage";
import SessionsPage from "./sessions/SessionsPage";
import SessionPage from "./session/SessionPage";
import ProductsPage from "./products/ProductsPage";
import HallPage from "./hall/HallPage";
import ReportsPage from "./reports/ReportsPage";
import ReportPage from "./report/ReportPage";
import UsersPage from "./users/UsersPage";

export interface Page {
    path: string; 
    requiredRoles?: Role[];
    requireAuth?: boolean;
    element: ReactNode;
};

const pages: Page[] = [
    {
        path: Routes.HOME_PAGE_ROUTE,
        element: <HomePage />,
        requireAuth: true
    },
    {
        path: Routes.AUTH_PAGE_ROUTE,
        element: <AuthPage />
    },
    
    {
        path: Routes.EMPLOYEES_PAGE_ROUTE,
        element: <UsersPage />,
        requiredRoles: ["Owner"]
    },
    {
        path: Routes.CINEMAS_PAGE_ROUTE,
        element: <CinemasPage />,
        requiredRoles: ["Owner"]
    },
    {
        path: `${Routes.HALLS_PAGE_ROUTE}/:cinemaId`,
        element: <HallsPage />,
        requiredRoles: ["Owner"]
    },
    {
        path: `${Routes.HALLS_PAGE_ROUTE}/:cinemaId/:hallId`,
        element: <HallPage />,
        requiredRoles: ["Owner"]
    },

    {
        path: Routes.PRODUCTS_PAGE_ROUTE,
        element: <ProductsPage />,
        requiredRoles: ["Worker"]
    },
    {
        path: Routes.FILMS_PAGE_ROUTE,
        element: <FilmsPage />,
        requiredRoles: ["Worker"]
    },
    {
        path: Routes.SESSIONS_PAGE_ROUTE,
        element: <SessionsPage />,
        requiredRoles: ["Worker"]
    },
    {
        path: `${Routes.SESSIONS_PAGE_ROUTE}/:sessionId`,
        element: <SessionPage />,
        requiredRoles: ["Worker"]
    },

    {
        path: Routes.REPORTS_PAGE_ROUTE,
        element: <ReportsPage />,
        requiredRoles: ["Reviewer"]
    },
    {
        path: `${Routes.REPORTS_PAGE_ROUTE}/:reportId`,
        element: <ReportPage />,
        requiredRoles: ["Reviewer"]
    }
];

export default pages;
