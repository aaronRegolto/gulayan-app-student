import { useEffect, useState } from "react";
import { FaLeaf, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa";
import { plantsApi } from "../api";

function Dashboard() {
 
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stats = [
    {
      title: "Total Plants",
      value: plants.length,
      icon: FaLeaf,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Estimated Counts",
      value: plants.reduce((sum, plant) => sum + (plant.estimated_count || 0), 0).toLocaleString(),
      icon: FaUsers,
      color: "bg-blue-100 text-blue-600",
    }
  ];


  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const response = await plantsApi.getAll();
        setPlants(response.data.data || response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch plants");
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Plants
        </h2>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading plants...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : plants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No plants found</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Variety
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Estimated Count
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date Planted
                  </th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr
                    key={`plant-${plant.id}`}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {plant.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800">
                      {plant.variety}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {plant.estimated_count}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {new Date(plant.date_planted).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
