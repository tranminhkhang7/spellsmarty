import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { fetchVerifyAccount, verifyAccount } from '../../services/authServices';

const VerifyPage = () => {
    const { verifyToken } = useParams();

    useEffect(() => {
        fetchVerifyAccount(verifyToken)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <Navbar />
            <p>this is verify page</p>
        </>
    );
};

export default VerifyPage;
