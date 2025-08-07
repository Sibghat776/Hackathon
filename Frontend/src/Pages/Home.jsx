import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1 className='bg-black text-white text-center text-5xl p-5'>Home Page</h1>
            <Link to={"/register"} className='flex justify-center items-center'>
            <button>Register</button>
            </Link>
        </>
    )
};

export default Home;