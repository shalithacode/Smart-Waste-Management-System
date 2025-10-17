import React, { useState, useEffect } from "react";
import wasteAPI from "../../api/wiseWasteAPI";
import { gridBackgroundStyle } from "../../util/customStyles";
import Footer from "../../components/Footer";
import AdminNav from "../../components/AdminNav";
import AdminStats from "../../components/AdminStats";
import DashboardMapSection from "../../components/DashboardMapSection";
import WasteRequestDetails from "../../components/WasteRequestDetails";
import WasteRequestsTable from "../../components/WasteRequestsTable";
import FilterButtons from "../../components/FilterButtons";
import RejectModal from "../../components/RejectModal";

const AdminHomePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [flexibleDate, setFlexibleDate] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsRes, driversRes] = await Promise.all([
          wasteAPI.get("/waste-requests/all-waste-requests"),
          wasteAPI.get("/users/drivers"),
        ]);
        setWasteRequests(requestsRes.data);
        setDrivers(driversRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedRequest]);

  const handleAssignDriver = async () => {
    if (!selectedRequest || !selectedDriver) {
      alert("Please select a waste request and driver.");
      return;
    }
    if (selectedRequest.pickupOption === "Flexible Pickup" && !flexibleDate) {
      alert("Please select a date for Flexible Pickup!");
      return;
    }
    try {
      await wasteAPI.post("/waste-requests/assign-driver", {
        requestId: selectedRequest._id,
        driverId: selectedDriver,
        pickupDate:
          selectedRequest.pickupOption === "Flexible Pickup" ? flexibleDate : selectedRequest.pickupDate || Date.now(),
      });
      alert("Driver assigned successfully!");
      setSelectedRequest(null);
      setSelectedDriver("");
      setFlexibleDate("");
    } catch (error) {
      console.error("Error assigning driver:", error);
      alert("Failed to assign driver.");
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest || !rejectionMessage.trim()) {
      alert("Please enter a rejection message.");
      return;
    }
    try {
      await wasteAPI.post("/waste-requests/reject-request", {
        requestId: selectedRequest._id,
        message: rejectionMessage,
      });
      alert("Request rejected successfully!");
      setShowRejectModal(false);
      setRejectionMessage("");
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request.");
    }
  };

  const filteredRequests = wasteRequests.filter((req) => {
    if (selectedFilter === "all") return true;
    return req.status === selectedFilter;
  });

  return (
    <div className="flex min-h-screen" style={gridBackgroundStyle}>
      <AdminNav />
      <main className="flex-1">
        <div className="md:ml-64 p-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">Admin Dashboard</h1>

          <AdminStats
            driversCount={drivers.length}
            wasteRequestsCount={wasteRequests.length}
            pedningCount={wasteRequests.filter((r) => r.status === "pending").length}
            pickedUpCount={wasteRequests.filter((r) => r.status === "picked-up").length}
            rejectCount={wasteRequests.filter((r) => r.status === "rejected").length}
          />

          <DashboardMapSection
            wasteRequests={wasteRequests}
            onSelect={setSelectedRequest}
            selectedRequest={selectedRequest}
          />

          {selectedRequest && (
            <WasteRequestDetails
              selectedRequest={selectedRequest}
              drivers={drivers}
              selectedDriver={selectedDriver}
              setSelectedDriver={setSelectedDriver}
              flexibleDate={flexibleDate}
              setFlexibleDate={setFlexibleDate}
              handleAssignDriver={handleAssignDriver}
              onReject={() => setShowRejectModal(true)}
            />
          )}

          <FilterButtons selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

          <WasteRequestsTable filteredRequests={filteredRequests} selectedFilter={selectedFilter} />
        </div>

        <Footer />
      </main>

      {showRejectModal && (
        <RejectModal
          rejectionMessage={rejectionMessage}
          setRejectionMessage={setRejectionMessage}
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleRejectRequest}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
