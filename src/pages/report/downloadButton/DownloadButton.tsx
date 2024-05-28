import { Button } from "@mui/material";
import dayjs from "dayjs";
import { PdfFile, ReportResponse } from "../../../contracts/reportTypes";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTranslation } from "react-i18next";

interface DownloadButtonProps {
    report: ReportResponse | undefined;
    reportFile: PdfFile | undefined;
}

const DownloadButton = (props: DownloadButtonProps) => {
    const { report, reportFile } = props;
    const { t } = useTranslation('reportPage');

    const handleDownload = () => {
        if (!reportFile || !report) {
            return
        }
        
        const url = URL.createObjectURL(reportFile.blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', generateReportName(report));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generateReportName = (report: ReportResponse) => {
        const startDateTime = dayjs(report.startDateTime).format('DD-MM-YYYY_HH-mm-ss');
        const endDateTime = dayjs(report.endDateTime).format('DD-MM-YYYY_HH-mm-ss');

        return `${startDateTime}--${endDateTime}`;
    }

    return (
        <Button
            disabled={!reportFile || !report}
            onClick={handleDownload}
            variant="outlined"
            startIcon={<FileDownloadIcon />}
        >
            {t("downloadButtonText")}
        </Button>
    );
}

export default DownloadButton;