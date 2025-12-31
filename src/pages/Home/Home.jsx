import React from 'react';
import Hero from '../../components/Hero/Hero';
import AdvertisedTicket from '../../components/AdvertisedTicket/AdvertisedTicket';
import LatestTicket from '../../components/LatestTicket/LatestTicket';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import PopularRoutes from '../../components/PopularRoutes/PopularRoutes';
import Testimonials from '../../components/Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero />
            <AdvertisedTicket />
            <LatestTicket />
            <PopularRoutes />
            <WhyChooseUs />
            <Testimonials />
        </div>
    );
};

export default Home;