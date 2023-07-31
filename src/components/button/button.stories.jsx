import Button from './index';
import WithColorScheme from '../../utils/WithColorScheme';


export default {
    component: Button,
    title: 'Button',
    decorators: [WithColorScheme]
}

export const Primary = {
    args: {
       primary: true,
       secondary: false,
       destructive: false,
       children: 'click me!'
    }
}


export const Secondary = {
    args: {
        children: 'click me!',
        secondary: true
    }
}

export const Destructive = {
    args: {
        children: 'click me!',
        destructive: true
    }
}