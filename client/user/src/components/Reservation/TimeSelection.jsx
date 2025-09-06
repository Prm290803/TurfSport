// import { parse, isAfter, addHours } from "date-fns";

// const TimeSelection = ({
//   availableTimes,
//   selectedStartTime,
//   handleTimeSelection,
//   isTimeSlotBooked,
//   timeSlots,
//   duration,
// }) => {
//   // const isTimeSlotSelected = (time) => time === selectedStartTime;
//   const isTimeSlotSelected = (time) => {
//     if (!selectedStartTime || !duration) return false;
//     const start = parse(selectedStartTime, "hh:mm a", new Date());
//     const end = addHours(start, duration);
//     const current = parse(time, "hh:mm a", new Date());
//     return current >= start && current < end;
//   };

//   const isTimeSlotDisabled = (time) => {
//     const closeTime = parse(timeSlots.closeTime, "hh:mm a", new Date());
//     const currentTime = parse(time, "hh:mm a", new Date());
//     return isAfter(currentTime, closeTime) || isTimeSlotBooked(time);
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-4">Select Start Time</h3>
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
//         {availableTimes.map((time) => (
//           <button
//             key={time}
//             className={`btn btn-sm ${
//               isTimeSlotSelected(time)
//                 ? "bg-blue-500 hover:bg-blue-600 text-white"
//                 : isTimeSlotDisabled(time)
//                 ? "btn-disabled"
//                 : "btn-ghost"
//             }`}
//             onClick={() => handleTimeSelection(time)}
//             disabled={isTimeSlotDisabled(time)}
//           >
//             {time}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TimeSelection;


import { parse, isAfter, addHours } from "date-fns";
import { Clock } from "lucide-react";

const TimeSelection = ({
  availableTimes,
  selectedStartTime,
  handleTimeSelection,
  isTimeSlotBooked,
  timeSlots,
  duration,
}) => {
  const isTimeSlotSelected = (time) => {
    if (!selectedStartTime || !duration) return false;
    const start = parse(selectedStartTime, "hh:mm a", new Date());
    const end = addHours(start, duration);
    const current = parse(time, "hh:mm a", new Date());
    return current >= start && current < end;
  };

  const isTimeSlotDisabled = (time) => {
    const closeTime = parse(timeSlots.closeTime, "hh:mm a", new Date());
    const currentTime = parse(time, "hh:mm a", new Date());
    return isAfter(currentTime, closeTime) || isTimeSlotBooked(time);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-green-400 mr-2" />
        <h3 className="text-lg font-semibold">Select Start Time</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {availableTimes.map((time) => (
          <button
            key={time}
            className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isTimeSlotSelected(time)
                ? "bg-green-500 text-white shadow-lg transform scale-105"
                : isTimeSlotDisabled(time)
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleTimeSelection(time)}
            disabled={isTimeSlotDisabled(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;