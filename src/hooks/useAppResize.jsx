import { useEffect, useState } from 'react';

export function useAppResize() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }

    }, []);


    return { windowSize };
}