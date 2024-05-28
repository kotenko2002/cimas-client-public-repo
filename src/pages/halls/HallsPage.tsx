import styles from './HallsPage.module.less';
import { useParams } from "react-router-dom";
import { useGetHallsByCinemaIdQuery } from "../../api/hallApi";
import CreateHallButton from "./createHallButton/CreateHallButton";
import HallsTable from "./hallsTable/HallsTable";
import { Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Params {
    cinemaId: string;
}

const HallsPage = () => {
    const { t } = useTranslation("hallsPage");

    const { cinemaId } = useParams<keyof Params>() as Params;
    const { data: halls } = useGetHallsByCinemaIdQuery(cinemaId);

    return (
        <div className={styles.hallsPageContainer}>
            <div className={styles.createHallButton}>
                <CreateHallButton cinemaId={cinemaId} />
            </div>
            {halls &&
                <div className={styles.content}>
                    {
                        halls.length > 0
                        ?
                        <Paper>
                            <HallsTable cinemaId={cinemaId} halls={halls}/>
                        </Paper>
                        : 
                        <div className={styles.empty}>
                            <h2>{t("createFirstHallText")}</h2>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default HallsPage;