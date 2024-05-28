import styles from './ReportStatusSelect.module.less';
import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useUpdateReportStatusMutation } from "../../../api/reportApi";
import { ReportResponse, ReportStatus } from "../../../contracts/reportTypes";
import { CheckCircle, Cancel, Error } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { toastSettings } from '../../../constants';

interface ReportStatusSelectProps {
    report: ReportResponse | undefined;
}

const ReportStatusSelect = (props: ReportStatusSelectProps) => {
    const { report } = props;
    const { t } = useTranslation('reportPage');

    const [updatereportStatus] = useUpdateReportStatusMutation();

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if(!report) {
            return;
        }

        const response = await updatereportStatus({
            reportId: report.id, 
            request: {
                status: event.target.value as unknown as ReportStatus
            }
        });

        if (!('error' in response)) {
            toast.success(t('statusSelect.changesSuccessfulySavedMessage'), toastSettings);
        } 
    };

    if(!report) {
        return (
            <TextField
                select
                className={styles.statusSelect}
                label={t("statusSelect.text")}
                value={''}
                size="small"
                disabled
            >
                <MenuItem/>
            </TextField>
        );
    }

    return (
        <TextField
            select
            className={styles.statusSelect}
            label={t("statusSelect.text")}
            value={report.status}
            onChange={handleChange}
            size="small"
        >
            <MenuItem value={ReportStatus.NotReviewed}>
                <div className={styles.status}>
                    {t("statusSelect.types.notReviewed")}
                    <Error fontSize="small" sx={{ color: "#FFB15D" }} />
                </div>
            </MenuItem>
            <MenuItem value={ReportStatus.Approved}>
                <div className={styles.status}>
                    {t("statusSelect.types.approved")}
                    <CheckCircle fontSize="small" color="success" />
                </div>
            </MenuItem>
            <MenuItem value={ReportStatus.Rejected}>
                <div className={styles.status}>
                    {t("statusSelect.types.rejected")}
                    <Cancel fontSize="small" color="error" />
                </div>
            </MenuItem>
        </TextField>
    );
}

export default ReportStatusSelect;
