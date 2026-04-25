import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const UserDetail = () => {
  const { users, loading } = useContext(UserContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((u) => u.id === parseInt(id, 10));
      setUser(foundUser || null);
    }
  }, [users, id]);

  const returnPath = location.state?.from || "/";

  if (loading) return <Loader />;
  if (!user) return <div className="text-center mt-8">User not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(returnPath)}
          className="mb-4 inline-flex items-center rounded-lg bg-white px-4 py-2 text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{user.name}</h1>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Contact</h2>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Phone:</span> {user.phone}</p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {user.website}
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Company</h2>
                <p><span className="font-medium">Name:</span> {user.company.name}</p>
                <p><span className="font-medium">Catch Phrase:</span> {user.company.catchPhrase}</p>
                <p><span className="font-medium">BS:</span> {user.company.bs}</p>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
              <h2 className="text-xl font-semibold">Address</h2>
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}, {user.address.zipcode}</p>
              <p className="mt-4 text-sm text-slate-500">Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;