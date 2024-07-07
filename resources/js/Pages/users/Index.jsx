//#region imports
import React, { Fragment } from "react";
import { Card, CardBody, Col, Row } from '@mui/material';
import { Helmet } from "react-helmet";
import { Home, UserCheck, UserX, Users } from "react-feather";
import Cards from "./components/Cards";
import UserLists from "./components/UserLists";
//#endregion

function UserPage() {

    //#region Redux
    const user = useSelector((store) => store.auth.user);
    //#endregion

    return (
        <Fragment>
            <Helmet>
                <title>Home | {siteInfo.siteLongName}</title>
            </Helmet>
            <Row className="">
                <Col sm="6" xl="3">
                    <Cards stats="190" statsTitle="Total Users" icon={<Users />} color="primary" />
                </Col>
                <Col sm="6" xl="3">
                    <Cards stats="20" statsTitle="Total Clinins" icon={<Home />} color="success" />
                </Col>
                <Col sm="6" xl="3">
                    <Cards stats="190" statsTitle="Active Users" icon={<UserCheck />} color="info" />
                </Col>
                <Col sm="6" xl="3">
                    <Cards stats="190" statsTitle="In-Active Users" icon={<UserX />} color="danger" />
                </Col>
            </Row>
            <Row className="">
                <Col sm="12">
                    <UserLists />
                </Col>
              
            </Row>
        </Fragment>
    );
}

export default UserPage;
