import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function Login(){
    const navigate = useNavigate();
    return (
        <>
        <Navbar />
            <div className="login-front">
                <div className="choose-role">
                    <h1>WHO ARE YOU?</h1>
                    <button onClick={()=>navigate('/login-logistics')}>LOGISTICS</button>
                    <button onClick={()=>navigate('/login-retailer')}>RETAILER</button>
                </div>
            </div>
        </>
    );
}