import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Form } from "./Form";

export const Routing=()=>{

    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/form" element={<Form/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}