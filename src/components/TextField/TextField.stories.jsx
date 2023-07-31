import TextField from ".";
import WithColorScheme from "../../utils/WithColorScheme";


export default {
    component: TextField,
    title: 'TextField',
    decorators: [WithColorScheme]
}


export const Default = {
    args: {
        label: 'Text Field',
        placeholder: "Please type something..."
    }
}

export const Error = {
    args: {
        ...Default.args,
        error: true
    }
}