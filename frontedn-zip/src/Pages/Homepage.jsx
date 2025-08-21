import React from 'react';

// Import all necessary components with correct paths
import MainCarousel from '../customer/Components/Carousel/HomeCarousel.jsx'; // Corrected path
import HomeFeatures from '../customer/Components/Home/HomeFeatures.jsx';
import HomeFeaturedProducts from '../customer/Components/Home/HomeFeaturedProducts.jsx';
// import HomeCategories from '../customer/Components/Home/HomeCategories.jsx';
import HomeSpecialOffers from '../customer/Components/Home/HomeSpecialOffers.jsx';
import HomeCTASection from '../customer/Components/Home/HomeCTASection.jsx';
import HomePrescription from '../customer/Components/Home/HomePrescription.jsx';
import HomeBrands from '../customer/Components/Home/HomeBrands.jsx';
import HomeReviews from '../customer/Components/Home/HomeReviews.jsx';

const Homepage = () => {
  return (
    <div className='space-y-10'>
      {/* Main Hero Section */}
      <MainCarousel />
      
      {/* Features Section */}
      <HomeFeatures />

      {/* Featured Products Section */}
      <HomeFeaturedProducts />

      {/* Top Categories Carousel */}
      {/* <HomeCategories /> */}

      {/* Special Offers Section */}
      <HomeSpecialOffers />

      {/* CTA Banners */}
      <HomeCTASection />

      {/* Prescription and Doctor Section */}
      <HomePrescription />

      {/* Popular Brands Section */}
      <HomeBrands />

      {/* Customer Reviews Section */}
      <HomeReviews />
    </div>
  );
};

export default Homepage;