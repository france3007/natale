import React from "react";
import ChiSiamo from "../components/chisiamo";
import Servizi from '../components/servizi';
import Info from'../components/info';
export default function Home() {
    return(
        <>
            <ChiSiamo />
            <Servizi />
            <Info />
        </>
    );
}