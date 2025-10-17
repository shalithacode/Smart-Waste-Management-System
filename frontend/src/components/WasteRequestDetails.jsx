import React from "react";
import Button from "./Button";

const WasteRequestDetails = ({
  selectedRequest,
  drivers,
  selectedDriver,
  setSelectedDriver,
  flexibleDate,
  setFlexibleDate,
  handleAssignDriver,
  onReject,
}) => (
  <div className="w-full lg:w-1/3 bg-[#E6F4F1] p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-[#175E5E] mb-4">
      Waste Collection Request [
      {selectedRequest.status === "picked-up" ? (
        <span className="text-green-600">Picked-up</span>
      ) : selectedRequest.status === "assigned" ? (
        <span className="text-yellow-600">Assigned</span>
      ) : (
        <span className="text-red-600">Pending</span>
      )}
      ]
    </h2>

    <p className="mb-4 text-gray-700">
      Waste Code: <span className="font-bold">{selectedRequest.wasteCode}</span>
    </p>
    <p className="mb-4 text-gray-700">
      Location: <span className="font-bold">{selectedRequest.location.address}</span>
    </p>

    <p className="mb-4 text-gray-700">Waste Types:</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedRequest.wasteItems.map((item, index) => (
        <span key={index} className="px-3 py-1 bg-green-200 text-green-700 font-medium rounded-full text-sm shadow-sm">
          {item.type} — {item.quantity} kg
        </span>
      ))}
    </div>

    <p className="mb-4 text-gray-700">
      Collection Type: <span className="font-bold">{selectedRequest.pickupOption}</span>
    </p>

    {selectedRequest.pickupOption === "Flexible Pickup" && selectedRequest.status === "pending" && (
      <div className="mb-4">
        <label htmlFor="flexibleDate" className="block mb-1 font-semibold text-gray-700">
          Select Preferred Pickup Date:
        </label>
        <input
          type="date"
          id="flexibleDate"
          value={flexibleDate}
          onChange={(e) => setFlexibleDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
    )}

    {selectedRequest.status === "pending" && (
      <>
        <div className="mb-4">
          <label htmlFor="driver" className="block mb-1 font-semibold text-gray-700">
            Select Driver:
          </label>
          <select
            id="driver"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <Button
            text="Assign Driver"
            onClick={handleAssignDriver}
            className="flex-1 px-4 py-2 bg-[#175E5E] text-white rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-300"
          />
          <Button
            text="Reject"
            onClick={onReject}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          />
        </div>
      </>
    )}
  </div>
);

export default WasteRequestDetails;
