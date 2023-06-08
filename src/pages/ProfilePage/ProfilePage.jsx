import Navbar from '../../components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function ProfilePage() {
  // Sample user data
  const user = {
    username: 'john_doe',
    password: '********',
    email: 'johndoe@example.com',
    name: 'John Doe',
    subscribeDate: '2023-01-01',
    endDate: '2023-12-31',
    plan: 'Free',
  };

  // Sample latest videos
  const latestVideos = [
    'https://static.skillshare.com/uploads/users/tmp/67305fda',
    'https://static.skillshare.com/uploads/video/thumbnails/41dad68d5836f509b9d1dd7201d0db7c/original',
    'https://hardrockmedia.org/wp-content/uploads/2022/11/Hardrockmedia.org_-51.png',
  ];
  const [showQR, setShowQR] = useState(false);
  const toggleQR = () => {
    setShowQR(!showQR);
  };
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        {/* Banner */}
        <div className="bg-primary py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl text-white font-bold mb-4">Welcome, {user.name}!</h1>
            <p className="text-white mb-8">Upgrade to Premium for exclusive benefits. </p>
            <button
              onClick={toggleQR}
              className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-blue-100"
            >
              Upgrade to Premium <FontAwesomeIcon style={{ color: '#f1c40f' }} icon={faCrown} />
            </button>
          </div>
        </div>
        {/* Modal For QR */}
        {showQR && (
          <div className="fixed w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
            <div className="bg-white p-4 rounded max-w-lg m-auto">
              <img src="https://z-p3-scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/353071081_969901747690094_4238618978827462517_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=EmyBF0hMtRsAX9U7QtV&_nc_ht=z-p3-scontent.fsgn5-6.fna&oh=03_AdSu60a8G5c6cJh_ApUpbpHCKLt9wH-bNZ6fkxHaqBVDLA&oe=64A97306" />
            </div>
          </div>
        )}

        {/* Profile */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-8 px-6 py-8">
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
            <strong className="text-gray-700">Subscription will end at:</strong> {user.endDate}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Plan:</strong> {user.plan}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
