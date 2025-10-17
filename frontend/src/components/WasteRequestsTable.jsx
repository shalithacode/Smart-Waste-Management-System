import React from "react";

const WasteRequestsTable = ({ filteredRequests, selectedFilter }) => (
  <div className="overflow-x-auto mb-8 bg-white rounded-lg shadow-md p-4">
    <table className="min-w-full border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-[#175E5E] text-white">
          <th className="px-4 py-2 text-left rounded-tl-lg">Name</th>
          <th className="px-4 py-2 text-left">Location</th>
          <th className="px-4 py-2 text-left">Waste Types</th>

          {(selectedFilter === "all" || selectedFilter === "assigned" || selectedFilter === "picked-up") && (
            <>
              <th className="px-4 py-2 text-left">Schedule Date</th>
              <th className="px-4 py-2 text-left">Driver Name</th>
            </>
          )}
          {selectedFilter === "all" && <th className="px-4 py-2 text-left rounded-tr-lg">Collection Type</th>}
        </tr>
      </thead>
      <tbody>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req, index) => (
            <tr key={req._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{req.user?.name || "N/A"}</td>
              <td className="px-4 py-2">{req.location?.address || "N/A"}</td>
              <td className="px-4 py-2">
                {req.wasteItems.map((item, i) => (
                  <div key={i}>
                    {item.type} — {item.quantity}kg
                  </div>
                ))}
              </td>
              {(selectedFilter === "all" || selectedFilter === "assigned" || selectedFilter === "picked-up") && (
                <>
                  <td className="px-4 py-2">
                    {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-2">{req.assignedDriver?.name || "Unassigned"}</td>
                </>
              )}
              {selectedFilter === "all" && <td className="px-4 py-2">{req.pickupOption}</td>}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500">
              No collection requests found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default WasteRequestsTable;
