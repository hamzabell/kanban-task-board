import { useEffect } from "react";

export default function WithColorScheme(Story, context) {
    let { scheme } = context.globals;

    useEffect(() => {
        document.documentElement.className = scheme == 'dark' ?'dark' : 'light';
    }, [scheme])

    return (
        <div style={{ background: scheme == "white" ? "white" : "inherit", padding: scheme == "white" ?'2rem': '0'}}>
            <Story />
        </div>
    )
}