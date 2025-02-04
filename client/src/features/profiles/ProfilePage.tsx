import { Grid, GridColumn } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

function ProfilePage() {
    return (
        <Grid>
            <GridColumn width={16}>
                <ProfileHeader />
                <ProfileContent />
            </GridColumn>
        </Grid>
    );
}

export default ProfilePage;
