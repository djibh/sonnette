import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: "10px"}} />
                Sonnette
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button positive content="Create activity" />
            </Menu.Item>
        </Container>
    </Menu>
  )
}
