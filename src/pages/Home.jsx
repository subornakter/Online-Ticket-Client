import React from 'react';
import Navbar from '../components/Navbar';
import AdvertisementSection from '../components/AdvertiseMentSection';
import LatestTickets from '../components/LatestTickets';
import TravelOptionsSection from '../components/TravelOptionsSection';
import StepsSection from '../components/StepsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import InstructionsSection from '../components/InstructionsSection';
import TravelServices from '../components/TravelServices';
import Banner from '../components/Banner';
const Home = () => {
    return (
        <div>
            <Banner/>
           <TravelServices/>
          <AdvertisementSection/>
          <StepsSection/>
          <LatestTickets/>
          <TravelOptionsSection/>  
          <WhyChooseUs/>
          <InstructionsSection/>
        </div>
    );
};

export default Home;