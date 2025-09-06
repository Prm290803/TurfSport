import { format, addDays, isSameDay, startOfWeek, eachDayOfInterval, isToday, isBefore, endOfDay, isAfter } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const DateSelection = ({ selectedDate, handleDateChange }) => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  
  // Calculate the maximum selectable date (15 days from today)
  const maxSelectableDate = addDays(new Date(), 15);
  
  // Always show all 7 days of the week, but disable past dates and dates beyond 15 days
  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek),
    end: addDays(startOfWeek(currentWeek), 6)
  });

  const nextWeek = () => {
    const nextWeekDate = addDays(currentWeek, 7);
    // Only allow navigation if the next week contains selectable dates
    if (!isAfter(startOfWeek(nextWeekDate), maxSelectableDate)) {
      setCurrentWeek(nextWeekDate);
    }
  };

  const prevWeek = () => {
    const prevWeekDate = addDays(currentWeek, -7);
    // Only allow navigation if the previous week contains today or future dates
    if (!isBefore(endOfDay(addDays(prevWeekDate, 6)), new Date())) {
      setCurrentWeek(prevWeekDate);
    }
  };

  const isSelected = (date) => {
    return format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  };

  const isDateDisabled = (date) => {
    // Disable dates before today and dates more than 15 days in the future
    return isBefore(endOfDay(date), new Date()) || isAfter(date, maxSelectableDate);
  };

  // Check if next week button should be disabled
  const isNextWeekDisabled = () => {
    const nextWeekStart = addDays(currentWeek, 7);
    return isAfter(startOfWeek(nextWeekStart), maxSelectableDate);
  };

  // Check if previous week button should be disabled
  const isPrevWeekDisabled = () => {
    const prevWeekStart = addDays(currentWeek, -7);
    return isBefore(endOfDay(addDays(prevWeekStart, 6)), new Date());
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-lg font-semibold">Select Date</h3>
        </div>
        <div className="text-sm text-gray-400">
          Available until {format(maxSelectableDate, "MMM dd")}
        </div>
      </div>
      
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevWeek}
          disabled={isPrevWeekDisabled()}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-lg font-medium">
          {format(currentWeek, "MMMM yyyy")}
        </span>
        
        <button
          onClick={nextWeek}
          disabled={isNextWeekDisabled()}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Headers - Always show 7 days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid - Show all 7 days but disable unavailable ones */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((date) => {
          const disabled = isDateDisabled(date);
          const selected = isSelected(date);
          const today = isToday(date);
          
          return (
            <button
              key={date.toString()}
              onClick={() => !disabled && handleDateChange(date)}
              disabled={disabled}
              className={`p-3 rounded-xl text-center transition-all duration-200 relative ${
                selected
                  ? "bg-green-500 text-white shadow-lg"
                  : disabled
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                  : today
                  ? "bg-blue-500/20 text-blue-300 border border-blue-400"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <div className="text-sm font-medium">
                {format(date, "d")}
              </div>
              {today && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
              )}
              {isAfter(date, maxSelectableDate) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
              )}
            </button>
          );
        })}
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
          className={`flex-1 px-3 py-2 rounded-xl text-sm transition-colors ${
            isToday(selectedDate) 
              ? "bg-green-500 text-white" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => {
            const tomorrow = addDays(new Date(), 1);
            if (!isDateDisabled(tomorrow)) {
              handleDateChange(tomorrow);
            }
          }}
          disabled={isDateDisabled(addDays(new Date(), 1))}
          className={`flex-1 px-3 py-2 rounded-xl text-sm transition-colors ${
            isSameDay(selectedDate, addDays(new Date(), 1))
              ? "bg-green-500 text-white" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          Tomorrow
        </button>
        <button
          onClick={() => {
            const nextWeek = addDays(new Date(), 7);
            if (!isDateDisabled(nextWeek)) {
              handleDateChange(nextWeek);
            }
          }}
          disabled={isDateDisabled(addDays(new Date(), 7))}
          className={`flex-1 px-3 py-2 rounded-xl text-sm transition-colors ${
            isSameDay(selectedDate, addDays(new Date(), 7))
              ? "bg-green-500 text-white" 
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          Next Week
        </button>
      </div>
    </div>
  );
};

export default DateSelection;