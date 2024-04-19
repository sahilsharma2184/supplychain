import { NavLink } from "react-router-dom";

const SidePanel = () => {
    return (
        <>
            <div className="outer-panel">
                <div className="inner-panel">
                    <div className="review"><NavLink id="panel-navigator" to="/review">&nbsp;REVIEW</NavLink></div><br></br>
                    <div className="revoke"><NavLink id="panel-navigator" to="/revoke">&nbsp;REVOKE</NavLink></div><br></br>
                    <div className="commit"><NavLink id="panel-navigator" to="/commit">&nbsp;COMMIT</NavLink></div><br></br>
                </div>
            </div>
        </>
    );
}
export default SidePanel;
