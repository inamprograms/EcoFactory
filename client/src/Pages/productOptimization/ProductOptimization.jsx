import axios from 'axios'; // Import axios for making HTTP requests
import Markdown from 'markdown-to-jsx';
import React, { useState } from 'react';
import { FaUpload } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';
import fileToDownload from "../../Assets/HELMET_DATASET_US_v1.txt";
import BTN_START from '../../Assets/ICONS/BT_START_CHAT.svg';
import GUIDE_DOC from '../../Assets/ICONS/CHAT_ASSETS-page-1.png';
import cogwheel from "../../Assets/ICONS/ICON_ECOFACTOR.svg";
import ecofactor from "../../Assets/ICONS/LOGO_ECOFACTOR_FINAL (1).svg";
import STEP_ONE from '../../Assets/ICONS/STEP1.svg';
import STEP_TWO from '../../Assets/ICONS/STEP2.svg';
import STEP_THREE from '../../Assets/ICONS/STEP3.svg';
import Spinner from '../../Components/loader/Spinner';
import Sidebar from '../../Components/sideBar/SBar';
import SBarCollapsed from '../../Components/sideBar/SBarCollapsed';
import chatgptLogo from "./CHATGPT_LOGO_WHITE.svg";
import './ProductOptimization.css'; // Import CSS file for additional styles




export default function ProductOptimization() {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [creatingCorpus, setCreatingCorpus] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [promptsArr, setPromptsArr] = useState([]);
    const [recentAnswer, setRecentAnswer] = useState("");
    const [error, setError] = useState(null);
    // STATE FOR CORPUS ID AND CHAT
    const [corpusID, setcorpusID] = useState(null);
    const [enableChat, setenableChat] = useState(true);
    const [file, setfile] = useState(null);
    const [content, setcontent] = useState('');

    // useEffect(() => {
    //     // Attach event listener when component mounts
    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     // Cleanup function to remove event listener when component unmounts
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);

    // const handleBeforeUnload = async (event) => {
    //     // Call your API to delete the corpus before the user leaves the page
    //     if (corpusID) {
    //         try {
    //             const response = await axios.post('https://ecofactor.onrender.com/api/delete_corpus', {
    //                 "corpus_id": corpusID
    //             });
    //             console.log("Session deleted successfully!");
    //         } catch (error) {
    //             console.error("Error deleting session:", error);
    //         }
    //     }
    // };
    
    // Download file handler
    const handleDownload = () => {
        // Replace 'example.com/file.pdf' with the actual URL of your file
        const anchor = document.createElement('a');
        anchor.href = fileToDownload;
        anchor.download = 'HELMET_DATASET_US_v1.txt'; // Name of the downloaded file
        anchor.click();
        toast.success('HELMET_DATASET_US_v1.txt file downloaded successfully!')
    };




    // API CALL TO CREATE CORPUS ID
    const startChat = async () => {
        setCreatingCorpus(true)
        // console.log('yes');
        // setLoading(true)

        try {
            const response = await axios.get('https://ecofactor.onrender.com/api/create_corpus');

            // successful response
            console.log('response.data:', response.data);
            setcorpusID(response.data)
            // setLoading(false)
            toast.success('Session created successfully!')


        } catch (error) {
            // error
            console.error('Error starting chat:', error);
            toast.error('An error occurred while starting the chat:', error);
            // setLoading(false)
        }

        setCreatingCorpus(false)
    }

    //HANDLE FILE SELECTION
    const handleFileSelect = (e) => {
        setfile(e.target.files[0])
    }

    //HANDLE UPLOAD FILE
    const uploadFile = async () => {

        setUploadingFile(true)

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('corpus_id', corpusID)
            console.log("corpusID : ", corpusID);

            const response = await axios.post('http://127.0.0.1:5000/api/upload_file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response.data);
            setcontent(response.data)
            // setLoading(false)
            toast.success('File uploaded successfully!')
            setfile(null)
            setenableChat(false)

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while uploading the file: ', error);
            // setLoading(false)
        }
        setUploadingFile(false)
    }


    // HANDLE SUBMIT QUERY
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (prompt.trim() !== '') {
            console.log("prompt -> ", prompt);
            setPromptsArr([...promptsArr, prompt]);
            console.log("corpus id : ", corpusID);
            const postData = {
                query: prompt,
                // corpus_id: corpusID
                contents: content

            };
            setPrompt('');

            setLoading(true);
            // API Calling and getting response code
            try {
                // Make a POST request using axios                             
                const response = await axios.post('http://127.0.0.1:5000/api/product_optimize', postData);
                console.log("query response -> ", response.data);
                //                 const markdownResponse = `
                // \`
                // ${response.data}
                // \`
                // `;
                setRecentAnswer(response.data);
                setPromptsArr(prevPromptsArr => [...prevPromptsArr, response.data]);
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
        <>
            {/*<img src={colorBar} alt="eco" style={{ position: 'absolute', top: '-26px', left: '35%' }} />*/}

            <div >
                <div style={{ height: '10vh', backgroundColor: '#2f3135', }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                        <img src={ecofactor} alt="" style={{ height: '4.2rem', marginTop: ' 1.9rem', marginLeft: '1.2rem' }} />
                        <h2 style={textStyle} >Product Optmizer AI Assistant</h2>
                    </div>

                </div>
                <div id='productOptimization' style={{ display: 'flex', height: '90vh' }}>


                    <Sidebar collapsed={collapsed} />
                    {collapsed && <SBarCollapsed />}

                    <main className='main' style={{ width: collapsed ? "96vw" : "77vw", backgroundColor: "#2f3135", }}>
                        <div onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer", color: "#c1c1c1" }}>
                            <span className={` ${collapsed ? 'rotate-left' : 'rotate-right'}`} style={{ ...iconStyles, color: "#ccc", marginLeft: collapsed ? '-6px' : '-10px' }}>{collapsed ? <>&#187;</> : <>&#171;</>}</span>
                        </div>

                        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100%", }}>

                            <div className="container-fluid" style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>

                                {promptsArr.length === 0 && <div className="row" style={{ backgroundColor: "#e6e6e6", height: "80%", borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}>
                                    <div className="col  d-flex flex-column gap-3 py-2 justify-content-center align-items-center" style={{ margin: "0 auto", maxWidth: "800px" }}>
                                        <div>
                                            <img src={cogwheel} className='rounded circle ' style={{ width: '40px' }} alt="cogwheel" /></div>
                                        {/* <h3 className='heading3'>&nbsp; Just select the product you want to optimize,<br /> and describe below what you want to optimize...</h3> */}
                                        <p className='main-text fs-4 text-center ' style={{ textAlignLast: "center" }}>&nbsp; &nbsp;Welcome to the <b className='fw-bold'>Product Optimizer AI Assistant</b>, the simplest and re- <br />liable way to optimize your products, reduce product costs, conduct <br /> product research, and material exchange, all you need in one place.
                                        </p>

                                        <div style={{ position: 'relative', marginTop: '2rem' }}>
                                            <strong className='text-black fs-5 fw-bold' style={{ fontFamily: '"Roboto Condensed", sans-serif' }}>To start a new chat, simply click the button below:</strong>
                                            {corpusID !== null && <div className="bg-light pt-2 px-3 d-flex gap-2 rounded-sm" onClick={handleDownload} style={{ width: 'max-content', cursor: "pointer", border: '1px solid light-gray', position: 'absolute', top: '-10px', left: '110%' }}>
                                                <img src={GUIDE_DOC} alt="guide-doc" style={{ height: '3rem' }} />
                                                <p style={{ fontFamily: '"Roboto Condensed", sans-serif', fontSize: '.6rem' }}>For quick tests, optionally you <br /> can download a product <br /> description example here.</p>
                                            </div>}
                                        </div>
                                        {/* ... */}
                                        {corpusID === null

                                            ? creatingCorpus
                                                ? <button style={{ width: '100%', border: '0', backgroundColor: 'transparent', marginTop: '2rem' }}><Spinner /></button>
                                                : <button onClick={startChat} style={{ width: '100%', border: '0', backgroundColor: 'transparent', marginTop: '2rem' }}><img src={BTN_START} alt="P-box" style={{ width: '16rem' }} /></button>

                                            : <div className="row ms-auto " style={{ marginTop: '2rem' }}>
                                                <div className="col-4 mx-auto" >
                                                    <div className='mt-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.2rem', borderRight: '1px solid gray' }}>
                                                        <img src={STEP_ONE} alt="step" style={{ width: '3rem', marginTop: '-29px' }} />
                                                        <p className=' me-3' style={{ fontFamily: '"Roboto Condensed", sans-serif', fontSize: '0.95rem', }}>Upload your <br /> product <br /> description</p>
                                                    </div>
                                                </div>

                                                <div className="col-4 mx-auto" >
                                                    <div className='mt-3 pe-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.2rem', borderRight: '1px solid gray' }}>
                                                        <img src={STEP_TWO} alt="step" style={{ width: '3rem', marginTop: '-29px', marginLeft: '' }} />
                                                        <p style={{ fontFamily: '"Roboto Condensed", sans-serif', fontSize: '0.95rem', }}>Just say what type of optimization you want to do on product.</p>
                                                    </div>
                                                </div>
                                                <div className="col-4 mx-auto" >
                                                    <div className='mt-3' style={{ display: 'flex', gap: '1.2rem', }}>
                                                        <img src={STEP_THREE} alt="step" style={{ width: '3rem', marginTop: '-29px' }} />
                                                        <p style={{ fontFamily: '"Roboto Condensed", sans-serif', fontSize: '0.95rem', }}>Click Submit to <br /> start getting <br />valuable insights</p>
                                                    </div>
                                                </div>


                                            </div>}
                                    </div>
                                </div>}

                                {/* show prompts */}
                                {promptsArr.length !== 0 && (
                                    <div className="prompt-scroll-box row " style={{ backgroundColor: "#e6e6e6", height: "80%" }}>
                                        <div className="scroll-inner ">
                                            <div className=" row prompts px-5 pt-4" style={{ backgroundColor: "#e6e6e6", height: "80%" }}>


                                                <div className="container-fluid">
                                                    {promptsArr.map((prom, index) => (
                                                        <div key={index}>
                                                            {index % 2 === 0 ?
                                                                <div className="row p-0 m-0 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <img src="https://camo.githubusercontent.com/1e6de73a5a5d1800c3f18f294e4b019466d6daa7ac4ddbe713afc5e3ac062547/68747470733a2f2f6d656469612e6c6963646e2e636f6d2f646d732f696d6167652f4434443033415148556d6b357863444d6574412f70726f66696c652d646973706c617970686f746f2d736872696e6b5f3430305f3430302f302f313639333430353830343034313f653d3137313532313238303026763d6265746126743d307a4b74676b73684967694439786d6e456a425a7158755731343547774e5676386f6d3958576b424f7259" className='rounded-circle mb-auto ms-auto ' style={profileUserStyle} alt="" />
                                                                    <div className="col-9 shadow p-3 mb-5 bg-body-tertiary rounded " >
                                                                       {prom}
                                                                    </div>
                                                                    <div className="col-3"></div>

                                                                </div>
                                                                :
                                                                <div className="row " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <img src={chatgptLogo} className='rounded-circle mb-auto me-2' style={profileStyle} alt="" />
                                                                    <div className="col-9 me-auto shadow-none p-3 mb-5 bg-body-tertiary rounded"> <Markdown>{prom}</Markdown> </div>
                                                                    <div className="col-3"></div>
                                                                </div>
                                                            }
                                                        </div>
                                                    ))}
                                                    {loading &&
                                                        <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <img src={chatgptLogo} className='rounded-circle mb-auto me-2' style={profileStyle} alt="" />
                                                            <div className="col-9 shadow-none me-auto p-3 mb-5 bg-body-tertiary rounded" style={{ height: "100px" }}>
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
                                            <div className={`${collapsed ? 'col-9' : 'col-11'} mx-auto`}>
                                                <div className="input-group mb-3" style={{ border: "1px black solid", borderRadius: "20px", overflow: 'hidden' }}>
                                                    {
                                                        !file ?
                                                            <>
                                                                <input type="file" id="upload" hidden onChange={handleFileSelect} disabled={corpusID === null} />
                                                                <div style={{ cursor: 'pointer', backgroundColor: 'white', overflow: 'hidden', fontSize: "1.8rem", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", border: "none", borderRight: "none" }}>
                                                                    <label htmlFor="upload" className=' input-group-text' style={{ color: corpusID === null ? '#6666' : '#494c51', backgroundColor: 'white', height: '100%', cursor: corpusID === null ? 'not-allowed' : 'pointer' }}> <IoMdAttach className="fs-2" style={{ backgroundColor: 'transparent' }} /></label>
                                                                </div>
                                                            </>
                                                            :
                                                            uploadingFile
                                                                ?
                                                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "white", }}>
                                                                    <button onClick={uploadFile} className='btn btnGradient' style={{ backgroundColor: "#0076c3", }}><Spinner /> </button>
                                                                </span>
                                                                :
                                                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "white", }}>
                                                                    <button onClick={uploadFile} className='btn btnGradient' style={{ backgroundColor: "#0076c3", }}><FaUpload /> </button>
                                                                </span>
                                                    }
                                                    <input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" className="form-control " placeholder="Please type or say what kind of optimizations you are looking for ?" aria-label="Username" aria-describedby="basic-addon1" />
                                                    <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "white", borderTopRightRadius: "20px", borderBottomRightRadius: "20px", cursor: enableChat ? 'not-allowed' : 'pointer' }}>
                                                        <button disabled={enableChat} onClick={handleSubmit} className='btn btnGradient' style={{ backgroundColor: "#0076c3" }}>{loading ? <Spinner /> : 'Submit'}</button>
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

            </div>


        </>
    )
}

const iconStyles = {
    fontSize: '2em',
    lineHeight: '1em',
    position: 'absolute',
    top: '50%',
    zIndex: 3,
    transition: 'transform 0.3s ease', /* Add transition for smoother animation */
};

const textStyle = {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 300,
    color: 'white',
    marginRight: '2.2rem',
    marginTop: '1.5rem'

};

const profileStyle = {
    width: '3%',
    padding: '7px',
    backgroundColor: 'rgb(0, 118, 195)',
};
const profileUserStyle = {
    width: '4.5%',
    padding: '7px',
    marginTop: '-5px'
};
