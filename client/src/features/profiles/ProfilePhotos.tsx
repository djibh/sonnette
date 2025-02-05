import { observer } from "mobx-react-lite";
import { Card, CardGroup, Header, Image, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";

interface Props {
    profile: Profile;
}

function ProfilePhotos({ profile }: Props) {
    return (
        <TabPane>
            <Header icon="image" content="Photos" />
            <CardGroup itemsPerRow={5}>
                {profile.photos?.map((photo) => (
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                    </Card>
                ))}
            </CardGroup>
        </TabPane>
    );
}

export default observer(ProfilePhotos);
