import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/user/HomePage";
import AboutPage from "../pages/user/AboutPage";
import ContactUs from "../pages/user/ContactUs";
import DriverHomePage from "../pages/driver/driverHomePage";

import WasteTypeSelection from "../pages/user/WasteTypeSelection";
import SortingGuidelines from "../pages/user/SortingGuidelines";
import CreateWasteRequest from "../pages/user/CreateWasteRequest";
import ProfilePage from "../pages/user/profile/ProfilePage";
import Membership from "../pages/user/profile/Membership";
import Recycling from "../pages/user/profile/Recycling";
import AdminHomePage from "../pages/admin/AdminHomePage";
import DriverAssignPage from "../pages/admin/DriverAssignPage";
import UserNotification from "../pages/user/profile/UserNotification";
import DriverNotification from "../pages/driver/DriverNotification";
import WasteRequestConfirmation from "../pages/user/WasteRequestConfirmation";
import PickupRequests from "../pages/driver/driverPickupRequest";
import BulkWaste from "../pages/user/BulkWaste";
import CommunityPage from "../pages/community/CommunityPage";
import CreateEvent from "../pages/community/CreateEvent";
import AddPlaceForm from "../pages/admin/AddPlaceForm";
import PlaceList from "../pages/driver/PlaceList";
import AdminRecycleDashboard from "../pages/admin/AdminRecycleIntegration";

// import Dashboard from '../pages/Dashboard';

const AppRouter = () => (
  <Router>
    <Routes>
      {/* auth routes */}
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />
      {/* user routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/selection" element={<WasteTypeSelection />} />
      <Route path="/sorting-guidelines" element={<SortingGuidelines />} />
      <Route path="/create-waste-request" element={<CreateWasteRequest />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Membership" element={<Membership />} />
      <Route path="/UserHomePage" element={<Recycling />} />
      <Route path="/confirmation" element={<WasteRequestConfirmation />} />

      {/* driver routes */}

      <Route path="/BulkWaste" element={<BulkWaste />} />
      {/* driver routes */}

      <Route path="/driverHomePage" element={<DriverHomePage />} />
      {/* admin routes */}
      <Route path="/AdminHomePage" element={<AdminHomePage />} />
      <Route path="/AddPlaceForm" element={<AddPlaceForm />} />
      <Route path="/PlaceList" element={<PlaceList />} />
      <Route path="/driverAssign" element={<DriverAssignPage />} />

      <Route path="/notifications" element={<UserNotification />} />
      <Route path="/driverNotifications" element={<DriverNotification />} />

      <Route path="/pickup-requests" element={<PickupRequests />} />
      <Route path="/AdminRecycleIntegration" element={<AdminRecycleDashboard />} />

      {/* community routes */}
      <Route path="/Community" element={<CommunityPage />} />
      <Route path="/CreateEvent" element={<CreateEvent />} />
    </Routes>
  </Router>
);

export default AppRouter;
