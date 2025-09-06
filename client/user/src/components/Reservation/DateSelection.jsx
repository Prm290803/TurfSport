// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, addDays, isSameDay } from "date-fns";

// const DateSelection = ({ selectedDate, handleDateChange }) => {
//   return (
//     <div className="flex flex-col space-y-4 mb-6">
//       <div className="w-full">
//         <label className="label">
//           <span className="label-text">Select Date</span>
//         </label>
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="dd-MM-yyyy"
//           minDate={new Date()}
//           className="input input-bordered w-full"
//         />
//       </div>
//       <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//         <button
//           className="btn btn-outline btn-sm w-full sm:w-auto"
//           onClick={() => handleDateChange(addDays(selectedDate, -1))}
//           disabled={isSameDay(selectedDate, new Date())}
//         >
//           PREV DATE
//         </button>
//         <div className="badge badge-primary text-lg p-4">
//           {format(selectedDate, "dd-MM-yyyy")}
//         </div>
//         <button
//           className="btn btn-outline btn-sm w-full sm:w-auto"
//           onClick={() => handleDateChange(addDays(selectedDate, 1))}
//         >
//           NEXT DATE
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DateSelection;

import { format, addDays, isSameDay, startOfWeek, eachDayOfInterval, isToday } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DateSelection = ({ selectedDate, handleDateChange }) => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek),
    end: addDays(startOfWeek(currentWeek), 6)
  });

  const nextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const prevWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const isSelected = (date) => {
    return format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  };

  const isDateDisabled = (date) => {
    return date < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Calendar className="w-5 h-5 text-green-400 mr-2" />
        <h3 className="text-lg font-semibold">Select Date</h3>
      </div>
      
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevWeek}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-lg font-medium">
          {format(currentWeek, "MMMM yyyy")}
        </span>
        
        <button
          onClick={nextWeek}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((date) => (
          <button
            key={date.toString()}
            onClick={() => !isDateDisabled(date) && handleDateChange(date)}
            disabled={isDateDisabled(date)}
            className={`p-3 rounded-xl text-center transition-all duration-200 relative ${
              isSelected(date)
                ? "bg-green-500 text-white shadow-lg"
                : isDateDisabled(date)
                ? "bg-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                : isToday(date)
                ? "bg-blue-500/20 text-blue-300 border border-blue-400"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <div className="text-sm font-medium">
              {format(date, "d")}
            </div>
            {isToday(date) && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Date Display */}
      <div className="bg-green-500/10 text-green-400 px-4 py-3 rounded-xl font-medium text-center">
        {isToday(selectedDate) ? "Today: " : "Selected: "}
        {format(selectedDate, "dd-MM-yyyy")}
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleDateChange(new Date())}
          className="flex-1 bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-xl text-sm transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => handleDateChange(addDays(new Date(), 1))}
          className="flex-1 bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-xl text-sm transition-colors"
        >
          Tomorrow
        </button>
        <button
          onClick={() => handleDateChange(addDays(new Date(), 7))}
          className="flex-1 bg-gray-800 text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-xl text-sm transition-colors"
        >
          Next Week
        </button>
      </div>
    </div>
  );
};

export default DateSelection;