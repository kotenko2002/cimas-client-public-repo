import styles from './App.module.less';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageWrapper from './pages/PageWrapper';
import pages, { Page } from './pages/routes';
import { useAppSelector } from './hooks/redux';
import { Routes as ROUTES } from "./constants"
import BootstrapContainer from './components/bootstrapContainer/BootstrapContainer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const renderRoutes = (pages: Page[]) => {
    return pages.map((page, index) => {
        return (
            <Route key={index} path={page.path} element={
                <div className={styles.appContainer}>
                    <PageWrapper
                        requireAuth={page.requireAuth}
                        requiredRoles={page.requiredRoles}
                    >
                        {page.element}
                    </PageWrapper>
                </div>
            } />
        );
    });
}

const App = () => {
    const { isAuth } = useAppSelector(state => state.auth);

    return (
        <BootstrapContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <ToastContainer />
                    {isAuth && <Header />}
                    <Routes>
                        {renderRoutes(pages)}
                        <Route
                            path="*"
                            element={<Navigate to={ROUTES.HOME_PAGE_ROUTE} replace />}
                        />
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </BootstrapContainer>
    );
}

export default App;
