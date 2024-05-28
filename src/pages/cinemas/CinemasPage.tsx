import styles from './CinemasPage.module.less';
import { useGetAllCinemasQuery } from "../../api/cinemaApi";
import CinemasTable from './cinemasTable/CinemasTable';
import CreateCinemaButton from './createCinemaButton/CreateCinemaButton';
import { useTranslation } from 'react-i18next';

const CinemasPage = () => {
    const { t } = useTranslation('cinemasPage');
    const { data: cinemas } = useGetAllCinemasQuery();

    return (
        <div className={styles.cinemasPageContainer}>
            <div className={styles.createCinemaButton}>
                <CreateCinemaButton />
            </div>
            {cinemas &&
                <div className={styles.content}>
                    {
                        cinemas.length > 0
                        ?
                        <CinemasTable cinemas={cinemas} />
                        : 
                        <div className={styles.empty}>
                            <h2>{t("createFirstCinemaText")}</h2>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default CinemasPage;
