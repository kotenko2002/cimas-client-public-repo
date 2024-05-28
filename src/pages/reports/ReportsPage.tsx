import styles from './ReportsPage.module.less';
import ReportsTable from './reportsTable/ReportsTable';
import { useTranslation } from 'react-i18next';
import { useReports } from './useReports';

const ReportsPage = () => {
    const { t } = useTranslation('reportsPage');
    const { reports } = useReports();

    return (
        <div className={styles.reportsPageContainer}>
            {reports && reports.length > 0
                ?
                <ReportsTable reports={reports}/>
                : 
                <div className={styles.emptyContent}>
                    <h2>{t("createFirstReportText")}</h2>
                </div>
            }
        </div>
    );
}

export default ReportsPage;
