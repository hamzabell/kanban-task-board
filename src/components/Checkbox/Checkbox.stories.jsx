import Checkbox from ".";
import WithColorScheme from "../../utils/WithColorScheme";
import CheckBoxGroup from "./CheckboxGroup";

export default {
    component: Checkbox,
    title: 'Checkbox',
    decorators: [WithColorScheme]
}

export const Default  = {
    args: {
        title: 'Buy some Groceries',
        id: 1,
        onCheck: (values) => console.log(values)
    }
}

export const GroupedCheckbox = {
    decorators: [
        () => (
            <CheckBoxGroup>
                <Checkbox id={1} title={'Buy some Groceries'} onCheck={(v) => console.log(v)} />
                <Checkbox id={2} title={'Buy some Coffee'} onCheck={(v) => console.log(v)} />
                <Checkbox id={3} title={'Go to Macdonalds'} onCheck={(v) => console.log(v)} />
            </CheckBoxGroup>
        )
    ]
}