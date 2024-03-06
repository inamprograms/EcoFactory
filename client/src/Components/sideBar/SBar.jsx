import { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import BADGE_PRO from "../../Assets/ICONS/BADGE_PRO.svg";
import colorBar from "../../Assets/ICONS/COLORBAR.png";
import ICON_CUSTOM_GPT from "../../Assets/ICONS/ICON_CUSTOM_GPT.svg";
import ICON_ESG from '../../Assets/ICONS/ICON_ESG_GUIDELINE.svg';
import ICON_ESG_ACTIVE from '../../Assets/ICONS/ICON_ESG_GUIDELINE active.svg';

import GPT_AI from "../../Assets/ICONS/ICON_GPT4.svg";
import GPT_AI_ACTIVE from "../../Assets/ICONS/ICON_GPT4 active.svg";

import ICON_GUIDLINES from '../../Assets/ICONS/ICON_GUIDELINE_DATABASE.svg';
import ICON_INTEGRATION from '../../Assets/ICONS/ICON_INTEGRATIONS.svg';
import ICON_MATERIAL from '../../Assets/ICONS/ICON_MATERIALS.svg';
import ICON_MOON from "../../Assets/ICONS/ICON_MOON.svg";
import ICON_OPTIMIZATION from '../../Assets/ICONS/ICON_OPTIMIZER.svg';
import ICON_OPTIMIZATION_ACTIVE from '../../Assets/ICONS/ICON_OPTIMIZER active.svg';

import ICON_PRODUCT from "../../Assets/ICONS/ICON_PRODUCTS.svg";
import ICON_SUN from "../../Assets/ICONS/ICON_SUN.svg";
import ICON_SUPLIERS from '../../Assets/ICONS/ICON_SUPPLIERS.svg';
import ecofactor from "../../Assets/ICONS/LOGO_ECOFACTOR_FINAL (1).svg";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function SBar({ collapsed }) {
    const [showChats, setShowChats] = useState(true);


    const path = useLocation().pathname
    console.log(path);

    const inventoryData = [
        { icon: ICON_PRODUCT, title: 'Products Catalog' },
        { icon: ICON_MATERIAL, title: 'Material Catalog' },
        { icon: ICON_SUPLIERS, title: 'Supplier Directory' },
        { icon: ICON_GUIDLINES, title: 'USG Guidlines' },
    ]

    const pages = [
        { icon: ICON_OPTIMIZATION, iconActive: ICON_OPTIMIZATION_ACTIVE, title: 'Products Optimization', to: '/' },
        { icon: ICON_ESG, iconActive: ICON_ESG_ACTIVE, title: 'ESG Guidline Checker', to: '/esg-guidlines' },
        { icon: GPT_AI, iconActive: GPT_AI_ACTIVE, title: 'New Regular ChatGPT 4', to: '' },
        { icon: ICON_CUSTOM_GPT, title: 'Create Custom GPT', subTitle: "(Upgrade plan)", disable: true, to: '' },
        { icon: ICON_INTEGRATION, title: 'Integrations', subTitle: "(Upgrade plan)", disable: true, to: '' },

    ]

    const historyChats = [
        { icon: ICON_OPTIMIZATION, title: 'History chat conversation 1' },
        { icon: ICON_ESG, title: 'History chat conversation 2' },
        { icon: ICON_OPTIMIZATION, title: 'History chat conversation 3' },



    ]

    return (
        <Sidebar className='sideBar' collapsed={collapsed} style={{ display: collapsed ? "none" : "block", width: '23vw', position: "relative" }}>
            {/* side bar content  */}
            {/* Aleeza you have to work here */}
            <div className="container-fluid sideBar-scroll " style={{ backgroundColor: "#2f3135", height: '100vh', }}>
                <div>
                    <img src={colorBar} alt="" style={{ width: "100%", position: "relative", top: "-14px", left: "-7px" }} />
                    <div className="row">
                        <div className="col px-4 my-2 "><img src={ecofactor} alt="" style={{ height: '4.2rem', width: "100%", marginLeft: '.7rem' }} /></div>
                    </div>

                    <div className="row ">
                        <div className="col mx-3 me-1 rounded p-2 " style={{ backgroundColor: "#494c51", }}>
                            <h6 className='text-white text-center' >Inventory</h6>
                            <div className="d-flex gap-2 ">
                                {inventoryData.map((currElm) => {
                                    return (
                                        <>
                                            <div className='px-3' style={{ paddingTop: "10px", paddingBottom: "9px", backgroundColor: "#2f3135", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', borderRadius: "10px" }}>
                                                <img src={currElm.icon} alt="icon-one" style={{ fill: "red", width: '1.5rem' }} />
                                                <p className='text-center mt-2 mb-0' style={{ color: "#999999", fontSize: ".7rem" }}>{currElm.title}</p>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-box">
                    <div className="scroll-inner">
                        <div className="row">
                            <div className="col mx-3 mt-5 " >

                                {pages.map((currElm) => {
                                    return (
                                        <>
                                            <Link to={currElm.to} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: currElm.disable && "not-allowed", color: currElm.disable ? "#666" : currElm.to === path ? "#1bd4ad" : "#f2f2f2", textDecoration: "none", marginBottom: ".7rem" }}>
                                                <span>
                                                    <img src={currElm.to === path ? currElm.iconActive : currElm.icon} alt="icon" style={{ width: '1.5rem', marginRight: ".9rem" }} />
                                                    <span>{currElm.title} <small>{currElm.subTitle}</small></span>
                                                </span>
                                                <BiDotsHorizontalRounded />
                                            </Link>
                                        </>
                                    )
                                })}
                                <hr className='text-secondary mt-4 mb-2' />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mx-3">
                                <div className={`${showChats ? "mb-2" : "mb-0"}`}>
                                    <button onClick={() => setShowChats((prev) => !prev)} className='border-0 bg-transparent text-white me-4  fs-4'>{showChats ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</button> <span style={{ fontWeight: 'normal', color: "#666666", fontSize: "1.1rem" }}>chats</span>
                                </div>
                                {showChats && historyChats.map((currElm) => {
                                    return (
                                        <>
                                            <Link style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: '#f2f2f2', textDecoration: "none", marginBottom: ".7rem" }}>
                                                <div>
                                                    <img src={currElm.icon} alt="icon" style={{ width: '1.5rem', marginRight: ".9rem" }} />
                                                    <span>{currElm.title}</span>
                                                </div>
                                                <BiDotsHorizontalRounded />
                                            </Link>
                                        </>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row bottom-user text-white  " style={{ backgroundColor: "#2f3135", textAlign: "center", width: "100%", }}>
                    <div className="col mt-5 " >
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <img className='rounded-pill' src={"https://camo.githubusercontent.com/1e6de73a5a5d1800c3f18f294e4b019466d6daa7ac4ddbe713afc5e3ac062547/68747470733a2f2f6d656469612e6c6963646e2e636f6d2f646d732f696d6167652f4434443033415148556d6b357863444d6574412f70726f66696c652d646973706c617970686f746f2d736872696e6b5f3430305f3430302f302f313639333430353830343034313f653d3137313532313238303026763d6265746126743d307a4b74676b73684967694439786d6e456a425a7158755731343547774e5676386f6d3958576b424f7259"} alt="" style={{ width: '2.8rem', marginTop: "-16px" }} />

                            <div className='ms-2'>
                                <strong className='text-start d-block'>Katrina  <img style={{ width: '2.5rem' }} src={BADGE_PRO} className='float-end' alt="" /></strong>
                                <p className='text-start' style={{ fontSize: ".7rem", color: "#999999" }}>Usage count: <span style={{ color: "#FFFFFF" }}>11</span> chats | <span style={{ color: "#FFFFFF" }}>28.k</span> Token</p>
                            </div>
                        </div>
                        <button className='upgrade-btn'>Upgrade Plan</button>
                        <div style={{ display: 'flex', justifyContent: "center", width: "70%", margin: "1.2rem auto" }}>
                            <button className='border-0 bg-black text-start px-2 py-1 text-white w-100 rounded' ><img src={ICON_SUN} alt="" style={{ width: '1.2rem' }} /> <span className='ms-2'>Light</span> </button>
                            <button className='border-0 bg-transparent text-white w-100'><img src={ICON_MOON} alt="" style={{ width: '1.2rem' }} /> <span className='ms-2'>Dark</span></button>
                        </div>
                    </div>
                </div>

            </div>
        </Sidebar>
    )
}
