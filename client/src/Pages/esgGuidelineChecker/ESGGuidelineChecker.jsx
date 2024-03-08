import axios from 'axios'; // Import axios for making HTTP requests
import { useState } from 'react';
import { IoMdAttach } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import Spinner from '../../Components/loader/Spinner';
import Sidebar from '../../Components/sideBar/SBar';
import chatgptLogo from "./CHATGPT_LOGO_WHITE.svg";
import './ESGGuidelineChecker.css'; // Import CSS file for additional styles
import cogwheel from "./cogwheel-2.svg";

export default function ESGGuidelineChecker() {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [promptsArr, setPromptsArr] = useState([]);
    const [recentAnswer, setRecentAnswer] = useState({});
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() !== '') {
            console.log("prompt -> ", prompt);
            setPromptsArr([...promptsArr, prompt]);
            const postData = {
                query: prompt + "? give me response in exact in JSON as following format -> productDescription: String, esgGuideline: String, productEsgReport: Object with Compliance (String), Grade (Float)"
            };
            setPrompt('');

            setLoading(true);



            // API Calling and getting response code
            try {
                const response = await axios.post('https://ecofactory.onrender.com/api/advisor', postData);
                const data = response.data.bot; // Check if bot property exists
                // console.log("data -> ", data);
                // console.log("data -> ", JSON.parse(data));
                // console.log("data parse -> ", data);
                setRecentAnswer(JSON.parse(data));
                setPromptsArr(prevPromptsArr => [...prevPromptsArr, JSON.parse(data)]);
                setLoading(false);
                setError(null); // Reset error state
            } catch (error) {
                // Handle errors
                console.error("Error fetching data: ", error);
                setError(error.message); // Store error message in state
                setLoading(false);
            }

        }
    };

    return (
        <div id='productOptimization' style={{ display: 'flex', height: '100vh', minHeight: '400px' }} >

            <Sidebar collapsed={collapsed} />
            <main className='main' style={{ width: collapsed ? "100vw" : "77vw", backgroundColor: "#2f3135", }}>
                <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer", color: "#c1c1c1" }}>
                    <span className={`big-icon ${collapsed ? 'rotate-left' : 'rotate-right'}`} style={{ ...iconStyles, color: "#ccc", marginLeft: collapsed ? '-3px' : '-10px' }}>{collapsed ? <>&#187;</> : <>&#171;</>}</span>
                </div>
                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="container-fluid" style={{ height: "96vh", display: 'flex', flexDirection: 'column' }}>
                        <div className="row" style={{ backgroundColor: "#c1c1c1", height: "15%", borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}>
                            <div className="col" >
                                <div className="row">
                                    <div className="col-1"></div>
                                    <div className="col-11">
                                        <h2 style={textStyle} className='pt-4'>ESG Guideline Checker</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className='pt-4'>
                                    <div className="row" >
                                        <div className="col">
                                            <select className="form-select" style={{ cursor: 'pointer' }} aria-label="Default select example">
                                                <option selected style={{}}>Select product to optimize</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="col me-5" style={{ position: 'relative' }}>
                                            <select className="form-select" style={{ cursor: 'pointer' }} aria-label="Default select example">
                                                <option selected>Select ESG Guideline</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                            <h3 style={{ color: "#a39e9e", position: "absolute", bottom: "-14%", left: "-5%" }}>+</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {promptsArr.length === 0 && <div className="row" style={{ backgroundColor: "#e6e6e6", height: "70%" }}>
                            <div className="col d-flex flex-column justify-content-center align-items-center" style={{ margin: "0 auto", maxWidth: "800px" }}>
                                <div><img src={cogwheel} style={{ width: "40px" }} alt="cogwheel" /></div>
                                <h3 className='heading3 text-center'>&nbsp; Just select the product and relative ESG<br /> Guideline to check compliance </h3>
                                <p className='main-text' style={{ textAlignLast: "center" }}>&nbsp; &nbsp; An AI assistant, specialized and dedicated to sustainability
                                    best practices and ESG guidelines documentation.
                                </p>
                            </div>
                        </div>}

                        {/* show prompts */}
                        {promptsArr.length !== 0 && (
                            <div className="prompt-scroll-box row " style={{ backgroundColor: "#e6e6e6", height: "70%" }}>
                                <div className="scroll-inner ">
                                    <div className=" row prompts px-5 pt-4" style={{ backgroundColor: "#e6e6e6", height: "70%" }}>


                                        <div className="container-fluid">
                                            {promptsArr.map((prom, index) => (
                                                <div key={index}>
                                                    {index % 2 === 0 ?
                                                       <div className="row p-0 m-0 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <img src="https://camo.githubusercontent.com/1e6de73a5a5d1800c3f18f294e4b019466d6daa7ac4ddbe713afc5e3ac062547/68747470733a2f2f6d656469612e6c6963646e2e636f6d2f646d732f696d6167652f4434443033415148556d6b357863444d6574412f70726f66696c652d646973706c617970686f746f2d736872696e6b5f3430305f3430302f302f313639333430353830343034313f653d3137313532313238303026763d6265746126743d307a4b74676b73684967694439786d6e456a425a7158755731343547774e5676386f6d3958576b424f7259" className='rounded-circle mb-auto ms-auto me-2  ' style={profileUserStyle} alt="" />
                                                            <div className="col-9 shadow p-3 mb-5 bg-body-tertiary rounded " >
                                                                {prom}
                                                            </div>
                                                            <div className="col-3"></div>
                                                            </div>
                                                        :
                                                        <div className="row " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <img src={chatgptLogo} className='rounded-circle mb-auto me-2' style={profileStyle} alt="" />
                                                            <div className="col-9 shadow-none me-auto p-3 mb-5 bg-body-tertiary rounded">
                                                                <h2>Product Description:</h2>
                                                                <p>{prom.productDescription}</p>
                                                                <h2>ESG Guideline:</h2>
                                                                <p>{prom.esgGuideline}</p>
                                                                <h2>Product ESG Report:</h2>
                                                                <p>Grade: {prom?.productEsgReport?.grade}</p>
                                                                <h3>Compliance:</h3>
                                                                <p>{prom?.productEsgReport?.compliance}</p>
                                                                {/* <h3>Analysis:</h3>
                                                                <p>{prom?.productEsgReport?.analysis}</p> */}
                                                            </div>
                                                            <div className="col-3"></div>
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                            {loading &&
                                                <div className="row " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <img src={chatgptLogo} className='rounded-circle mb-auto me-2' style={profileStyle} alt="" />
                                                    <div className="col-9 shadow-none p-3 mb-5 me-auto bg-body-tertiary rounded" style={{ height: "100px" }}>
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
                                        {error && <p className="text-danger">{error}</p>}
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
    width: '3%',
    padding: '7px',
    backgroundColor: 'rgb(0, 118, 195)',
};
const profileUserStyle = {
    width: '4.5%',
    padding: '7px',
    marginTop : '-5px'
};



const profileStyle2 = {
    width: '50px', // Adjust according to your preference
    height: '50px', // Adjust according to your preference
};
