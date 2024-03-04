import React, { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
export default function SBar() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
            <Sidebar collapsed={collapsed} >
                {/* <Menu>
                    <MenuItem> Documentation</MenuItem>
                    <MenuItem> Calendar</MenuItem>
                    <MenuItem> E-commerce</MenuItem>
                    <MenuItem> Examples</MenuItem>
                </Menu> */}
                <h1>Hello</h1>
            </Sidebar>
            <main >
                <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer" }}>
                    <div class="big-icon" style={iconStyles}>&#171;</div>
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
    marginLeft: '-9px',
    zIndex: 3
};
