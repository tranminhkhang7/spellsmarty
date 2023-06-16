import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './AboutPage.css';
import Footer from '../../components/Navbar/Footer';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <header className="masthead">
        <p className="masthead-intro">Hi, We&rsquo;re</p>
        <h1 className="masthead-heading">SpellSmarty</h1>
      </header>
      <section className="questions">
        <dl className="question-list">
          <dt className="question">Who are we?</dt>
          <dd className="answer">
            We are a passionate group of friends driven by the spirit of entrepreneurship. Our
            shared goal is to guide individuals in achieving English mastery through the most
            efficient and expedient methods available.
          </dd>
        </dl>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
