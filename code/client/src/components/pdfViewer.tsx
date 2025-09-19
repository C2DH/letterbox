// PDF JS
import { Spinner } from '@ouestware/loaders';
import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import {
  RiArrowLeftCircleLine,
  RiArrowRightCircleLine,
  RiShareBoxLine,
  RiZoomInLine,
  RiZoomOutLine,
} from 'react-icons/ri';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import config from '../config';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const PdfViewer: FC<{ className?: string; filepath: string; pageNumber: number }> = ({
  filepath,
  pageNumber,
  className,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  const [loadingPage, setLoadingPage] = useState(false);
  const changePage = useCallback(
    (page: number) => {
      setLoadingPage(true);
      setTimeout(() => setCurrentPage(page), 0);
    },
    [setCurrentPage, setLoadingPage],
  );

  return (
    <div
      className="w-100 bg-high-gray d-flex justify-content-center py-4 position-relative"
      style={{ maxWidth: '1280px' }}
    >
      <div style={{ height: '720px' }} className="overflow-auto">
        <Document
          className={className}
          file={`${config.pdfURLPrefix}${filepath}`}
          loading={<Spinner />}
          onLoadSuccess={(props) => {
            setTotalPage(props._pdfInfo.numPages);
          }}
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            loading={<Spinner />}
            height={720}
            onRenderSuccess={() => {
              setLoadingPage(false);
            }}
            className={classNames(loadingPage ? 'd-none' : 'd-block')}
          />
        </Document>
      </div>
      {/* Loader */}
      {loadingPage && <Spinner className="position-absolute bottom-50 text-white" />}
      {/* PAGES */}
      <div className="position-absolute top-0 mt-4 d-flex gap-2 align-items-center bg-medium-gray text-white rounded z-3">
        <button
          className="btn with-icon btn-medium-gray"
          disabled={pageNumber === 1}
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          <RiArrowLeftCircleLine />
        </button>
        <span className="small">
          {currentPage}/{totalPage || '?'}
        </span>
        <button
          className="btn with-icon btn-medium-gray"
          disabled={!totalPage || currentPage === totalPage}
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          <RiArrowRightCircleLine />
        </button>
      </div>
      {/* ZOOM */}
      <div className="position-absolute bottom-0 end-0 p-4 d-flex flex-column gap-2 z-3">
        <button
          className="btn with-icon btn-medium-gray"
          onClick={() => {
            setLoadingPage(true);
            setScale((_s) => _s + 0.1);
          }}
        >
          <RiZoomInLine />
        </button>
        <button
          className="btn with-icon btn-medium-gray"
          disabled={scale === 1}
          onClick={() => {
            setLoadingPage(true);
            setScale((_s) => (_s >= 1.1 ? _s - 0.1 : _s));
          }}
        >
          <RiZoomOutLine />
        </button>
      </div>
      {/* download */}
      <div className="position-absolute top-0 end-0 p-4 d-flex flex-column gap-2">
        <a
          target="_blank"
          rel="noreferrer"
          className="btn with-icon btn-medium-gray"
          href={`${config.pdfURLPrefix}${filepath}#page=${pageNumber}`}
        >
          <RiShareBoxLine />
        </a>
      </div>
    </div>
  );
};
