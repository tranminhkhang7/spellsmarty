import { React, useState } from 'react';
import styles from './CustomerTableItem.module.css';
function CustomersTableItem(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [isOpen, setIsOpen] = useState(false);

  const style = {
    // overflow: 'hidden',
    // width: isOpen ? '50%' : 0,
    transition: '0.7s',
  };
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 p-6 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-checkbox"
              type="checkbox"
              onChange={props.handleClick}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 p-6 whitespace-nowrap w-px">
        <div className="flex items-center relative">
          <button>
            <svg
              className={`w-6 h-6 shrink-0 fill-current ${
                props.fav ? 'text-amber-500' : 'text-slate-300'
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        </div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          {/* <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full"
              src={props.image}
              width="40"
              height="40"
              alt={props.name}
            />
          </div> */}
          <div className="font-medium text-slate-800">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.location}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.orders}</div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.lastOrder}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{props.spent}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-center text-white !font-semibold !text-xl"
          >
            Upgrade
          </button>
          <div
            className={`flex flex-row space-x-4 overflow-hidden transition-all duration-700 ease-in-out ${
              isOpen ? '2xl:w-1/2 xl:2/3' : `w-0`
            }`}
          >
            <button className="btn-xs bg-primaryColor text-white">Confirm</button>
            <button className="btn-xs bg-goldenColor text-white">Close</button>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        <button className="text-slate-400 hover:text-slate-500 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-10 h-10 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default CustomersTableItem;