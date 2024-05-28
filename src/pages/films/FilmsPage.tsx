import { Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetFilmsByCinemaIdQuery } from '../../api/filmApi';
import { useAppSelector } from '../../hooks/redux';
import CreateFilmButton from './createFilmButton/CreateFilmButton';
import styles from './FilmsPage.module.less';
import FilmsTable from './filmsTable/FilmsTable';

const FilmsPage = () => {
    const { t } = useTranslation('filmsPage');

    const { workday } = useAppSelector(state => state.workday);
    const { data: films } = useGetFilmsByCinemaIdQuery(workday?.cinemaId!, {
        skip: !workday
    });

    if(!workday) {
        return null;
    } 

    return (
        <div className={styles.filmsPageContainer}>
            <div className={styles.createFilmButton}>
                <CreateFilmButton cinemaId={workday.cinemaId}/>
            </div>
            {films &&
                <div className={styles.content}>
                    {
                        films.length > 0
                        ?
                        <Paper>
                            <FilmsTable films={films}/>
                        </Paper>
                        : 
                        <div className={styles.empty}>
                            <h2>{t("createFirstFilmText")}</h2>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default FilmsPage;
