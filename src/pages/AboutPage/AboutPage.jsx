import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./AboutPage.css"
import Footer from '../../components/Navbar/Footer';

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <header class="masthead">
                <p class="masthead-intro">Hi, We&rsquo;re</p>
                <h1 class="masthead-heading">SpellSmarty</h1>
            </header>
            <section class="questions">
                <dl class="question-list">
                    <dt class="question">Who are we?</dt>
                    <dd class="answer">We are a passionate group of friends driven by the spirit of entrepreneurship. Our shared goal is to guide individuals in achieving English mastery through the most efficient and expedient methods available.</dd>
                </dl>
            </section>
            <Footer />
        </>
    );
};

export default AboutPage;
