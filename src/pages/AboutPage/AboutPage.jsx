import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./AboutPage.css"
import Footer from '../../components/Navbar/Footer';

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <header class="masthead">
                <p class="masthead-intro">Hi, I&rsquo;m</p>
                <h1 class="masthead-heading">KHANG!</h1>
            </header>
            <section class="questions">
                <dl class="question-list">
                    <dt class="question">What are your favorite hobbies?</dt>
                    <dd class="answer">I&rsquo;m a huge gamer. I also <strong>LOVE</strong> food. I&rsquo;m always trying new cuisine. Foodies unite!</dd>
                    <dt class="question">What&rsquo;s your dream job?</dt>
                    <dd class="answer">I&rsquo;d love to open my own mobile game studio in the future!</dd>
                    <dt class="question">What&rsquo;s your background?</dt>
                    <dd class="answer">I&rsquo;ve been programming since I was in middle school. I decided to go to school for design because I love front-end and felt like I needed more help with the design side than the programming side.</dd>
                    <dt class="question">What music have you been listening to lately?</dt>
                    <dd class="answer">I&rsquo;ve been listening to a ton of <a href="https://soundcloud.com/rynweaver/promises">Ryn Weaver</a> lately, ever since her first EP came out in late July.</dd>
                </dl>
            </section>
            <Footer />
        </>
    );
};

export default AboutPage;
