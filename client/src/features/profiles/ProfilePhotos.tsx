import { observer } from "mobx-react-lite";
import {
    Button,
    ButtonGroup,
    Card,
    CardGroup,
    Grid,
    GridColumn,
    Header,
    Image,
    TabPane,
} from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/Profile";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

interface Props {
    profile: Profile;
}

function ProfilePhotos({ profile }: Props) {
    const {
        profileStore: {
            isCurrentUser,
            uploadPhoto,
            uploading,
            loading,
            setMainPhoto,
        },
    } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState("");

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    };

    const handleSetMainPhoto = (
        photo: Photo,
        e: SyntheticEvent<HTMLButtonElement>
    ) => {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    };

    return (
        <TabPane>
            <Grid>
                <GridColumn width={16}>
                    <Header floated="left" icon="image" content="Photos" />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? "Cancel" : "Add photo"}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </GridColumn>
                <GridColumn width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget
                            uploadPhoto={handlePhotoUpload}
                            loading={uploading}
                        />
                    ) : (
                        <CardGroup itemsPerRow={5}>
                            {profile.photos?.map((photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <ButtonGroup fluid widths={2}>
                                            <Button
                                                basic
                                                color="green"
                                                content="Main"
                                                name={photo.id}
                                                disabled={photo.isMain}
                                                loading={
                                                    target === photo.id &&
                                                    loading
                                                }
                                                onClick={(e) =>
                                                    handleSetMainPhoto(photo, e)
                                                }
                                            />
                                            <Button
                                                basic
                                                color="red"
                                                icon="trash"
                                            />
                                        </ButtonGroup>
                                    )}
                                </Card>
                            ))}
                        </CardGroup>
                    )}
                </GridColumn>
            </Grid>
        </TabPane>
    );
}

export default observer(ProfilePhotos);
