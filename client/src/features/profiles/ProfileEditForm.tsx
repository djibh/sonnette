import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import CustomTextArea from "../../app/common/form/CustomTextArea";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

function ProfileEditForm({ setEditMode }: Props) {
    const {
        profileStore: { profile, updateProfile },
    } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName,
                bio: profile?.bio,
            }}
            onSubmit={(values) => {
                updateProfile(values).then(() => setEditMode(false));
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className="ui form">
                    <CustomTextInput
                        placeholder="Display name"
                        name="displayName"
                    />
                    <CustomTextArea
                        rows={3}
                        placeholder="Add your bio"
                        name="bio"
                    />
                    <Button
                        positive
                        type="submit"
                        loading={isSubmitting}
                        content="Update profile"
                        floated="right"
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    );
}

export default observer(ProfileEditForm);
