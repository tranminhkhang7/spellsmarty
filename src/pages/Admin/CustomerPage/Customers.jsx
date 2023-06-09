import React, { useState, useEffect } from 'react';

import Sidebar from '../Partials/Sidebar';
import Header from '../Partials/Header';
import DeleteButton from '../Partials/Actions/DeleteButton';
import DateSelect from '../Components/DateSelect';
import FilterButton from '../Components/DropdownFilter';
import CustomersTable from '../Partials/Customers/CustomersTable';
import PaginationClassic from '../Components/PaginationNumeric';
import ModalBasic from '../Components/ModalBasic';
import { fetchAllAccounts } from '../../../services/adminServices';

function Customers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllAccounts(localStorage.getItem('token'));
        setCustomers(response.data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchQuery = (e) => {
    // console.log(e.target.value);
    setSearchQuery(e.target.value);
  };
  const filteredCustomers = customers.filter((customer) => {
    // Modify the following condition based on your data structure
    return (
      customer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex space-x-4 items-center">
                <h1 className="text-2xl md:text-2xl text-slate-800 font-bold">Customers ✨</h1>
                <div className="text-sm font-semibold flex items-center border border-gray-300 rounded-md p-1 focus-within:border-indigo-600">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow px-2 outline-none bg-transparent"
                    value={searchQuery}
                    onChange={handleSearchQuery}
                  />
                  <button className="text-sm font-semibold ml-2 bg-indigo-500 hover:bg-indigo-600 text-white btn-xs">
                    Search
                  </button>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />

                {/* Dropdown */}
                <DateSelect />

                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add customer button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeedbackModalOpen(true);
                  }}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Customer</span>
                </button>
              </div>
            </div>
            {/* Send Feedback */}
            <div className="m-1.5">
              <ModalBasic
                id="feedback-modal"
                modalOpen={feedbackModalOpen}
                setModalOpen={setFeedbackModalOpen}
                title="Send Feedback"
              >
                {/* Modal content */}
                <div className="px-5 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-slate-800 mb-3">
                      Let us know what you think 🙌
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        className="form-input w-full px-2 py-1"
                        type="email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="feedback">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="feedback"
                        className="form-textarea w-full px-2 py-1"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="px-5 py-4 border-t border-slate-200">
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button
                      className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeedbackModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                      Send
                    </button>
                  </div>
                </div>
              </ModalBasic>
              {/* End */}
            </div>

            {/* Table */}
            <CustomersTable
              selectedItems={handleSelectedItems}
              customers={filteredCustomers}
              setCustomers={setCustomers}
            />
            {/* Pagination */}
            <div className="mt-8">{/* <PaginationClassic /> */}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Customers;
