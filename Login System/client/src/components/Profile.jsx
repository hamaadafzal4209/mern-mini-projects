import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Software Engineer with a passion for creating innovative solutions and improving user experiences.',
    location: 'San Francisco, CA',
    profilePicture: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    backgroundImage: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      'Completed project XYZ',
      'Attended the ABC conference',
      'Published an article on Medium'
    ]
  };

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-56">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={user.backgroundImage}
            alt="Background"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bottom-4 right-4">
            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Logout
            </button>
          </div>
        </div>
        <div className="relative z-10 p-8 -mt-24">
          <div className="md:flex justify-center md:space-x-6">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <img
                className="absolute inset-0 h-full w-full rounded-full object-cover border-4 border-white"
                src={user.profilePicture}
                alt="Profile"
              />
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-left">
              <h2 className="text-4xl font-semibold text-white">{user.name}</h2>
              <p className="text-white">{user.location}</p>
              <p className="mt-2 text-gray-700">{user.bio}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
            <div className="mt-4">
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Recent Activities</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.activities.map((activity, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
