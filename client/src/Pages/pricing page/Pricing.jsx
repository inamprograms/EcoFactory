
import { useState } from 'react';
import Sidebar from '../../Components/sideBar/SBar';
import '../productOptimization/ProductOptimization.css'; // Import CSS file for additional styles
import PRICING_TABEL from '../../Assets/ICONS/PRICE_TABLE.svg'


export default function Pricing({children}) {
    const [collapsed, setCollapsed] = useState(false);


    return (
        <div id='productOptimization' style={{ display: 'flex', height: '100vh', minHeight: '400px' }} >

            <Sidebar collapsed={collapsed} />
            <main className='main' style={{ width: collapsed ? "100vw" : "77vw", backgroundColor: "#2f3135" }}>
                <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer", color: "#c1c1c1" }}>
                    {/* <span class="big-icon" style={iconStyles}>{collapsed ? <>&#187;</>: <>&#171;</>}</span> */}
                    <span className={`big-icon ${collapsed ? 'rotate-left' : 'rotate-right'}`} style={{ ...iconStyles, color: "#ccc", marginLeft: collapsed ? '-3px' : '-10px' }}>{collapsed ? <>&#187;</> : <>&#171;</>}</span>
                </div>
                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="container-fluid" style={{ height: "96vh" }}>
                        <div className="row" style={{ backgroundColor: "#c1c1c1", height: "15%", borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}>
                            <div className="col ms-5 d-flex justify-center align-center">
                                <h2 style={textStyle} className='my-auto '>{children ? children : "Plans"}</h2>
                            </div>
                        </div>

                        <div className="prompt-scroll-box row " style={{ backgroundColor: "#e6e6e6", height: "85%", borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px" }}>
                            <div className="scroll-inner ">
                                <div className="row mt-5 mb-3" style={{ backgroundColor: "#e6e6e6", height: "85%", borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px" }}>
                                    <div className="col d-flex flex-column justify-content-center align-items-center" style={{ margin: "0 auto", maxWidth: "800px" }}>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, commodi. Adipisci ex beatae nihil debitis eveniet, id ducimus! Quae assumenda perspiciatis recusandae cumque fugiat est.</p>
                                        <img src={PRICING_TABEL} className='my-3' alt="pricing-tabel" />
                                    </div>
                                </div>

                            </div>
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
    marginLeft: '-3px',
    zIndex: 3,
    transition: 'transform 0.3s ease' /* Add transition for smoother animation */
};

const textStyle = {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 700,
};
