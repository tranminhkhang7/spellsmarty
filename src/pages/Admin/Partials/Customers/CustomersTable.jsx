import React, { useState, useEffect, useMemo } from 'react';
import Customer from './CustomersTableItem';
import { fetchAllAccounts } from '../../../../services/adminServices';
import ModalViewPlan from '../../Components/ModalViewPlan';
import ModalBasic from '../../Components/ModalBasic';
function CustomersTable({ selectedItems }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(customers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllAccounts(localStorage.getItem('token'));
        setCustomers(response.data);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(customers.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(null);
  const handleViewPlan = (subribeDate, endDate) => {
    console.log(`${subribeDate} ${endDate}`);
    setDate({ subribeDate, endDate });
    setModalOpen(!modalOpen);
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-5">
        <h2 className="text-lg font-semibold text-slate-800">
          All Customers <span className="text-slate-400 font-medium">248</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-sm font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {/* <th className="px-5 first:pl-5 last:pr-5 py-5 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th> */}
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th> */}
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">User Id</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">User Name</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Full Name</div>
                </th>
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold">Orders</div>
                </th> */}
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold">Plan Type</div>
                </th>
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Total spent</div>
                </th> */}
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold">Actions</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {customers.map((customer) => {
                return (
                  <Customer
                    key={customer.id}
                    id={customer.id}
                    username={customer.username}
                    name={customer.name}
                    email={customer.email}
                    handleClick={handleClick}
                    planid={customer.planid}
                    subribeDate={customer.subribeDate}
                    endDate={customer.endDate}
                    isChecked={isCheck.includes(customer.id)}
                    handleViewPlan={handleViewPlan}
                  />
                );
              })}
            </tbody>
          </table>
          {modalOpen ? (
            <div className="fixed inset-0 w-full h-full z-40 flex justify-center mt-48">
              <div className="bg-white shadow-2xl w-fit h-fit p-6 space-y-8">
                <div className="mb-4 text-lg">Subscribe date: {date.subribeDate}</div>
                <div className="mb-4 text-lg">End Date: {date.endDate}</div>
                <div className="text-lg font-semibold border border-gray-300 rounded-md p-2 focus-within:border-indigo-600">
                  <input
                    type="text"
                    placeholder="Months"
                    className="flex-grow px-2 py-1 outline-none bg-transparent"
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleViewPlan}
                    className="btn-xs !text-lg bg-gray-300 hover:bg-gray-400 text-gray-800 mr-2"
                  >
                    Close
                  </button>
                  <button className="btn-xs !text-lg bg-indigo-500 hover:bg-indigo-600 text-white">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomersTable;
