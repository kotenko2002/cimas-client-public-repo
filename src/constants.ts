import { ToastPosition } from "react-toastify";

export const BASE_URL = 'https://localhost:7165'; // local
// export const BASE_URL = ''; // prod

export const Routes = {
    AUTH_PAGE_ROUTE: "/auth",

    HOME_PAGE_ROUTE: "/",
    
    CINEMAS_PAGE_ROUTE: "/cinemas",
    HALLS_PAGE_ROUTE: "/halls",
    EMPLOYEES_PAGE_ROUTE: "/employees",

    PRODUCTS_PAGE_ROUTE: "/products",
    FILMS_PAGE_ROUTE: "/films",
    SESSIONS_PAGE_ROUTE: "/sessions",

    REPORTS_PAGE_ROUTE: "/reports"
};

export const toastSettings =  {
    position: "bottom-right" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
