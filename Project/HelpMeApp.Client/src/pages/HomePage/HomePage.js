import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.css";
import routingUrl from "../../constants/routingUrl";

const HomePage = () => {
    return (
        <div className="container">
            <section>
                <div className="row justify-content-space-around mt-5">
                    <Link
                        to={routingUrl.pathToGetHelpBoard + "/1"}
                        className="col-md-3 mt-3"
                    >
                        <button className="btn btn-outline-primary w-100 h-100">
                            I want to sell
                        </button>
                    </Link>
                    <Link
                        to={routingUrl.pathToGiveHelpBoard + "/1"}
                        className="col-md-3 mt-3"
                    >
                        <button className="btn btn-outline-warning w-100 h-100">
                        I want to buy
                        </button>
                    </Link>
                </div>
            </section>
            <section>
                <div className="row mt-5 justify-content-center">
                    <h6 className="col-md-12 text-center">About the project</h6>
                    <p className="col-md-6">
                        This app makes it easier and more convenient to buy and
                        sell any products and services. The system also includes
                        a simulation of the buying and selling process.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
