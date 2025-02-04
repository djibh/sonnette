import { Tab, TabPane } from "semantic-ui-react";

function ProfileContent() {
    const panes = [
        { MenuItem: "About", render: () => <TabPane>About Content</TabPane> },
        { MenuItem: "Photos", render: () => <TabPane>Photos Content</TabPane> },
        { MenuItem: "Events", render: () => <TabPane>Events Content</TabPane> },
        {
            MenuItem: "Followers",
            render: () => <TabPane>Followers Content</TabPane>,
        },
        {
            MenuItem: "Following",
            render: () => <TabPane>Following Content</TabPane>,
        },
    ];
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition="right"
            panes={panes}
        />
    );
}

export default ProfileContent;
