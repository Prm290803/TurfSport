// import { getEndTime } from "../../utils/dateUtils";

// const DurationSelection = ({
//   selectedStartTime,
//   duration,
//   handleDurationChange,
//   isDurationAvailable,
// }) => {
//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
//       <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//         {[1, 2, 3].map((hours) => (
//           <button
//             key={hours}
//             className={`btn flex-1 ${
//               duration === hours ? "btn-primary" : "btn-outline"
//             }`}
//             onClick={() => handleDurationChange(hours)}
//             disabled={!isDurationAvailable(selectedStartTime, hours)}
//           >
//             <div>
//               <div>
//                 {hours} hour{hours > 1 ? "s" : ""}
//               </div>
//               <div className="text-sm">
//                 {selectedStartTime} to {getEndTime(selectedStartTime, hours)}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DurationSelection;


const DurationSelection = ({
  selectedStartTime,
  duration,
  handleDurationChange,
  isDurationAvailable,
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
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((hours) => (
          <button
            key={hours}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              duration === hours
                ? "border-green-500 bg-green-500/10 text-green-400 shadow-lg"
                : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
            } ${!isDurationAvailable(selectedStartTime, hours) ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handleDurationChange(hours)}
            disabled={!isDurationAvailable(selectedStartTime, hours)}
          >
            <div className="text-center">
              <div className="font-bold text-lg">
                {hours} hour{hours > 1 ? "s" : ""}
              </div>
              <div className="text-sm mt-1">
                {selectedStartTime} to {getEndTime(selectedStartTime, hours)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelection;