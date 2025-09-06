import { Link } from "react-router-dom";
import { Carousel, Footer } from "@components/common";
import banner1 from "/banner-1.png";
import banner2 from "/banner-2.jpeg";
import banner3 from "/banner-3.jpeg";

const OwnerHome = () => {
  const slides = [banner1, banner2, banner3];

  // Stats focused on owner benefits
  const stats = [
    { value: "30%", label: "More Revenue" },
    { value: "50%", label: "Time Saved" },
    { value: "10K+", label: "Active Players" },
    { value: "0%", label: "Commission Fee" },
  ];

  // Features for turf owners
  const features = [
    {
      title: "Easy Management",
      description: "Manage bookings, availability, and pricing all in one place with our intuitive dashboard.",
      icon: "📊"
    },
    {
      title: "Increased Visibility",
      description: "Get discovered by thousands of sports enthusiasts in your area looking for quality turfs.",
      icon: "👀"
    },
    {
      title: "Smart Scheduling",
      description: "Avoid double bookings and optimize your turf utilization with our smart calendar system.",
      icon: "📅"
    },
    {
      title: "Secure Payments",
      description: "Receive payments securely and on time with our integrated payment processing system.",
      icon: "💳"
    },
    {
      title: "Performance Analytics",
      description: "Track your business performance with detailed analytics and insights about your customers.",
      icon: "📈"
    },
    {
      title: "Dedicated Support",
      description: "Get 24/7 support from our team to help you maximize your turf business potential.",
      icon: "🛟"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br md:pt-0 from-gray-900 to-gray-950 text-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-green-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Grow Your Turf Business</span>
                <span className="block mt-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  With Book n Play
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join the leading platform for sports turf management. Maximize your occupancy, 
                streamline bookings, and boost your revenue with our powerful tools designed for turf owners.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  to="/signup"
                  className="btn bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                >
                  List Your Turf
                </Link>
                <Link
                  to="/"
                  className="btn btn-outline border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 rounded-xl font-bold transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image Carousel */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Carousel slides={slides} autoPlay={true} />
                <div className="absolute bottom-4 left-4 bg-gray-900/80 text-white px-4 py-2 rounded-full text-sm">
                  Join 500+ Successful Partners
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform is designed specifically for turf owners to help you grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/*  */}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Turf Business?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join hundreds of successful turf owners who are already maximizing their revenue with Book n Play
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="btn bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              to=""
              className="btn btn-outline border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 rounded-xl font-bold transition-all duration-300"
            >
              Request a Demo
            </Link>
          </div>
          <p className="text-gray-400 mt-6">No credit card required • Free 30-day trial</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OwnerHome;