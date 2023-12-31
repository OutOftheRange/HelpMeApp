import { useState, React, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ProfileDataModificationScheme from "../../validation/ProfileDataModification";
import { baseRequestWithToken } from "../../services/axiosServices";
import "bootstrap/dist/css/bootstrap.css";
import "./UserProfile.css";

const UserDataModificationForm = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [userData, setUserData] = useState({});

    useEffect(() => {
        retrieveUserData();
    }, []);

    const submitDataModification = async (values) => {
        const ModificationData = {
            email: values.email ?? userData.email,
            name: values.name ?? userData.name,
            surname: values.surname ?? userData.surname,
            userName: values.userName ?? userData.userName,
            info: values.info ?? userData.info,
            phoneNumber: values.phoneNumber ?? userData.phoneNumber,
            uploadedFiles: values.photo ?? userData.photo
        };

        setAlertMessage("");
        setSuccessMessage("");
        await baseRequestWithToken
            .put("profile/update-user", ModificationData)
            .then((response) => {
                if (response.data.success) {
                    setSuccessMessage(
                        "Success! Your account has been updated successfully"
                    );
                } else {
                    setAlertMessage(response.data.message);
                }
            })
            .catch(() => {
                setAlertMessage("An error occured while modifing data");
            });
    };

    const retrieveUserData = async () => {
        await baseRequestWithToken
            .get("/profile/get-my-info")
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                setUserData(data);
            });
    };

    return (
        <>
            <Formik
                initialValues={{}}
                onSubmit={async (values) => {
                    submitDataModification(values);
                }}
                validationSchema={ProfileDataModificationScheme}
            >
                {(formik) => {
                    const { isValid } = formik;
                    return (
                        <Form className="creation-form">
                            <h1 className="text-center mt-3 mb-3">
                                Modify your info
                            </h1>

                            <div className="mx-auto w-75">
                                <label htmlFor="email" className="mb-5">
                                    Email
                                </label>
                                <Field
                                    as="input"
                                    type="email"
                                    name="email"
                                    value = {userData.email}
                                    onChange={event => setUserData({ ...userData, email: event.target.value })}
                                    placeholder={userData.email}
                                    className="up form-control border-primary"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>

                            <div className="mx-auto w-75">
                                <label htmlFor="password" className="mb-5">
                                    Password
                                </label>
                                <Field
                                    as="input"
                                    type="password"
                                    name="password"
                                    value = {userData.password}
                                    onChange={event => setUserData({ ...userData, password: event.target.value })}
                                    placeholder="Type new password if you want to change it"
                                    className="h-100 up form-control border-primary"
                                    rows="4"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>

                            <div className="mx-auto w-75">
                                <label htmlFor="name" className="mb-5">
                                    Name
                                </label>
                                <Field
                                    as="input"
                                    type="text"
                                    name="name"
                                    onChange={event => setUserData({ ...userData, name: event.target.value })}
                                    value = {userData.name}
                                    placeholder={userData.name}
                                    className="h-100 up form-control border-primary"
                                    rows="4"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="name" />
                                </div>
                            </div>

                            <div className="mx-auto w-75">
                                <label htmlFor="surname" className="mb-5">
                                    Surname
                                </label>
                                <Field
                                    as="input"
                                    type="text"
                                    name="surname"
                                    value = {userData.surname}
                                    onChange={event => setUserData({ ...userData, surname: event.target.value })}
                                    placeholder={userData.surname}
                                    className="h-100 up form-control border-primary"
                                    rows="4"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="surname" />
                                </div>
                            </div>

                            <div className="mx-auto w-75">
                                <label htmlFor="userName" className="mb-5">
                                    Username
                                </label>
                                <Field
                                    as="input"
                                    type="text"
                                    name="userName"
                                    value = {userData.userName}
                                    onChange={event => setUserData({ ...userData, userName: event.target.value })}
                                    placeholder={userData.userName}
                                    className="h-100 up form-control border-primary"
                                    rows="4"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="userName" />
                                </div>
                            </div>

                            <div className="mx-auto w-75">
                                <label htmlFor="phoneNumber" className="mb-5">
                                    Phone number
                                </label>
                                <Field
                                    as="input"
                                    type="tel"
                                    name="phoneNumber"
                                    value = {userData.phoneNumber}
                                    onChange={event => setUserData({ ...userData, phoneNumber: event.target.value })}
                                    placeholder={userData.phoneNumber}
                                    className="h-100 up form-control border-primary"
                                    rows="4"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="phoneNumber" />
                                </div>
                            </div>

                            <div className="mx-auto w-75">
                                <label htmlFor="info" className="mb-5">
                                    Information
                                </label>
                                <Field
                                    as="input"
                                    type="text"
                                    name="info"
                                    value = {userData.info}
                                    onChange={event => setUserData({ ...userData, info: event.target.value })}
                                    placeholder={userData.info}
                                    className="h-100 up form-control border-primary"
                                    rows="4"
                                />
                                <div className="error-message-profile">
                                    <ErrorMessage name="info" />
                                </div>
                            </div>

                            <div className="error-message-submit-profile">
                                {alertMessage}
                            </div>
                            <br />
                            <button
                                className="mx-auto w-75 mb-5 submit-button horizontal-center btn btn-primary mb-3"
                                type="submit"
                                disabled={!(isValid)}
                            >
                                Update
                            </button>
                            <div className="success-message-profile">
                                {successMessage}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default UserDataModificationForm;
