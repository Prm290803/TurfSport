import { useState } from "react";
import useReviews from "../../hooks/useReviews";
import { format } from "date-fns";
import ReviewSkeleton from "../ui/ReviewSkeleton";
import { ChevronDown } from "lucide-react";

const REVIEWS_PER_PAGE = 5;

const Reviews = ({ turfId }) => {
  const { reviews, loading } = useReviews(turfId);
  const [displayCount, setDisplayCount] = useState(REVIEWS_PER_PAGE);

  if (loading) return <ReviewSkeleton />;

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + REVIEWS_PER_PAGE);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.slice(0, displayCount).map((review) => (
              <div key={review._id} className="bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">
                    {review.user.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(review.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 break-words">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
          {displayCount < reviews.length && (
            <div className="text-center mt-6">
              <button
                className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={handleLoadMore}
              >
                Load More
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;