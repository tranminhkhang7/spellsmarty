import Navbar from '../../components/Navbar/Navbar';
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

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        {/* Banner */}
        <div className="bg-primary py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl text-white font-bold mb-4">Welcome, {user.name}!</h1>
            <p className="text-white mb-8">Upgrade to Premium for exclusive benefits.</p>
            <button className="bg-white text-primary font-semibold py-2 px-4 rounded hover:bg-blue-100">
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-8 px-6 py-8">
          <div className="flex justify-end">
            <button className="bg-primary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit Profile
            </button>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Username:</strong> {user.username}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Password:</strong> {user.password}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email:</strong> {user.email}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Name:</strong> {user.name}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Subscription Start Date:</strong> {user.subscribeDate}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Subscription End Date:</strong> {user.endDate}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Plan:</strong> {user.plan}
          </div>
        </div>

        {/* Latest Videos */}
        <div className="max-w-full mx-auto mt-8 px-4">
          <h2 className="text-4xl font-bold mb-4">Latest Videos</h2>
          <div className="grid grid-cols-3 gap-4">
            {latestVideos.map((video, index) => (
              <img
                key={index}
                src={video}
                alt={`Video ${index}`}
                className="rounded-xl h-full w-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
