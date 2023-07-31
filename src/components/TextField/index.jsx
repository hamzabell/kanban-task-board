import React from "react";
import classnames from "../../utils/classnames";

const TextField = React.forwardRef(({ label, error, otherClasses, ...other }, ref) =>  {
    return ( 
        <div className="text-field">
            <label className="text-field__label">{label}</label>
            <input {...other} ref={ref} className={classnames("text-field__input", otherClasses, { "text-field__input--error": error })} />
        </div>
     );
})

export default TextField;