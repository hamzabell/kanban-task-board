import React from "react";
import classnames from "../../utils/classnames";

const Dropdown = React.forwardRef(({ label, defaultMessage, otherClasses, children, ...other }, ref) => {
    return ( 
        <div className={classnames("drop-down", otherClasses)}>
            <label className="drop-down__label">{label}</label>
            <select {...other} className="drop-down__select" ref={ref}>
                <option value={null} selected disabled>{defaultMessage}</option>
                {children}
            </select>
            

        </div>
    );
}
)
export default Dropdown;