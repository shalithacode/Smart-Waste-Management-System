import React from "react";
import Map from "./Map";

const DashboardMapSection = ({ wasteRequests, onSelect }) => (
  <div className="w-full bg-white rounded-lg shadow-md mb-6 lg:w-2/3   lg:mb-0">
    <Map wasteRequests={wasteRequests.filter((req) => req.status !== "rejected")} onRequestSelect={onSelect} />
  </div>
);

export default DashboardMapSection;
