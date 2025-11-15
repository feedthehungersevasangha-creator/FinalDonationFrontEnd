
import './App.css'
import About from './components/About'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Explore from './components/Explore'
import Publications from './components/Publications'
import Footer from './components/Footer'
import VolunteerCorner from './components/VolunteerCorner'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import AdminDashboard from '../Admin/AdminDashboard'
import PressReleases from './components/PressReleases.jsx'
import PressReleaseDetails from './components/PressReleaseDetails'
import Programmes from './components/Programmes'
import ProgrammeDetail from './components/ProgrammeDetail'
import PublicationDetail from './components/PublicationDetail'
import AdminLogin from '../Admin/AdminLogin'
import  DonationModal  from './components/DonationModal'
import ContactUs from './components/ContactUs'
import PrivacyNotice from './components/PrivacyNotice';
import ForgotPassword from '../Admin/ForgotPassword';
import ResetPassword from "../Admin/ResetPassword"; 
import ReviewPage from "./components/ReviewPage.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import ThankYouPage from "./components/ThankYouPage.jsx";
import DeclarationPage from './components/DeclarationPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import TermsPage from './components/TermsPage.jsx'
import RefundPolicyPage from './components/RefundPolicyPage.jsx';
// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/admin" replace />;
};

function App() {
  // Clear admin flag unless on dashboard
  useEffect(() => {
    if (!window.location.pathname.startsWith("/admin/dashboard")) {
      localStorage.removeItem("isAdmin");
    }
  }, []);

  const navigate = useNavigate();
useEffect(() => {
  window.history.scrollRestoration = "manual";
}, []);
  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "K") {
        navigate("/admin"); // navigate to admin login
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);

  return (
    <div className='font-primary overflow-x-hidden'>
      <Routes>
        {/* Home route renders all sections with 4 items only */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <Hero />
              <Publications limit={4} />
              <PressReleases limit={4} />
              <Programmes limit={6}/>
              {/* <About /> */}
              {/* <Explore /> */}
              {/* <VolunteerCorner /> */}
              <ContactUs/>
              <Footer />
            </>
          } 
        />
<Route
  path="/privacy-policy"
  element={
    <>
      <PrivacyNotice showAsPage={true} />
    </>
  }
/>
  <Route path="/declaration" element={<DeclarationPage />} /> 
<Route path="/terms-and-conditions" element={<TermsPage />} />
<Route path="/contact-us" element={<ContactPage />} />
<Route path="/refund-policy" element={<RefundPolicyPage />} />
        {/* Main pages show all items */}
        <Route path="/publications" element={<Publications showAll={true} showBackButton={true}/>} />
        <Route path="/press-releases" element={<PressReleases showAll={true} showBackButton={true}/>} />
        <Route path="/programs" element={<Programmes showAll={true} showBackButton={true}/>} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Other routes */}
        <Route path="/donate" element={<DonationModal />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/press-release/:id" element={<PressReleaseDetails />} />
        <Route path="/programmes/:id" element={<ProgrammeDetail />} />
        <Route path="/publications/:id" element={<PublicationDetail/>} />
      </Routes>
    </div>
  )
}

export default App
