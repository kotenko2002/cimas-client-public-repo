import styles from './ReportsTable.module.less';
import { ReportStatus } from "../../../contracts/reportTypes";
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { InfoOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Routes } from '../../../constants';
import dayjs from 'dayjs';
import { CheckCircle, Cancel, Error } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Report } from '../useReports';

interface ReportsTableProps {
    reports: Report[];
}

const renderReportStatus = (status: ReportStatus, t: TFunction<"reportsPage", undefined>) => {
    switch(status) {
        case ReportStatus.NotReviewed:
            return (
                <>
                    {t("table.statusWorkdayLabel.types.notReviewed")}
                    <Error fontSize="small" sx={{ color: "#FFB15D" }} />
                </>
            );
        case ReportStatus.Approved:
            return (
                <>
                    {t("table.statusWorkdayLabel.types.approved")}
                    <CheckCircle fontSize="small" color="success" />
                </>
            );
        case ReportStatus.Rejected:
            return (
                <>
                    {t("table.statusWorkdayLabel.types.rejected")}
                    <Cancel fontSize="small" color="error" />
                </>
            );
        default:
            return null;
    }
}

const ReportsTable = (props: ReportsTableProps) => {
    const { reports } = props;
    const { t } = useTranslation('reportsPage');

    return (
        <Paper>
            <Table className={styles.reportsTable} aria-label="striped table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">
                            {t("table.startWorkdayColumnLabel")}
                        </TableCell>
                        <TableCell align="center">
                            {t("table.endWorkdayLabel")}
                        </TableCell>
                        <TableCell align="center">
                            {t("table.statusWorkdayLabel.text")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {reports.map((report) => (
                    <TableRow
                        key={report.id}
                        sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                    >
                        <TableCell className={styles.cellWithIconButton}>
                            <Link to={`${Routes.REPORTS_PAGE_ROUTE}/${report.id}`}>
                                <IconButton>
                                    <InfoOutlined/>
                                </IconButton>
                            </Link>
                        </TableCell>
                        <TableCell align="center">
                            {dayjs(report.startDateTime).format('DD/MM/YYYY HH:mm:ss')}
                        </TableCell>
                        <TableCell align="center">
                            {dayjs(report.endDateTime).format('DD/MM/YYYY HH:mm:ss')}
                        </TableCell>
                        <TableCell align="center" className={styles.cellWithIconButton}>
                            <div className={styles.reportStatusCell}>
                                {renderReportStatus(report.status, t)}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ReportsTable;
