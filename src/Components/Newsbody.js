import React, { useState } from 'react'
import Newsitem from './Newsitem'
import { Routes, Route } from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

export default function Newsbody() {

    const [progress, setProgress] = useState(10)

    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                shadow={true}
            />
            <Routes>
                <Route exact path='/' element={<Newsitem setProgress={setProgress} key='general' catagory='general' />}></Route>
                <Route exact path='/business' element={<Newsitem setProgress={setProgress} key='business' catagory='business' />}></Route>
                <Route exact path='/entertainment' element={<Newsitem setProgress={setProgress} key='entertainment' catagory='entertainment' />}></Route>
                <Route exact path='/health' element={<Newsitem setProgress={setProgress} key='health' catagory='health' />}></Route>
                <Route exact path='/science' element={<Newsitem setProgress={setProgress} key='science' catagory='science' />}></Route>
                <Route exact path='/sports' element={<Newsitem setProgress={setProgress} key='sports' catagory='sports' />}></Route>
                <Route exact path='/technology' element={<Newsitem setProgress={setProgress} key='technology' catagory='technology' />}></Route>
            </Routes>
        </>
    )
}
