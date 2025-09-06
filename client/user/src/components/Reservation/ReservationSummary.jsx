// import { format } from "date-fns";
// import { getEndTime } from "../../utils/dateUtils";

// const ReservationSummary = ({
//   selectedDate,
//   selectedStartTime,
//   duration,
//   pricePerHour,
// }) => {
 
//   return (
//     <div className="mt-6 p-4 bg-base-200 rounded-lg">
//       <h3 className="text-lg font-semibold mb-2">Your Reservation</h3>
//       <p>Date: {format(selectedDate, "dd-MM-yyyy")}</p>
//       <p>
//         Time: {selectedStartTime} to {getEndTime(selectedStartTime, duration)}
//       </p>
//       <p>
//         Duration: {duration} hour{duration > 1 ? "s" : ""}
//       </p>
//       <p className="font-bold">Price: {pricePerHour * duration} INR</p>
//     </div>
//   );
// };

// export default ReservationSummary;


import { format } from "date-fns";
import { IndianRupee } from "lucide-react";

const ReservationSummary = ({
  selectedDate,
  selectedStartTime,
  duration,
  pricePerHour,
}) => {
  const getEndTime = (startTime, hours) => {
    // Simple implementation
    const timeMap = {
      "08:00 AM": {1: "09:00 AM", 2: "10:00 AM", 3: "11:00 AM"},
      "09:00 AM": {1: "10:00 AM", 2: "11:00 AM", 3: "12:00 PM"},
      "10:00 AM": {1: "11:00 AM", 2: "12:00 PM", 3: "01:00 PM"},
      "11:00 AM": {1: "12:00 PM", 2: "01:00 PM", 3: "02:00 PM"},
      "12:00 PM": {1: "01:00 PM", 2: "02:00 PM", 3: "03:00 PM"},
      "01:00 PM": {1: "02:00 PM", 2: "03:00 PM", 3: "04:00 PM"},
      "02:00 PM": {1: "03:00 PM", 2: "04:00 PM", 3: "05:00 PM"},
      "03:00 PM": {1: "04:00 PM", 2: "05:00 PM", 3: "06:00 PM"},
      "04:00 PM": {1: "05:00 PM", 2: "06:00 PM", 3: "07:00 PM"},
      "05:00 PM": {1: "06:00 PM", 2: "07:00 PM", 3: "08:00 PM"},
      "06:00 PM": {1: "07:00 PM", 2: "08:00 PM", 3: "09:00 PM"},
      "07:00 PM": {1: "08:00 PM", 2: "09:00 PM", 3: "10:00 PM"},
    };
    
    return timeMap[startTime]?.[hours] || "Invalid duration";
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-green-400">Your Reservation</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Date:</span>
          <span className="font-medium">{format(selectedDate, "dd-MM-yyyy")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time:</span>
          <span className="font-medium">
            {selectedStartTime} to {getEndTime(selectedStartTime, duration)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Duration:</span>
          <span className="font-medium">
            {duration} hour{duration > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-700">
          <span className="text-gray-400">Price:</span>
          <span className="text-2xl font-bold text-green-400 flex items-center">
            <IndianRupee className="w-5 h-5 mr-1" />
            {pricePerHour * duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;