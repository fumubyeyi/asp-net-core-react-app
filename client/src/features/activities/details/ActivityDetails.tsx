import { Button, Card, Image} from 'semantic-ui-react';
import { Activity } from '../../../interfaces/activity';

interface Props{
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}
export default function ActivityDetails({activity, cancelSelectActivity, openForm}: Props){
    return (
        <Card>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={() => cancelSelectActivity()} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}