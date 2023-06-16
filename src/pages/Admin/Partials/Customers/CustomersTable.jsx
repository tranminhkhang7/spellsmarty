import React, { useState, useEffect, useMemo } from 'react';
import Customer from './CustomersTableItem';
import { fetchAllAccounts } from '../../../../services/adminServices';
import { updateAccountPremium } from '../../../../services/adminServices';
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
        console.log('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsInputEmpty(false);
  };
  const handleConfirm = (accountId, months) => {
    if (inputValue.trim() === '') {
      setIsInputEmpty(true);
    } else {
      const token = '';
      updateAccountPremium(token, accountId, months)
        .then((response) => {
          console.log(response.data);
          setInputValue('');
          setModalOpen(false);
          updateCustomer(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setIsInputEmpty(false);
    }
  };
  const updateCustomer = (updatedCustomer) => {
    const updatedList = customers.map((customer, index) => {
      if (customer.id === updatedCustomer.id) {
        // Update the specific item
        return { ...updatedCustomer };
      }
      // Return the unchanged item
      return customer;
    });

    setCustomers(updatedList);
  };
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
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const handleViewPlan = (customerId, subribeDate, endDate) => {
    console.log(`${subribeDate} ${endDate} ${customerId}`);
    setDate({ subribeDate, endDate });
    setSelectedCustomerId(customerId);
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
            <div className="fixed inset-0 w-full h-full z-40 flex justify-center mt-12">
              <div className="bg-white shadow-2xl w-fit h-fit p-6 flex flex-col space-y-10">
                <div className="text-lg font-semibold">View & extend user premium</div>
                <div className="text-lg">User ID: {selectedCustomerId}</div>
                <div className="text-lg">Subscribe date: {date.subribeDate}</div>
                <div className="text-lg">End Date: {date.endDate}</div>
                <div
                  className={`border text-sm font-semibold flex items-center border-gray-300 rounded-md p-2 focus-within:border-indigo-600 space-x-4 ${
                    isInputEmpty ? 'border-red-500' : ''
                  }`}
                >
                  <input
                    type="number"
                    placeholder="Months"
                    required={true}
                    className="outline-none bg-transparent w-full"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleViewPlan}
                    className="btn-xs !text-lg bg-gray-300 hover:bg-gray-400 text-gray-800 mr-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleConfirm(selectedCustomerId, inputValue)}
                    className="btn-xs !text-lg bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Extend
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
