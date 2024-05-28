import styles from './ReportPage.module.less';
import { useParams } from "react-router-dom";
import { useGetReportFileQuery } from "../../api/reportApi";
import PdfViewer from "./pdfViewer/PdfViewer";
import ControlPanel from './controlPanel/ControlPanel';

interface Params {
    reportId: string;
}
    
const ReportPage = () => {
    const { reportId } = useParams<keyof Params>() as Params;
    const { data: reportFile } = useGetReportFileQuery(reportId);

    return (
        <div className={styles.reportPageContainer}>
            <ControlPanel reportId={reportId} reportFile={reportFile}/>
            <div className={styles.pdfViewer}>
                <PdfViewer file={reportFile} />
            </div>
        </div>
    );
}

export default ReportPage;
