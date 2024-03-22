import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className="w-full h-16 flex items-center px-4 lg:px-14 justify-between bg-teal-600">
                <Link to={"/"} className="text-3xl text-teal-200 font-semibold font-Montserrat">Fluent</Link>
                <div className="flex space-x-4"> {/* Use flex and space-x for spacing */}
                    <Link to={"/companies"} className="nav-link btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Companies</Link>
                    <Link to={"/peoples"} className="nav-link btn bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Peoples</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
