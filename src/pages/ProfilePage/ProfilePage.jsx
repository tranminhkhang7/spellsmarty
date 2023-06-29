import Navbar from '../../components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import Moment from 'moment';
import { fetchUserDetails } from '../../services/profileServices';
import momoQRCode from "../../assets/momo_qrcode.jpeg";

function ProfilePage() {
  // Sample user data
  // const user = {
  //   username: 'john_doe',
  //   password: '********',
  //   email: 'johndoe@example.com',
  //   name: 'John Doe',
  //   subscribeDate: '2023-01-01',
  //   endDate: '2023-12-31',
  //   plan: 'Free',
  // };

  const [showQR, setShowQR] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showQR && modalRef.current && !modalRef.current.contains(event.target)) {
        // Clicked outside of the modal, close it
        setShowQR(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (showQR && event.keyCode === 27) {
        // Pressed Escape key, close the modal
        setShowQR(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showQR]);

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchUserDetails(token);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {user ? (
        <div className="bg-gray-100 min-h-screen">
          {/* Banner */}
          <div className="bg-primaryColor py-8">
            <div className="max-w-xl mx-auto px-4">
              <h1 className="text-xl text-white font-bold mb-4">Welcome, {user.name}!</h1>
              {user.planid === 1 ? (
                <>
                  <p className="text-white mb-8 text-lg">
                    Upgrade to Premium to dictate more videos!{' '}
                  </p>
                  <button
                    onClick={() => toggleQR()}
                    className="bg-secondaryColor text-primaryColor font-semibold py-2 px-4 rounded hover:bg-blue-100 text-lg"
                  >
                    Upgrade to Premium{' '}
                    <FontAwesomeIcon style={{ color: '#f1c40f' }} icon={faCrown} />
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-secondaryColor text-primaryColor font-semibold py-2 px-4 rounded text-lg w-fit">
                    Thanks for you donation{' '}
                    <FontAwesomeIcon style={{ color: '#f1c40f' }} icon={faCrown} />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Modal For QR */}
          {showQR && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="max-w-md mx-auto bg-white rounded-lg p-4" ref={modalRef}>
                <img
                  className="mx-auto"
                  src={momoQRCode}
                  alt="QR Code"
                />
              </div>
            </div>
          )}

          {/* Profile */}
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-8 px-6 py-2 text-lg">
            <div className="flex justify-end"></div>
            <div className="mb-4">
              <strong className="text-gray-700">Username:</strong> {user.username}
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Email:</strong> {user.email}
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Name:</strong> {user.name}
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Subscription will end at:</strong>{' '}
              {user.endDate && Moment(user.endDate).format('DD-MM-YYYY')}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProfilePage;
