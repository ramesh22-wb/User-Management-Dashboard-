import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-2">{user.email}</p>
      <p className="text-gray-500 text-sm mb-4">{user.company.name}</p>
      <Link
        to={`/user/${user.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};

export default UserCard;