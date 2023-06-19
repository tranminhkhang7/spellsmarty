import { React, useState } from 'react';
import moment from 'moment';

import { updateAccountPremium } from '../../../../services/adminServices';
import styles from './CustomerTableItem.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
function VideosTableItem(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(false);
  };
  // const formattedSubribeDate = useMemo(() => {
  //   const date = new Date(props.subribeDate);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = String(date.getFullYear());

  //   return `${day}-${month}-${year}`;
  // }, [props.subribeDate]);

  // const formattedEndDate = useMemo(() => {
  //   const date = new Date(props.endDate);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = String(date.getFullYear());

  //   return `${day}-${month}-${year}`;
  // }, [props.endDate]);

  // const handleViewPlanMemoized = useCallback(() => {
  //   console.log(props.id);
  //   props.handleViewPlan(props.id, formattedSubribeDate, formattedEndDate);
  // }, [props.id, formattedSubribeDate, formattedEndDate, props.handleViewPlan]);

  const [inputValue, setInputValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
    setIsInputEmpty(false);
  };

  const handleConfirm = (accountId, months) => {
    if (inputValue.trim() === '') {
      setIsInputEmpty(true);
    } else {
      const token = '';
      const id = toast.loading('Please wait...', { className: 'text-sm' });
      updateAccountPremium(token, accountId, months)
        .then((response) => {
          // Handle the response
          setInputValue('');
          if (response.data) {
            toast.update(id, {
              render: 'Upgrade success',
              type: 'success',
              isLoading: false,
              autoClose: 5000,
              className: 'text-sm',
            });
          }
          props.handleUpdateCustomer(response.data);
        })
        .catch((error) => {
          // Handle the error
          toast.update(id, {
            render: 'Something went wrong',
            type: 'error',
            isLoading: false,
            autoClose: 5000,
            className: 'text-sm',
          });
        });
      setIsInputEmpty(false);
    }
  };

  return (
    <tr>
      {/* <td className="px-2 first:pl-5 last:pr-5 p-6 whitespace-nowrap w-px">
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
      </td> */}
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
          <div className="font-medium text-slate-800">{props.id}</div>
        </div>
      </td>
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
          <div className="font-medium text-slate-800">
            {props.title}{' '}
            {props.premium ? <FontAwesomeIcon style={{ color: '#f1c40f' }} icon={faCrown} /> : null}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.rating}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.level}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{moment(props.addedDate).format('MM-DD-YYYY')}</div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.lastOrder}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{props.spent}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <button
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          onClick={() => props.handleUpdateVideo(props.video)}
        >
          Details
        </button>
      </td>
      {/* Menu button */}
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <button className="text-slate-400 hover:text-slate-500 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-10 h-10 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </td> */}
    </tr>
  );
}

export default VideosTableItem;
