import { Button, Container, Menu} from 'semantic-ui-react'
import { useStore } from '../../stores/stores/store'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

export default observer(function NavBar(){

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: "10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to="/activities" />
                <Menu.Item>
                    <Button positive content='Create Activity' as={NavLink} to="/create" />
                </Menu.Item>
            </Container>
    </Menu>
    )
})