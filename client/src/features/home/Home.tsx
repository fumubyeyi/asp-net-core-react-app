import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function Home(){
    return (
        <Container style={{marginTop: "7em"}}>
            <h1>Welcome to the Home Page</h1>
            <h3>Go to <Link to='/activities'>Activities</Link></h3>
        </Container>
    )
}