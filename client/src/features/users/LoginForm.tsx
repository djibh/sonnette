import { Form, Formik } from "formik";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => userStore.login(values)}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form
                    className="ui form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <CustomTextInput placeholder="Email" name="email" />
                    <CustomTextInput
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <Button
                        loading={isSubmitting}
                        positive
                        content="login"
                        type="submit"
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
});
