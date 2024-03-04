import React, { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import './ProductOptimization.css'; // Import CSS file for additional styles
export default function ProductOptimization() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div style={{ display: 'flex', height: '100vh', minHeight: '400px' }}>
            <Sidebar collapsed={collapsed} style={{ display: collapsed ? "none" : "block" }}>
                {/* side bar content  */}
                {/* Aleeza you have to work here */}
            </Sidebar>
            <main style={{ width: "100vw" }}>
                <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer" }}>
                    {/* <span class="big-icon" style={iconStyles}>{collapsed ? <>&#187;</>: <>&#171;</>}</span> */}
                    <span className={`big-icon ${collapsed ? 'rotate-left' : 'rotate-right'}`} style={{ ...iconStyles, color: "#ccc" }}>{collapsed ? <>&#187;</> : <>&#171;</>}</span>
                </div>
                <div className="container-fluid bg-dark" style={{ height: "100vh" }}>
                    <div className="row">
                        <div className="col">
                            {/* main content */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const iconStyles = {
    fontSize: '2em',
    lineHeight: '1em',
    position: 'absolute',
    top: '50%',
    marginLeft: '1px',
    zIndex: 3,
    transition: 'transform 0.3s ease' /* Add transition for smoother animation */
};
