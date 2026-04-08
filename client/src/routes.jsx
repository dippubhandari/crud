import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UpdateProfileUI from './updata'
import Home from './home'

const AppRoutes = () => {
    return (
        <div>

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/update-data/:id' element={<UpdateProfileUI />} />
                <Route path='*' element={"Page Not Found"} />

            </Routes>

        </div>
    )
}

export default AppRoutes