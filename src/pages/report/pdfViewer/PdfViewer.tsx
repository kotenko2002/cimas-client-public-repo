import styles from './PdfViewer.module.less';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { PdfFile } from '../../../contracts/reportTypes';
import FullScreenLoader from '../../../components/fullScreenLoader/FullScreenLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
    file: PdfFile | undefined;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
    const [numPages, setNumPages] = React.useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className={styles.pdfViewerContainer}>
        {
            (!file)
            ?
            <FullScreenLoader/>
            :
            <Document
                file={URL.createObjectURL(file.blob)}
                className={styles.pageContainer}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<FullScreenLoader/>}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={index}
                        className={styles.page}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                    />
                ))}
            </Document>
        }
        </div>
    );
};

export default PdfViewer;
