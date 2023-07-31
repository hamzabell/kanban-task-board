import Header from "."
import WithColorScheme from "../../utils/WithColorScheme"

export default {
    component: Header,
    title: 'Header',
    decorators: [WithColorScheme]
}


export const Default = {
    args: {
        boardName: 'Platform Launch',
        onOptionsClick: (value) => console.log(value)
    }
}