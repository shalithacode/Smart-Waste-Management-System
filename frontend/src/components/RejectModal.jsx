import React from "react";

const RejectModal = ({ rejectionMessage, setRejectionMessage, onClose, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Reject Waste Request</h2>
      <textarea
        value={rejectionMessage}
        onChange={(e) => setRejectionMessage(e.target.value)}
        placeholder="Enter rejection message..."
        className="w-full h-24 border rounded-md p-2 mb-3"
      />
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Confirm Reject
        </button>
      </div>
    </div>
  </div>
);

export default RejectModal;
