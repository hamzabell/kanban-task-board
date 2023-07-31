import Dropdown from ".";
import WithColorScheme from "../../utils/WithColorScheme";


export default {
    component: Dropdown,
    title: 'Dropdown',
    decorators: [WithColorScheme]
}


export const Default = {
    args: {
        defaultMessage: 'Select an Item...',
        label: 'Dropdown'
    }
}


const Items = () => (
    <>
        <option value={'todo'}>Todo</option>
        <option value={'doing'}>Doing</option>
        <option value={'done'}>Done</option>
    </>
)

export const WithItems = {
    args: {
        ...Default.args,
        children: <Items />
    }
}