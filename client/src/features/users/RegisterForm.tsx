import { ErrorMessage, Form, Formik } from "formik";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";

function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: "",
                username: "",
                email: "",
                password: "",
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .register(values)
                    .catch(() => setErrors({ error: "Invalid email/password" }))
            }
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form
                    className="ui form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <Header
                        as="h2"
                        content="Sign up to Sonnette"
                        color="teal"
                        textAlign="center"
                    />
                    <CustomTextInput
                        placeholder="Display Name"
                        name="displayName"
                    />
                    <CustomTextInput placeholder="Username" name="username" />
                    <CustomTextInput placeholder="Email" name="email" />
                    <CustomTextInput
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <Label
                                style={{ marginBottom: 10 }}
                                basic
                                color="red"
                                content={errors.error}
                            />
                        )}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive
                        content="Register"
                        type="submit"
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
}

export default observer(RegisterForm);
