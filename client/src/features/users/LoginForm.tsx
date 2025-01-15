import { Form, Formik } from "formik";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { Button } from "semantic-ui-react";

export default function LoginForm() {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
        >
            {({ handleSubmit }) => (
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
                    <Button positive content="login" type="submit" fluid />
                </Form>
            )}
        </Formik>
    );
}
