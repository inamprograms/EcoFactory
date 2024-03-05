import { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import colorBar from "../../Assets/ICONS/COLORBAR.png";
import ICON_PRODUCT from "../../Assets/ICONS/ICON_PRODUCTS.svg";
import ICON_MATERIAL from '../../Assets/ICONS/ICON_MATERIALS.svg'
import ICON_SUPLIERS from '../../Assets/ICONS/ICON_SUPPLIERS.svg'
import ICON_GUIDLINES from '../../Assets/ICONS/ICON_GUIDELINE_DATABASE.svg'
import ICON_OPTIMIZATION from '../../Assets/ICONS/ICON_OPTIMIZER.svg'
import ICON_ESG from '../../Assets/ICONS/ICON_ESG_GUIDELINE.svg'
import ICON_INTEGRATION from '../../Assets/ICONS/ICON_INTEGRATIONS.svg'
import ecofactor from "../../Assets/ICONS/LOGO_ECOFACTOR.png";
import avatar from "../../Assets/ICONS/AVATAR.png";
import ICON_SUN from "../../Assets/ICONS/ICON_SUN.svg";
import ICON_MOON from "../../Assets/ICONS/ICON_MOON.svg";
import BADGE_PRO from "../../Assets/ICONS/BADGE_PRO.svg";
import ICON_CUSTOM_GPT from "../../Assets/ICONS/ICON_CUSTOM_GPT.svg";
import GPT_AI from "../../Assets/ICONS/ICON_GPT4.svg";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function SBar({ collapsed }) {

    const path = useLocation().pathname
    console.log(path);

    const inventoryData = [
        { icon: ICON_PRODUCT, title: 'Products Catalog' },
        { icon: ICON_MATERIAL, title: 'Material Catalog' },
        { icon: ICON_SUPLIERS, title: 'Supplier Directory' },
        { icon: ICON_GUIDLINES, title: 'USG Guidlines' },
    ]

    const pages = [
        { icon: ICON_OPTIMIZATION, title: 'Products Optimization', to: '/' },
        { icon: ICON_ESG, title: 'ESG Guidline Checker', to: '/esg-guidlines' },
        { icon: GPT_AI, title: 'New Regular ChatGPT 4', to: '' },
        { icon: ICON_CUSTOM_GPT, title: 'Create Custom GPT', subTitle: "(Upgrade plan)", disable: true, to: '' },
        { icon: ICON_INTEGRATION, title: 'Integrations', subTitle: "(Upgrade plan)", disable: true, to: '' },

    ]

    const historyChats = [
        { icon: ICON_OPTIMIZATION, title: 'History chat conversation 1' },
        { icon: ICON_ESG, title: 'History chat conversation 2' },


    ]

    return (
        <Sidebar className='sideBar' collapsed={collapsed} style={{ display: collapsed ? "none" : "block", width: '23vw', position: "relative" }}>
            {/* side bar content  */}
            {/* Aleeza you have to work here */}
            <div className="container-fluid" style={{ backgroundColor: "#2f3135", height: '100vh', overflow: 'hidden' }}>
                <img src={colorBar} alt="" style={{ width: "100%", position: "relative", top: "-14px", left: "-7px" }} />
                <div className="row">
                    <div className="col px-4 py-2 my-2 "><img src={ecofactor} alt="" style={{ width: "90%", marginLeft: '.7rem' }} /></div>
                </div>
                <div className="row ">
                    <div className="col mx-3 me-1 rounded p-2 " style={{ backgroundColor: "#494c51", }}>
                        <h6 className='text-white text-center' >Inventory</h6>
                        <div className="d-flex gap-2 ">
                            {inventoryData.map((currElm) => {
                                return (
                                    <>
                                        <div className='px-3' style={{ paddingTop: "10px", paddingBottom: "9px", backgroundColor: "#2f3135", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', borderRadius: "10px" }}>
                                            <img src={currElm.icon} alt="icon-one" style={{ width: '1.5rem' }} />
                                            <p className='text-center mt-2 mb-0' style={{ color: "#999999", fontSize: ".7rem" }}>{currElm.title}</p>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col mx-3 mt-5 " >

                        {pages.map((currElm) => {
                            return (
                                <>
                                    <Link to={currElm.to} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: currElm.disable && "not-allowed", color: currElm.disable ? "#666" : currElm.to === path ? "#1bd4ad" : "#f2f2f2", textDecoration: "none", marginBottom: ".7rem" }}>
                                        <span>
                                            <img src={currElm.icon} alt="icon" style={{ width: '1.5rem', marginRight: ".9rem" }} />
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
                        <div className='mb-2'>
                            <button className='border-0 bg-transparent text-white me-4  fs-4'><MdKeyboardArrowUp /></button> <span style={{ fontWeight: 'normal', color: "#666666", fontSize: "1.1rem" }}>chats</span>
                        </div>
                        {historyChats.map((currElm) => {
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
                <div className="row text-white " style={{ textAlign: "center", width: "100%", }}>
                    <div className="col mt-5 ">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <img src={avatar} alt="" style={{ width: '2.8rem', marginTop: "-16px" }} />

                            <div className='ms-2'>
                                <strong className='text-start d-block'>Julia Olivera <img style={{ width: '2.5rem' }} src={BADGE_PRO} className='float-end' alt="" /></strong>
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