import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useTurfData from "../../hooks/useTurfData";
import useReviews from "../../hooks/useReviews";
import Reviews from "../reviews/Reviews";
import TurfDetailsSkeleton from "../ui/TurfDetailsSkeleton";
import { MapPin, Clock, Activity, IndianRupee, Star, Users, Calendar, Shield } from "lucide-react";

const TurfDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, turfs } = useTurfData();
  const { averageRating, totalReviews } = useReviews(id);

  if (loading) {
    return <TurfDetailsSkeleton />;
  }

  const turf = turfs.find((t) => t._id === id);

  if (!turf) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Turf Not Found</h3>
          <p className="text-gray-400 mb-6">The turf you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/turfs')}
            className="btn bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 rounded-xl"
          >
            Browse Turfs
          </button>
        </div>
      </div>
    );
  }

  const handleReservation = () => {
    if (isLoggedIn) {
      navigate(`/auth/reserve/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
      {/* Header Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10"></div>
        <img
          src={turf.image || "/banner-1.png"}
          alt={turf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{turf.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">About This Turf</h2>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center bg-gray-750 px-3 py-2 rounded-lg">
                  <MapPin className="w-4 h-4 mr-1 text-green-400" />
                  <span className="text-sm">{turf.location || "City Sports Complex"}</span>
                </div>
                {averageRating > 0 && (
                  <div className="flex items-center bg-gray-750 px-3 py-2 rounded-lg">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span className="text-sm">{averageRating.toFixed(1)} ({totalReviews} reviews)</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 leading-relaxed">
                {turf.description || "Premium sports turf with professional-grade facilities. Perfect for football, cricket, and other outdoor sports activities. Our turf is maintained to the highest standards with proper drainage, premium grass, and professional markings."}
              </p>
            </div>

            {/* Features Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Turf Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem icon={<Shield className="w-5 h-5" />} title="Premium Quality" description="Professional-grade turf with proper maintenance" />
                <FeatureItem icon={<Users className="w-5 h-5" />} title="Group Discounts" description="Special rates for team bookings and events" />
                <FeatureItem icon={<Calendar className="w-5 h-5" />} title="Easy Booking" description="Online reservation system with instant confirmation" />
                <FeatureItem icon={<Clock className="w-5 h-5" />} title="Flexible Hours" description="Extended operating hours for your convenience" />
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <Reviews turfId={id} />
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              
              <div className="space-y-4 mb-6">
                <InfoItem
                  icon={<IndianRupee className="w-5 h-5" />}
                  label="Price per Hour"
                  value={`₹${turf.pricePerHour || "800"}`}
                  highlight={true}
                />
                <InfoItem
                  icon={<Activity className="w-5 h-5" />}
                  label="Sports Available"
                  value={turf.sportTypes?.join(", ") || "Football, Cricket"}
                />
                <InfoItem
                  icon={<Clock className="w-5 h-5" />}
                  label="Opening Hours"
                  value={`${turf.openTime || "06:00 AM"} - ${turf.closeTime || "10:00 PM"}`}
                />
              </div>

              <button
                className="btn w-full bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 rounded-xl font-semibold text-lg py-4 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                onClick={handleReservation}
              >
                Reserve Now
              </button>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-sm text-green-400 text-center">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Free cancellation up to 24 hours before booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, highlight = false }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
    <div className="flex items-center">
      <div className={`mr-3 ${highlight ? 'text-green-400' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className="text-gray-400">{label}</span>
    </div>
    <span className={`font-medium ${highlight ? 'text-green-400' : ''}`}>{value}</span>
  </div>
);

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 bg-gray-750 rounded-xl transition-colors duration-300 hover:bg-gray-700">
    <div className="bg-green-500/10 p-2 rounded-lg text-green-400 mt-1 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

export default TurfDetails;