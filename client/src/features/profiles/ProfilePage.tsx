import { Grid, GridColumn } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;

    useEffect(() => {
        if (username) loadProfile(username);
    }, [loadProfile, username]);

    if (loadingProfile)
        return <LoadingComponent content="Loading profile..." />;

    return (
        <Grid>
            <GridColumn width={16}>
                {profile && (
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>
                )}
            </GridColumn>
        </Grid>
    );
}

export default observer(ProfilePage);
