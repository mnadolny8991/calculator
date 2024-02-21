import history_image from "./history.png"

function Display(prop) {

    return (
        <div className="display">
            <div className="display__ans-history">
                <img
                    className="display__history-img"
                    src={history_image}
                    width="25px"
                    alt="history"
                    onClick={prop.handleImgClick}
                />
                {prop.displayList && 
                    <ul className="display__ans-list">
                        {prop.history.length > 0 && 
                            prop.history.map(entry => 
                                <li className="display__ans-list-entry" 
                                    value={entry} 
                                    onClick={event => prop.handlePrevEntryClick(event)}>
                                    {entry}
                                </li>)}
                    </ul>}
            </div>
            
            <div className="display__group">
                <div className="display__ans">{"Ans = " + prop.prevAns}</div>
                <div className="display__input" >{prop.expression}</div>
            </div>
        </div>
    );
}

export default Display;