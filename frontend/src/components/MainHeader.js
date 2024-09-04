import React from "react";
import { Outlet } from "react-router-dom";

function MainHeader(){
    return( 
        <div>
            <Outlet></Outlet>
            <p></p>
        </div>
     );
};

export default MainHeader;    