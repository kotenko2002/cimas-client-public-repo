import { useEffect, useState, ReactNode } from "react";
import { useRefreshTokensMutation } from "../../api/authApi";
import { useGetCurrentWorkdayQuery } from "../../api/workdayApi";
import { useAppSelector } from "../../hooks/redux";
import { selectRoles } from "../../store/slices/authSlice";
import FullScreenLoader from "../fullScreenLoader/FullScreenLoader";

interface BootstrapContainerProps {
    children: ReactNode;
}

const BootstrapContainer = ({ children }: BootstrapContainerProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const userRoles = useAppSelector(selectRoles);

    // eslint-disable-next-line no-empty-pattern
    const {} = useGetCurrentWorkdayQuery(undefined, { skip: !userRoles.includes("Worker")});
    const [refreshTokens] = useRefreshTokensMutation();

    useEffect(() => {
        let accessToken = localStorage.getItem('token');

        if(accessToken) {
            refreshTokens(accessToken).finally(() => {
                setTimeout(() => setIsLoaded(true), 1000);
            });
        } else {
            setIsLoaded(true);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    if (!isLoaded) {
        return <FullScreenLoader/>;
    }

    return <>{children}</>;
}

export default BootstrapContainer;
