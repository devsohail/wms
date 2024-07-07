//#region imports
import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { Users } from "react-feather";
//#endregion

function Cards(props) {
    return (
        <Fragment>
            <Card>
                <CardBody className="">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2 className={`fw-bolder mb-0 ${props.color ? `text-${props.color}` : 'text-primary'}`} >
                                {props.stats}
                            </h2>
                            <p className='card-text'>{props.statsTitle}</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 ${props.color ? `bg-light-${props.color}` : 'bg-light-primary'}`}>
                            <div className='avatar-content'>
                                {props.icon}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    );
}

export default Cards;
