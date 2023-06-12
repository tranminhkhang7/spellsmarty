import React from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

function PaginationClassic() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 text-slate-300 cursor-not-allowed !text-2xl"
              href="#0"
              disabled
            >
              <FiArrowLeft /> Previous
            </a>
          </li>
          <li className="ml-3 first:ml-0">
            <a
              className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500 !text-2xl"
              href="#0"
            >
              Next <FiArrowRight />
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-xl text-slate-500 text-center sm:text-left">
        Showing <span className="font-semibold text-slate-600">1</span> to{' '}
        <span className="font-semibold text-slate-600">10</span> of{' '}
        <span className="font-semibold text-slate-600">467</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
