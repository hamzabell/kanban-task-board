import classnames from '../../utils/classnames';
import React from 'react';

const  Button = React.forwardRef(({ primary, secondary, destructive, children, otherClasses, ...otherProps }, ref)=> (
    
        <button ref={ref} {...otherProps} className={
            classnames('button',otherClasses, { 
                'button--primary': primary,
                'button--secondary': secondary,
                'button--destructive': destructive
             })} >
            {children}
        </button>
))

export default Button;