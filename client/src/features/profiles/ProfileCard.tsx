import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/Profile";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    Icon,
    Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Props {
    profile: Profile;
}

function ProfileCard({ profile }: Props) {
    const truncate = (bioText: string | undefined) => {
        if (bioText) {
            return bioText.length > 40
                ? bioText.substring(0, 37) + "..."
                : bioText;
        }
    };
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || "/assets/user.png"} />
            <CardContent>
                <CardHeader>{profile.displayName}</CardHeader>
                <CardDescription>{truncate(profile.bio)}</CardDescription>
            </CardContent>
            <CardContent extra>
                <Icon name="user" />
                20 followers
            </CardContent>
        </Card>
    );
}

export default observer(ProfileCard);
