import styles from './ControlPanel.module.less';
import DownloadButton from '../downloadButton/DownloadButton';
import ReportStatusSelect from '../reportStatusSelect/ReportStatusSelect';
import { PdfFile } from '../../../contracts/reportTypes';
import { useGetReportByIdQuery } from '../../../api/reportApi';

interface ControlPanelProps {
    reportId: string;
    reportFile: PdfFile | undefined;
}

const ControlPanel = (props: ControlPanelProps) => {
    const { reportId, reportFile } = props;

    const { data: report } = useGetReportByIdQuery(reportId);

    return (
        <div className={styles.controlPanelContainer}>
            <ReportStatusSelect report={report} />
            <DownloadButton report={report} reportFile={reportFile} />
        </div>
    );

}

export default ControlPanel;
