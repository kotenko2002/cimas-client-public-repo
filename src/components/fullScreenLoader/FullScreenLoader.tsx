import styles from './FullScreenLoader.module.less';
import LoadingOverlay from 'react-loading-overlay-ts';
import { ReactNode } from 'react';

interface FullScreenLoaderProps {
    isActive?: boolean;
    children?: ReactNode;
}

const FullScreenLoader = ({ isActive = true, children }: FullScreenLoaderProps) => {
    const backgroundColor = 'rgba(204, 204, 204, 0.5)';

    return (
        <LoadingOverlay
            className={styles.fullScreenLoader}
            active={isActive}
            spinner
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: backgroundColor
                })
            }}
        >
            {children}
        </LoadingOverlay>
    );
}

export default FullScreenLoader;