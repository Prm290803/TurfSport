import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "../components/common/Carousel";
import Footer from "../components/layout/Footer";
import useTurfData from "../hooks/useTurfData";
import TurfCard from "../components/turf/TurfCard";
import TurfCardSkeleton from "../components/ui/TurfCardSkeleton";
import banner1 from "/banner-1.png";
import banner2 from "/banner-2.jpeg";
import banner3 from "/banner-3.jpeg";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { turfs, loading } = useTurfData();
  const slides = [banner1, banner2, banner3];

  // Stats data
  const stats = [
    { value: "50+", label: "Premium Turfs" },
    { value: "24/7", label: "Availability" },
    { value: "10K+", label: "Happy Players" },
    { value: "4.9/5", label: "Rating" },
  ];

  // Features data
  const features = [
    { 
      icon: "⏱️", 
      title: "Quick Booking", 
      description: "Book your favorite turf in just a few clicks with our intuitive platform" 
    },
    { 
      icon: "⭐", 
      title: "Quality Turfs", 
      description: "Professional-grade facilities maintained to the highest standards" 
    },
    { 
      icon: "💰", 
      title: "Best Prices", 
      description: "Competitive pricing with transparent costs and no hidden fees" 
    },
    { 
      icon: "🏆", 
      title: "Tournaments", 
      description: "Regular tournaments and competitive events for all skill levels" 
    },
  ];

  // // Testimonials
  // const testimonials = [
  //   {
  //     text: "The best turf booking platform I've used. The fields are always in perfect condition!",
  //     author: "Alex Johnson",
  //     role: "Amateur Footballer"
  //   },
  //   {
  //     text: "Booking is so easy and the customer support is fantastic. Highly recommend!",
  //     author: "Sarah Williams",
  //     role: "Cricket Team Captain"
  //   },
  //   {
  //     text: "Great variety of turfs and the pricing is very reasonable. 5-star experience!",
  //     author: "Mike Chen",
  //     role: "Weekly Player"
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-green-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Find & Book</span>
                <span className="block mt-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Premium Sports Turfs
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover the best turf fields in your area with instant booking, 
                real-time availability, and competitive prices. Your perfect game starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  to={isLoggedIn ? "/auth/turfs" : "/signup"}
                  className="btn bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                >
                  {isLoggedIn ? "Book Now" : "Get Started"}
                </Link>
                <Link
                  to="/turfs"
                  className="btn btn-outline border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 rounded-xl font-bold transition-all duration-300"
                >
                  Browse Turfs
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
                  Premium Turfs Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Turfs Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Turfs</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore our most popular and highly-rated turf facilities. Perfect for football, cricket, and other sports.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <TurfCardSkeleton key={`skeleton-${index}`} />
                ))
              : turfs
                  .slice(0, 6)
                  .map((turf) => <TurfCard key={turf._id} turf={turf} />)}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to={isLoggedIn ? "/auth/turfs" : "/turfs"}
              className="btn bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 px-8 py-3 rounded-xl font-bold"
            >
              View All Turfs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose BOOK'N'PLAY?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We provide the best platform for sports enthusiasts to book premium turfs with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-2xl hover:bg-gray-750 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Players Say</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Hear from our community of sports enthusiasts who have experienced the BOOK'N'PLAY difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Play?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of players who book their games through BOOK'N'PLAY. 
            Experience the difference of premium turf booking.
          </p>
          <Link
            to={isLoggedIn ? "/auth/turfs" : "/signup"}
            className="btn bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white hover:from-green-600 hover:to-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoggedIn ? "Book Now" : "Sign Up Now"}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;