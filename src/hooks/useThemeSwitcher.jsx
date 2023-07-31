import { useState } from "react"

export default ()  => {
    const [ theme, setTheme ] = useState('light');

    const toggle = () => setTheme(prev => prev == 'light' ? 'dark' : 'light');


    return { theme, toggle };
}