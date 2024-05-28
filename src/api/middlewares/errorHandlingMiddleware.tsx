import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastSettings } from '../../constants';

const errorHandlingMiddleware: Middleware = () => (next) => (action: any) => {
    if (action.type.endsWith('rejected')) {
        const errorMessages: string[] = action?.payload?.data?.errors || [];

        if(errorMessages.length > 0) {
            const toastContent = (
                <div style={{ display: "grid", gap: "12px"}}>
                    {errorMessages.map((errorMessage, index) => (
                        <div key={index}>{errorMessage}</div>
                    ))}
                </div>
            );

            toast.error(toastContent, toastSettings);
        }
    }

    return next(action);
};

export default errorHandlingMiddleware;
