import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useReviews from "../../hooks/useReviews";

const TurfCard = ({ turf }) => {
  const { averageRating } = useReviews(turf._id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <div className="card bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:border-green-400/20 hover:-translate-y-1">
      <figure className="relative overflow-hidden">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-48 object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
      </figure>
      
      <div className="card-body p-5">
        <h2 className="card-title text-white text-xl font-bold mb-2">
          {turf.name}
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {turf.sportTypes.map((sport, index) => (
            <span 
              key={index} 
              className="badge badge-outline border-gray-600 text-gray-300 bg-gray-700/50 py-1.5 transition-colors duration-300 hover:bg-green-400/20 hover:border-green-400/30 hover:text-green-300"
            >
              {sport}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-gray-400 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">
            Open: {turf.openTime} - {turf.closeTime}
          </span>
        </div>
        
        {/* Rating Section */}
        <div className="flex items-center mb-4 transition-opacity duration-300 hover:opacity-90">
          {averageRating ? (
            <>
              <div className="rating rating-sm mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name={`rating-${turf._id}`}
                    className="mask mask-star-2 bg-orange-400"
                    checked={star === Math.round(averageRating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-orange-400 font-medium">
                {averageRating.toFixed(1)}
              </span>
            </>
          ) : (
            <div className="text-gray-500 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              No reviews yet
            </div>
          )}
        </div>
        
        <div className="card-actions">
          <Link
            to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
            className="btn w-full bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;