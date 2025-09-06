import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import DurationSelection from "./DurationSelection";
import ReservationSummary from "./ReservationSummary";
import useReservation from "../../hooks/useReservation";
import ReservationSkeleton from "../ui/ReservationSkeleton";

const Reservation = () => {
  const {
    selectedDate,
    selectedStartTime,
    duration,
    availableTimes,
    timeSlots,
    pricePerHour,
    handleDateChange,
    handleTimeSelection,
    handleDurationChange,
    isTimeSlotBooked,
    isDurationAvailable,
    confirmReservation,
    loading,
  } = useReservation();

  if (loading) return <ReservationSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Reserve Your Turf</h1>
          <p className="text-gray-400">Select your preferred date and time for the perfect game</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Selection Forms */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <DateSelection
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
              
              <TimeSelection
                availableTimes={availableTimes}
                selectedStartTime={selectedStartTime}
                handleTimeSelection={handleTimeSelection}
                isTimeSlotBooked={isTimeSlotBooked}
                timeSlots={timeSlots}
                duration={duration}
              />
              
              {selectedStartTime && (
                <DurationSelection
                  selectedStartTime={selectedStartTime}
                  duration={duration}
                  handleDurationChange={handleDurationChange}
                  isDurationAvailable={isDurationAvailable}
                />
              )}

              <div className="mt-6">
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:from-green-600 hover:to-blue-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={
                    !selectedStartTime ||
                    !isDurationAvailable(selectedStartTime, duration) ||
                    loading
                  }
                  onClick={confirmReservation}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Confirm Reservation"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Reservation Summary */}
          <div className="lg:col-span-1">
            {selectedStartTime && duration > 0 && (
              <div className="sticky top-6">
                <ReservationSummary
                  selectedDate={selectedDate}
                  selectedStartTime={selectedStartTime}
                  duration={duration}
                  pricePerHour={pricePerHour}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;