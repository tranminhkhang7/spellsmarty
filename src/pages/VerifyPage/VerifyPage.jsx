import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchVerifyAccount, verifyAccount } from '../../services/authServices';
import './VerifyPage.css'

const VerifyPage = () => {
    const { verifyToken } = useParams();
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        fetchVerifyAccount(verifyToken)
            .then((res) => {
                // console.log(res);
                navigate('/signin')
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
    }, [])

    return (
        <>
            <Navbar />
            {isError
                ?
                <section class="questions">
                    <dl class="question-list">
                        <dt class="question">Oops!</dt>
                        <dd class="answer">We have problems verifying your account. Please don't hesitate to contact us via <Link to='https://www.facebook.com/spellsmarty8' style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>Facebook</Link>, and we will make every effort to assist you as quickly as possible.</dd>
                        <dd class="answer"></dd>
                    </dl>
                </section>
                :
                <div class="loader"></div>
            }

        </>
    );
};

export default VerifyPage;
