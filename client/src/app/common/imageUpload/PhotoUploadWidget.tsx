import { Grid, GridColumn, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

function PhotoUploadWidget() {
    return (
        <Grid>
            <GridColumn width={4}>
                <Header sub color="teal" content="Step 1 - Add Photo" />
                <PhotoWidgetDropzone />
            </GridColumn>
            <GridColumn width={1} />
            <GridColumn width={4}>
                <Header sub color="teal" content="Step 2 - Resize Image" />
            </GridColumn>
            <GridColumn width={1} />
            <GridColumn width={4}>
                <Header sub color="teal" content="Step 3 - Preview & Upload" />
            </GridColumn>
        </Grid>
    );
}

export default PhotoUploadWidget;
