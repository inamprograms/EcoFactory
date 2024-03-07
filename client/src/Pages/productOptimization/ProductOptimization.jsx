import { useState } from 'react';
import { IoMdAttach } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import Spinner from '../../Components/loader/Spinner';
import Sidebar from '../../Components/sideBar/SBar';
import chatgptLogo from "./CHATGPT_LOGO_WHITE.svg";
import './ProductOptimization.css'; // Import CSS file for additional styles
import cogwheel from "./cogwheel-2.svg";


export default function ProductOptimization() {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [promptsArr, setPromptsArr] = useState([]);
    const [recentAnswer, setRecentAnswer] = useState("");
    // const [typing, setTyping] = useState(false);

    // const sendMessage = (text) => {
    //     setPromptsArr([...promptsArr, { text, sender: 'user' }]);
    //     console.log("promptsArr -> ", promptsArr)
    //     generateBotResponse(text);
    // };

    // const generateBotResponse = (userMessage) => {
    //     const botResponse = `You said: "${userMessage}"`;
    //     setTyping(true);
    //     setTimeout(() => {
    //         setPromptsArr((prevPrompts) => [
    //             ...prevPrompts,
    //             { text: botResponse, sender: 'bot' }
    //         ]);
    //         setTyping(false);
    //     }, 3000);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim() !== '') {
            console.log("prompt -> ", prompt);
            setPromptsArr([...promptsArr, prompt]);
            setPrompt('');

            setLoading(true)
            // API Calling and getting response code
            setTimeout(() => {

                setLoading(false)
                setPromptsArr(prevPromptsArr => [...prevPromptsArr, "Chatgpt answer..."]);
            }, 3000);

        }
    };

    return (
        <div id='productOptimization' style={{ display: 'flex', height: '100vh', minHeight: '400px' }} >

            <Sidebar collapsed={collapsed} />
            <main className='main' style={{ width: collapsed ? "100vw" : "77vw", backgroundColor: "#2f3135", }}>
                <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer", color: "#c1c1c1" }}>
                    {/* <span class="big-icon" style={iconStyles}>{collapsed ? <>&#187;</>: <>&#171;</>}</span> */}
                    <span className={`big-icon ${collapsed ? 'rotate-left' : 'rotate-right'}`} style={{ ...iconStyles, color: "#ccc", marginLeft: collapsed ? '-3px' : '-10px' }}>{collapsed ? <>&#187;</> : <>&#171;</>}</span>
                </div>
                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="container-fluid" style={{ height: "96vh", display: 'flex', flexDirection: 'column' }}>
                        <div className="row" style={{ backgroundColor: "#c1c1c1", height: "15%", borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}>
                            <div className="col" >
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-11">
                                        <h2 style={textStyle} className='pt-4'>Product Optimization</h2>

                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className='pt-4'>
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col-8">

                                            <select className="form-select" style={{ cursor: 'pointer' }} aria-label="Default select example">
                                                <option selected>Select product to optimize</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {promptsArr.length == 0 && <div className="row" style={{ backgroundColor: "#e6e6e6", height: "70%" }}>
                            <div className="col d-flex flex-column justify-content-center align-items-center" style={{ margin: "0 auto", maxWidth: "800px" }}>
                                <div><img src={cogwheel} className='rounded circle' style={{ width: '40px' }} alt="cogwheel" /></div>
                                <h3 className='heading3'>&nbsp; Just select the product you want to optimize,<br /> and describe below what you want to optimize...</h3>
                                <p className='main-text'>&nbsp; &nbsp; Here we must include a clear and simple explanation about this functionality, using similar <br /> amount of texts, avoiding too short texts that provide weak information, also avoiding long text.</p>
                            </div>
                        </div>}

                        {/* show prompts */}
                        {promptsArr.length !== 0 && (
                            <div className="prompt-scroll-box row " style={{ backgroundColor: "#e6e6e6", height: "70%" }}>
                                <div className="scroll-inner ">
                                    <div className=" row prompts px-5 pt-4" style={{ backgroundColor: "#e6e6e6", height: "70%" }}>


                                        <div className="container-fluid">
                                            {/* <div className="row">
                                                <div className="col">&nbsp;.</div>
                                            </div> */}
                                            {promptsArr.map((prompt, index) => (
                                                <div key={index}>
                                                    {index % 2 == 0 ?
                                                        <div className="row " style={{ position: 'relative' }}>
                                                            <img src="https://camo.githubusercontent.com/1e6de73a5a5d1800c3f18f294e4b019466d6daa7ac4ddbe713afc5e3ac062547/68747470733a2f2f6d656469612e6c6963646e2e636f6d2f646d732f696d6167652f4434443033415148556d6b357863444d6574412f70726f66696c652d646973706c617970686f746f2d736872696e6b5f3430305f3430302f302f313639333430353830343034313f653d3137313532313238303026763d6265746126743d307a4b74676b73684967694439786d6e456a425a7158755731343547774e5676386f6d3958576b424f7259" className='rounded-circle' style={profileUserStyle} alt="" />

                                                            <div className="col-3"></div>
                                                            <div className="col-9 shadow p-3 mb-5 bg-body-tertiary rounded " >
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sit dicta, explicabo consectetur, accusantium, voluptate repellendus quod fugiat aliquam iure sunt rerum officia aliquid iste delectus vero deleniti obcaecati similique voluptas nobis nostrum eaque! At qui possimus sequi? Dolore, ipsa?
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="row" style={{ position: 'relative' }}>
                                                            <img src={chatgptLogo} className='rounded-circle' style={profileStyle} alt="" />
                                                            <div className="col-9 shadow-none p-3 mb-5 bg-body-tertiary rounded">Fair and Lovely Cream: This cream contains hydroquinone, a skin-lightening agent, along with
                                                                parabens and artificial fragrances. It is marketed as a product to lighten skin tone and even out complexion.</div>
                                                            <div className="col-3"></div>
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                            {loading &&
                                                <div className="row" style={{ position: 'relative' }}>
                                                    <img src={chatgptLogo} className='rounded-circle' style={profileStyle} alt="" />
                                                    <div className="col-9 shadow-none p-3 mb-5 bg-body-tertiary rounded" style={{ height: "100px" }}>
                                                        <ThreeDots
                                                            visible={true}
                                                            height="30"
                                                            width="30"
                                                            color="black"
                                                            radius="9"
                                                            ariaLabel="three-dots-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                        />
                                                    </div>
                                                    <div className="col-3"></div>
                                                </div>}
                                        </div>

                                        {/* {typing && <div className="message bot">
                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-9 bg-dark border border-1 border-danger">Hello</div>
                                            </div>
                                            
                                            </div>} */}

                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="row" style={{ backgroundColor: "#e6e6e6", height: "15%", borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px" }}>
                            <div className="col " style={{ backgroundColor: "#e6e6e6", borderBottomLeftRadius: "25px", borderBottomRightRadius: "25px" }}>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-11 ">
                                        <div className="input-group mb-3" style={{ border: "1px black solid", borderRadius: "20px" }}>
                                            <button className="input-group-text" id="basic-addon1" style={{ fontSize: "1.8rem", backgroundColor: "white", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", color: "#494c51", border: "none", borderRight: "none" }}><IoMdAttach /></button>
                                            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" className="form-control " placeholder="Please type or say what kind of optimizations you are looking for ?" aria-label="Username" aria-describedby="basic-addon1" />
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "white", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}>
                                                <button onClick={handleSubmit} className='btn btnGradient' style={{ backgroundColor: "#0076c3" }}>{loading ? <Spinner /> : 'Submit'}</button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col"></div>
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
    zIndex: 3,
    transition: 'transform 0.3s ease' /* Add transition for smoother animation */
};

const textStyle = {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 700,
};

const profileStyle = {
    // textAlign: "justify",
    position: 'absolute',
    width: '6%',
    bottom: '5px',
    padding: '7px',
    left: '10px',
    backgroundColor: 'rgb(0, 118, 195)',
};
const profileUserStyle = {
    marginTop: 2,
    position: 'absolute',
    width: '10%',
    bottom: '-3px',
    right: '10px',
};
