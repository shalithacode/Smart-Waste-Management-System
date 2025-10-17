import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { recycleCenters } from "../../constants/strings";
import { gridBackgroundStyle } from "../../util/customStyles";

const AdminRecycleDashboard = () => {
  // Function to simulate adding a new recycle center
  const addNewRecycleCenter = () => {
    // You would typically navigate to a form page or open a modal for adding a new center
    alert("This button will open the Add New Recycle Center form!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={gridBackgroundStyle}>
      <AdminNav /> {/* Navbar component */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12 md:ml-64">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-6xl w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#175E5E] mb-6">Recycle Center Dashboard</h1>

          {/* Add New Recycle Center Button */}
          <div className="flex justify-center mb-6">
            <Button
              text="Add New Recycle Center"
              onClick={addNewRecycleCenter}
              className="px-6 py-3 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-300"
            />
          </div>

          {/* Recycle Center Stats Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left text-xs md:text-base">
                  <th className="py-3 px-4">Center Name</th>
                  <th className="py-3 px-4">Capacity Used</th>
                  <th className="py-3 px-4">Total Capacity</th>
                  <th className="py-3 px-4">Material Types</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {recycleCenters.map((center) => (
                  <tr key={center.id} className="border-t">
                    <td className="py-3 px-4">{center.name}</td>
                    <td className="py-3 px-4">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#175E5E] bg-green-200">
                              {center.capacityUsed}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                          <div
                            style={{ width: `${center.capacityUsed}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#175E5E]"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{center.totalCapacity} Tons</td>
                    <td className="py-3 px-4">{center.materialTypes.join(", ")}</td>
                    <td className="py-3 px-4">
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => alert(`Viewing details for ${center.name}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
};

export default AdminRecycleDashboard;
