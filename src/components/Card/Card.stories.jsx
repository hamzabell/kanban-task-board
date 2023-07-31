import Card from ".";
import WithColorScheme from "../../utils/WithColorScheme";
import CardWrapper, { CardTitle } from "./CardWrapper";


export default {
    component: Card,
    title: 'Card',
    decorators: [WithColorScheme]
}

export const Default = {
    args: {
        title: "Build UI for onboarding flow",
        completed: 1,
        total: 3
    }
}


export const WithWrapper = {
    decorators: [
        () => (
           <CardWrapper title={<CardTitle  color={'#49C4E5'} title="Doing" count={4} />}>
            <Card title="Build UI for onboarding flow" completed={1}  total={3} />        
            <Card title="Build UI for onboarding flow" completed={1}  total={4} />
            <Card title="Build UI for onboarding flow" completed={1}  total={5} />        
            <Card title="Build UI for onboarding flow" completed={1}  total={7} />
           </CardWrapper> 
        )
    ]
}

