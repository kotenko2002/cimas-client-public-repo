import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/redux';
import styles from './HomePage.module.less';

const HomePage = () => {
    const { t } = useTranslation('homePage');

    const { user } = useAppSelector(state => state.auth);
    
    return (
        <div className={styles.homePageContainer}>
            <div className={styles.welcomeText}>
                {t("welcomeText", {
                    fullName: user.fullName
                })}
            </div>
        </div>
    );
};

export default HomePage;
