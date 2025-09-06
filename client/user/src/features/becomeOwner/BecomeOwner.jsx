import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";
import useBecomeOwner from "../../hooks/useBecomeOwner";

const BecomeOwner = () => {
  const { register, handleSubmit, errors, onSubmit, loading } =
    useBecomeOwner();
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Join Our Premier Turf Owner Network
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expand your turf business reach, maximize occupancy, and streamline operations with our dedicated platform
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Application Form */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Application Form</h2>
              <p className="text-gray-400">Fill out your details and our team will contact you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                register={register}
                error={errors.name}
                placeholder="Enter your full name"
                darkMode={true}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                register={register}
                error={errors.email}
                placeholder="Enter your business email"
                darkMode={true}
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="text"
                register={register}
                error={errors.phone}
                placeholder="Enter your contact number"
                darkMode={true}
              />
              
              <div className="pt-4">
                <Button 
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg" 
                  loading={loading}
                >
                  Submit Application
                </Button>
              </div>
              
              <p className="text-center text-gray-400 text-sm mt-4">
                By submitting, you agree to our{" "}
                <a href="/terms" className="text-green-400 hover:underline">Terms of Service</a> and{" "}
                <a href="/privacy" className="text-green-400 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>

          {/* Benefits & Process Section */}
          <div className="space-y-8">
            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-green-900/30 text-green-400 p-2 rounded-lg mr-3">🚀</span>
                Why Join Our Platform?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="text-green-400 text-xl font-bold mb-2">30%</div>
                  <p className="text-gray-300">Average revenue increase for partners</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="text-green-400 text-xl font-bold mb-2">10,000+</div>
                  <p className="text-gray-300">Active players on our platform</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="text-green-400 text-xl font-bold mb-2">24/7</div>
                  <p className="text-gray-300">Booking management & support</p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="text-green-400 text-xl font-bold mb-2">0%</div>
                  <p className="text-gray-300">Commission for first 3 months</p>
                </div>
              </div>
            </div>

            {/* Process Card */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-blue-900/30 text-blue-400 p-2 rounded-lg mr-3">📋</span>
                Simple Onboarding Process
              </h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-900/30 text-green-400 font-bold flex items-center justify-center">1</div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Submit Your Application</h3>
                    <p className="text-gray-400">Fill out this simple form with your basic information</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 font-bold flex items-center justify-center">2</div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Quick Verification</h3>
                    <p className="text-gray-400">Our team will contact you to verify details</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 text-purple-400 font-bold flex items-center justify-center">3</div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Account Setup</h3>
                    <p className="text-gray-400">We'll help you set up your turf listings</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-teal-900/30 text-teal-400 font-bold flex items-center justify-center">4</div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-white">Start Receiving Bookings</h3>
                    <p className="text-gray-400">Begin managing reservations and growing your business</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Owner Privileges Card */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-yellow-900/30 text-yellow-400 p-2 rounded-lg mr-3">⭐</span>
                Owner Benefits
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-400 text-lg mr-2">✓</span>
                  <span className="text-gray-300">Free promotional listing</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 text-lg mr-2">✓</span>
                  <span className="text-gray-300">Smart booking management</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 text-lg mr-2">✓</span>
                  <span className="text-gray-300">Secure payment processing</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 text-lg mr-2">✓</span>
                  <span className="text-gray-300">Customer review system</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 text-lg mr-2">✓</span>
                  <span className="text-gray-300">Performance analytics dashboard</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 text-lg mr-2">✓</span>
                  <span className="text-gray-300">Dedicated support team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeOwner;