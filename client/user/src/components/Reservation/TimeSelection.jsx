import { parse, isAfter, addHours, isBefore, format } from "date-fns";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

const TimeSelection = ({
  availableTimes,
  selectedStartTime,
  handleTimeSelection,
  isTimeSlotBooked,
  timeSlots,
  duration,
  selectedDate // Add selectedDate prop to know which date is selected
}) => {
  // Get current date and time
  const [now, setNow] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Create a date object for the selected date and time
  const getTimeDate = (time) => {
    if (!selectedDate) return parse(time, "hh:mm a", new Date());
    
    // Parse the time string and set it to the selected date
    const timeDate = new Date(selectedDate);
    const parsedTime = parse(time, "hh:mm a", new Date());
    timeDate.setHours(parsedTime.getHours());
    timeDate.setMinutes(parsedTime.getMinutes());
    timeDate.setSeconds(0);
    timeDate.setMilliseconds(0);
    
    return timeDate;
  };

  // Check if the selected date is today
  const isSelectedDateToday = () => {
    if (!selectedDate) return true;
    
    const today = new Date();
    return selectedDate.getDate() === today.getDate() &&
           selectedDate.getMonth() === today.getMonth() &&
           selectedDate.getFullYear() === today.getFullYear();
  };

  // Filter out times that are before the current time (only for today)
  const filteredAvailableTimes = availableTimes.filter(time => {
    // If the selected date is not today, show all available times
    if (!isSelectedDateToday()) return true;
    
    // For today, filter out past times
    const timeDate = getTimeDate(time);
    return isAfter(timeDate, now) || 
           (timeDate.getHours() === now.getHours() && 
            timeDate.getMinutes() >= now.getMinutes());
  });

  const isTimeSlotSelected = (time) => {
    if (!selectedStartTime || !duration) return false;
    
    const start = getTimeDate(selectedStartTime);
    const end = addHours(start, duration);
    const current = getTimeDate(time);
    
    return current >= start && current < end;
  };

  const isTimeSlotDisabled = (time) => {
    const timeDate = getTimeDate(time);
    const closeTime = getTimeDate(timeSlots.closeTime);
    
    // For today, disable if time is before current time
    if (isSelectedDateToday() && isBefore(timeDate, now)) {
      return true;
    }
    
    // Always disable if time is after close time or already booked
    return isAfter(timeDate, closeTime) || isTimeSlotBooked(time);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-green-400 mr-2" />
        <h3 className="text-lg font-semibold">Select Start Time</h3>
      </div>
      
      {selectedDate && (
        <div className="flex items-center mb-3 text-sm text-gray-400">
          <span>Selected date: {format(selectedDate, "MMM dd, yyyy")}</span>
          {isSelectedDateToday() && (
            <span className="ml-4">Current time: {format(now, "hh:mm a")}</span>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {filteredAvailableTimes.map((time) => (
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