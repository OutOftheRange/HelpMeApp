import { React, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../services/authorizationServices";
import { baseRequest } from "../../services/axiosServices";
import PropTypes from "prop-types";
// import routingUrl from "../../constants/routingUrl";
import "bootstrap/dist/css/bootstrap.css";

const OtherUserButtons = (props) => {
    const navigate = useNavigate();

    const [showReport, setShowReport] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);

    const [alertReportMessage, setAlertResponseMessage] = useState("");

    const handleClose = () => {
        setShowReport(false);
        setShowPurchase(false);
        setAlertResponseMessage("");
    };
    const handleShowReport = () => {
        checkToken() ? setShowReport(true) : navigate("/login");
    };

    const handleShowPurchase = () => {
        checkToken() ? setShowPurchase(true) : navigate("/login");
    };

    return (
        <div className="row mt-auto actions-block">
            <button
                className="btn btn-primary col-xs-12 col-md-4 action-button"
                onClick={(e) => {
                    e.preventDefault();
                    handleShowPurchase();
                }}
            >
                Purchase
            </button>

            <Modal show={showPurchase} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Purchase this item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Formik
                            initialValues={{
                                text: ""
                            }}
                        >
                            <Form>
                                <p> Are you sure you want to purchase this item</p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mb-1 modal-btn mx-3"
                                        onClick={handleClose}

                                    >
                                        Purchase
                                    </button>
                                    <button
                                        type="action"
                                        className="btn btn-danger mb-1 modal-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="error-message mt-3 text-center">
                                    {alertReportMessage}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>

            <button
                className="btn btn-danger col-xs-12 col-md-4 action-button"
                onClick={handleShowReport}
            >
                Report
            </button>
            <Modal show={showReport} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Report this advert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Formik
                            initialValues={{
                                text: ""
                            }}
                            onSubmit={async (values) => {
                                await baseRequest
                                    .post(
                                        `/adverts/report/${props.advertId}`,
                                        values.text,
                                        {
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                                Authorization:
                                                    "Bearer " +
                                                    localStorage.token
                                            }
                                        }
                                    )
                                    .then((response) => {
                                        handleClose();
                                    })
                                    .catch(() => {
                                        setAlertResponseMessage(
                                            "Unsuccessful report"
                                        );
                                    });
                            }}
                        >
                            <Form>
                                <Field
                                    name="text"
                                    component="textarea"
                                    type="text"
                                    rows="7"
                                    className="form-control mb-4"
                                />
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-danger mb-1 modal-btn"
                                    >
                                        Report
                                    </button>
                                </div>
                                <div className="error-message mt-3 text-center">
                                    {alertReportMessage}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

OtherUserButtons.propTypes = {
    advertId: PropTypes.string
};

export default OtherUserButtons;
