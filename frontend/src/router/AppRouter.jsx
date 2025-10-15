import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/user/HomePage";
import AboutPage from "../pages/user/AboutPage";
import ContactUs from "../pages/user/ContactUs";
import SortingGuidelines from "../pages/user/SortingGuidelines";
import CreateWasteRequest from "../pages/user/CreateWasteRequest";
import ProfilePage from "../pages/user/profile/ProfilePage";
import Membership from "../pages/user/profile/Membership";
import Recycling from "../pages/user/profile/Recycling";
import AdminHomePage from "../pages/admin/AdminHomePage";
import DriverAssignPage from "../pages/admin/DriverAssignPage";
import UserNotification from "../pages/user/profile/UserNotification";
import WasteRequestConfirmation from "../pages/user/WasteRequestConfirmation";
import BulkWaste from "../pages/user/BulkWaste";
import AddPlaceForm from "../pages/admin/AddPlaceForm";
import AdminRecycleDashboard from "../pages/admin/AdminRecycleIntegration";
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
      <Route path="/BulkWaste" element={<BulkWaste />} />
      <Route path="/sorting-guidelines" element={<SortingGuidelines />} />
      <Route path="/create-waste-request" element={<CreateWasteRequest />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Membership" element={<Membership />} />
      <Route path="/UserHomePage" element={<Recycling />} />
      <Route path="/confirmation" element={<WasteRequestConfirmation />} />
      <Route path="/notifications" element={<UserNotification />} />

      {/* admin routes */}
      <Route path="/AdminHomePage" element={<AdminHomePage />} />
      <Route path="/AddPlaceForm" element={<AddPlaceForm />} />
      <Route path="/driverAssign" element={<DriverAssignPage />} />
      <Route path="/AdminRecycleIntegration" element={<AdminRecycleDashboard />} />
    </Routes>
  </Router>
);

export default AppRouter;
