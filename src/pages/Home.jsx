import { useContext, useMemo } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Home = () => {
  const { users, loading, error } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const search = searchParams.get("search") ?? "";
  const sortOrder = searchParams.get("sort") ?? "";

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === "asc") return a.name.localeCompare(b.name);
        if (sortOrder === "desc") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [users, search, sortOrder]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="text-sm text-slate-600 mt-2">Search, sort, and view individual user details.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              value={search}
              type="text"
              placeholder="Search by name..."
              className="border rounded-lg p-3 w-full sm:w-72"
              onChange={(e) => setSearchParams({ search: e.target.value, sort: sortOrder })}
            />
            <select
              value={sortOrder}
              className="border rounded-lg p-3 w-full sm:w-48"
              onChange={(e) => setSearchParams({ search, sort: e.target.value })}
            >
              <option value="">Sort</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <p className="text-center text-slate-600">No users found</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <Link
                to={`/user/${user.id}`}
                key={user.id}
                state={{ from: location.pathname + location.search }}
                className="block border rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-slate-700 mb-1">{user.email}</p>
                <p className="text-slate-500">{user.address.city}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;