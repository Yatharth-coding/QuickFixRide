import React, { useState } from 'react';
import ReactSlick from 'react-slick';
const Slider = ReactSlick.default || ReactSlick;
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../assets/css/project.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const heroSettings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: true,
  };

  const reviewSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does 3C ensure transparency in car repairs?",
      answer: "3C ensures transparency by providing live tracking of vehicle pickup and drop-off, as well as real-time updates on the progress of car repairs through a job card. This allows you to stay informed about the status of your vehicle at all times."
    },
    {
      question: "What is included in the basic services package?",
      answer: "The basic services package includes a full inspection, oil change, brake check, and tire rotation."
    },
    {
      question: "How can I be sure that I'm being fairly charged for the car repairs?",
      answer: "We provide a detailed breakdown of the costs involved and ensure all charges are transparent and communicated upfront before the work begins."
    },
    {
      question: "What if I have specific preferences or requirements for my car repairs?",
      answer: "We allow you to customize the repairs to your preferences. You can communicate your requirements when booking a service."
    },
    {
      question: "Can I provide feedback on the service received through 3C?",
      answer: "Yes, we encourage you to provide feedback after your service to help us improve the quality of our service."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="wholepageexeptbottom">
        <header></header>

        <main>
          <section className="hero" style={{ overflow: 'hidden' }}>
            <Slider {...heroSettings} className="slick-slider">
              <div><img src="/images/7.png" alt="Placeholder 1" style={{width: '100%'}} /></div>
              <div><img src="/images/2.png" alt="Placeholder 2" style={{width: '100%'}} /></div>
              <div><img src="/images/3.png" alt="Placeholder 3" style={{width: '100%'}} /></div>
              <div><img src="/images/4.png" alt="Placeholder 4" style={{width: '100%'}} /></div>
              <div><img src="/images/5.png" alt="Placeholder 5" style={{width: '100%'}} /></div>
              <div><img src="/images/6.png" alt="Placeholder 6" style={{width: '100%'}} /></div>
            </Slider>
          </section>

          <section className="services">
            <h2>How does 3C Work</h2>
            <div className="service-list">
              <div className="service-item1">
                <img src="/images/const.webp" alt="Consult Service" />
                <h3>Consult With Our Service Expert</h3>
                <p>Speak directly with our car service experts who will guide you through the process, answer your queries, and ensure you receive the best car repair solutions tailored to your needs.</p>
              </div>
              <div className="service-item1">
                <img src="/images/2.webp" alt="Free Pickup" />
                <h3>Schedule Your Car's Free Pickup</h3>
                <p>Book a convenient time for 3C to pick up your car from your location, saving you time and effort in getting your vehicle to the garage.</p>
              </div>
              <div className="service-item1">
                <img src="/images/img.webp" alt="Inspection and Estimation" />
                <h3>Get Inspection & Estimation Done</h3>
                <p>Vehicles are inspected by professionals and you receive accurate cost estimates for repairs, ensuring transparency and peace of mind.</p>
              </div>
            </div>
          </section>

          <section className="review">
            <div className="review-heading">
              <h2>Customer Review </h2>
            </div>
            <Slider {...reviewSettings} className="slick-slider2" style={{ overflow: 'hidden' }}>
              <div><img src="/images/Frame1.png" alt="Placeholder 1" style={{width: '100%', padding: '0 10px'}} /></div>
              <div><img src="/images/Frame2.png" alt="Placeholder 2" style={{width: '100%', padding: '0 10px'}} /></div>
              <div><img src="/images/Frame3.png" alt="Placeholder 3" style={{width: '100%', padding: '0 10px'}} /></div>
              <div><img src="/images/Frame4.png" alt="Placeholder 4" style={{width: '100%', padding: '0 10px'}} /></div>
            </Slider>
          </section>

          <section className="faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.question}
                  </button>
                  <div className="faq-answer" style={{ display: activeFaq === index ? 'block' : 'none' }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default Home;
