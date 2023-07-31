import React from "react";
import classnames from "../../utils/classnames";
import PropTypes from 'prop-types';

function Checkbox({ id, title, onCheck, status }) {
    return ( 
        <div className="checkbox-container">
            <input type="checkbox"  className="checkbox-container__checkbox" checked={status} onChange={() => onCheck({ id, status: !status })}/>
            <p className={classnames("checkbox-container__title", { "checkbox-container__title--selected": status})}>{title}</p>
        </div>
     );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired
}

export default Checkbox;