import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'

const Home = () => {
    return (
        <div className="bg-[#0D1117] min-h-screen">
            <Navbar />

            <main>
                <Hero />
            </main>
            <Footer />
        </div>
    )
}

export default Home
