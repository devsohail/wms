import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
    InputGroup,
    InputGroupText,
} from "reactstrap";
import { Save, X } from "react-feather";
import Cleave from 'cleave.js/react'
import CustomButton from "../../../../components/CustomButton";
import ModalLoading from "../../../../components/ModalLoading";
import { UserService } from "../../../../services/UserService";

const AddEditUserModal = ({
    open,
    stateChanger,
    oneProduct,
    refreshParent,
}) => {
    const [oneProductData, setOneProductData] = useState(null);
    const [image, setImage] = useState(null);

    const options = { delimiters: ['-'], blocks: [4, 7], uppercase: true };

    const { isFetching: gettingOneProduct } = UserService.getUsers(
        "get-one-product",
        oneProduct?.id,
        {
            onSuccess: (response) => {
                if (response.data.success) {
                    setOneProductData(response.data.result);
                } else {
                    setOneProductData(null);
                }
            },
            onError: (error) => {
                setOneProductData(null);
            },
            enabled: !!oneProduct,
        }
    );

    const { mutate: addProduct, isLoading: addingProduct } = UserService.saveUser({
        onSuccess: (response) => {
            if (response.data.success) {
                SweetAlert("success", response.data.message);
                stateChanger(false);
                refreshParent(Math.random());
                formik.resetForm();
            } else {
                const errs = response.data.result;
                if (errs && Object.keys(errs)?.length > 0) {
                    SweetAlertWithValidation(errs);
                    return;
                } else {
                    SweetAlert("error", response.data.message);
                }
            }
        },
        onError: (error) => {
            const errs = error?.response?.data?.result?.referenceErrorCode ? null : error?.response?.data?.result;
            if (errs && Object.keys(errs)?.length > 0) {
                SweetAlertWithValidation(errs);
            } else {
                SweetAlert(
                    "error",
                    error?.response?.data?.message ||
                    error?.response?.data?.title ||
                    error?.message
                );
            }
        },
    });

    const { mutate: updateProduct, isLoading: updatingProduct } = UserService.saveUser({
        onSuccess: (response) => {
            if (response.data.success) {
                SweetAlert("success", response.data.message);
                stateChanger(false);
                refreshParent(Math.random());
            } else {
                const errs = response.data.result;
                if (errs && Object.keys(errs)?.length > 0) {
                    SweetAlertWithValidation(errs);
                    return;
                } else {
                    SweetAlert("error", response.data.message);
                }
            }
        },
        onError: (error) => {
            const errs = error?.response?.data?.result?.referenceErrorCode ? null : error?.response?.data?.result;
            if (errs && Object.keys(errs)?.length > 0) {
                SweetAlertWithValidation(errs);
            } else {
                SweetAlert(
                    "error",
                    error?.response?.data?.message ||
                    error?.response?.data?.title ||
                    error?.message
                );
            }
        },
    });

    const initialValues = {
        id: oneProduct ? oneProduct.id : 0,
        name: oneProduct ? oneProduct.name : "",
        email: oneProduct ? oneProduct.email : "",
        password: oneProduct ? oneProduct.password : "",
        cnic: oneProduct ? oneProduct.cnic : "",
        clinic: oneProduct ? oneProduct.clinic : "",
        contactNumber: oneProduct ? oneProduct.contactNumber : "",
        city: oneProduct ? oneProduct.city : "",
        fullName: oneProduct ? oneProduct.fullName : "",
        role: oneProduct ? oneProduct.role : "",
        status: oneProduct ? oneProduct.status : "",
        username: oneProduct ? oneProduct.username : "",
        gender: oneProduct ? oneProduct.gender : "",
    };

    const schema = Yup.object().shape({
        name: Yup.string().trim().required("Name is required"),
        email: Yup.string().trim().email("Invalid email").required("Email is required"),
        password: Yup.string().trim().required("Password is required"),
        cnic: Yup.string().trim().required("CNIC is required"),
        clinic: Yup.string().trim().required("Clinic is required"),
        contactNumber: Yup.string().trim().required("Contact number is required"),
        city: Yup.string().trim().required("City is required"),
        fullName: Yup.string().trim().required("Full name is required"),
        role: Yup.string().trim().required("Role is required"),
        status: Yup.string().trim().required("Status is required"),
        username: Yup.string().trim().required("Username is required"),
        gender: Yup.string().trim().required("Gender is required"),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (values) => {
            const payload = new FormData();
            Object.keys(values).forEach(key => payload.append(key, values[key]));

            if (image != null) {
                payload.append("image", image);
            }

            if (oneProductData) {
                payload.append("id", values.id);
                updateProduct(payload);
            } else {
                addProduct(payload);
            }
        },
    });

    useEffect(() => {
        if (oneProductData) {
            formik.setValues({
                id: oneProductData?.id,
                name: oneProductData?.name,
                email: oneProductData?.email,
                password: oneProductData?.password,
                cnic: oneProductData?.cnic,
                clinic: oneProductData?.clinic,
                contactNumber: oneProductData?.contactNumber,
                city: oneProductData?.city,
                fullName: oneProductData?.fullName,
                role: oneProductData?.role,
                status: oneProductData?.status,
                username: oneProductData?.username,
                gender: oneProductData?.gender,
            });
        } else {
            formik.resetForm();
        }
    }, [oneProductData]);

    const handleClose = () => {
        stateChanger(false);
        formik.resetForm();
        setOneProductData(null);
        setImage(null);
    };

    return (
        <Modal
            isOpen={open}
            toggle={handleClose}
            contentClassName="p-0"
            backdrop="static"
            keyboard={false}
            size="xl"
            centered
            scrollable
        >
            <ModalHeader className="fw-bold" tag="h4" toggle={handleClose}>
                {oneProduct ? "Update User" : "Add New User"}
            </ModalHeader>
            <ModalBody className="flex-grow-1">
                {gettingOneProduct ? (
                    <ModalLoading />
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="alert alert-info px-1 py-50">
                            <h6 className="mb-0">
                                Required fields are represented by{" "}
                                <span className="text-danger fw-bolder">' * '</span>
                            </h6>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="cnic" className="form-label">CNIC Number<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="text"
                                        id="cnic"
                                        name="cnic"
                                        placeholder="11111-1111111-1"
                                        value={formik.values.cnic}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.cnic && !!formik.errors.cnic}
                                    />
                                    {formik.touched.cnic && <div className="invalid-feedback">{formik.errors.cnic}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="clinic" className="form-label">Clinic<span className="text-danger ms-25">*</span></label>
                                    <select
                                        id="clinic"
                                        name="clinic"
                                        className="form-select"
                                        value={formik.values.clinic}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.clinic && !!formik.errors.clinic}
                                    >
                                    </select>
                                    {formik.touched.clinic && <div className="invalid-feedback">{formik.errors.clinic}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="contactNumber" className="form-label">Contact No.<span className="text-danger ms-25">*</span></label>
                                    <InputGroup className='input-group-merge'>
                                        <InputGroupText>PK (+92)</InputGroupText>
                                        <Cleave
                                            id="contactNumber"
                                            name="contactNumber"
                                            className='form-control'
                                            placeholder="0300-0000000"
                                            options={options}
                                            value={formik.values.contactNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            invalid={formik.touched.contactNumber && !!formik.errors.contactNumber}
                                        />
                                    </InputGroup>
                                    {formik.touched.contactNumber && <div className="invalid-feedback">{formik.errors.contactNumber}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="city" className="form-label">City<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Enter City"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.city && !!formik.errors.city}
                                    />
                                    {formik.touched.city && <div className="invalid-feedback">{formik.errors.city}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="fullName" className="form-label">Full Name<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter Full Name"
                                        value={formik.values.fullName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.fullName && !!formik.errors.fullName}
                                    />
                                    {formik.touched.fullName && <div className="invalid-feedback">{formik.errors.fullName}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="role" className="form-label">Role<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="text"
                                        id="role"
                                        name="role"
                                        placeholder="Enter Role"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.role && !!formik.errors.role}
                                    />
                                    {formik.touched.role && <div className="invalid-feedback">{formik.errors.role}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="status" className="form-label">Status<span className="text-danger ms-25">*</span></label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-select"
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.status && !!formik.errors.status}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="In-Active">In-Active</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                    {formik.touched.status && <div className="invalid-feedback">{formik.errors.status}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="username" className="form-label">Username<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Enter Username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.username && !!formik.errors.username}
                                    />
                                    {formik.touched.username && <div className="invalid-feedback">{formik.errors.username}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="gender" className="form-label">Gender<span className="text-danger ms-25">*</span></label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="form-select"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.gender && !!formik.errors.gender}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {formik.touched.gender && <div className="invalid-feedback">{formik.errors.gender}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="email" className="form-label">Email<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.email && !!formik.errors.email}
                                    />
                                    {formik.touched.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="password" className="form-label">Password<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        invalid={formik.touched.password && !!formik.errors.password}
                                    />
                                    {formik.touched.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="form-group mb-1">
                                    <label htmlFor="uploadFile" className="form-label">Upload Picture<span className="text-danger ms-25">*</span></label>
                                    <Input
                                        type="file"
                                        id="uploadFile"
                                        name="uploadFile"
                                        onChange={(event) => {
                                            formik.setFieldValue("uploadFile", event.currentTarget.files[0]);
                                            setImage(event.currentTarget.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-1">
                                    <label htmlFor="notes" className="form-label">Notes</label>
                                    <Input
                                        type="textarea"
                                        id="notes"
                                        name="notes"
                                        placeholder="Enter Notes"
                                        value={formik.values.notes}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                        </div>
                         
                    </form>
                )}
            </ModalBody>
            <ModalFooter>
            <CustomButton
                    text="Cancel"
                    color="secondary"
                    onClick={handleClose}
                    disabled={addingProduct || updatingProduct}
                > <X size={14} />
                <span className="ms-50 mt-1px">Cancel</span>
            </CustomButton>
                <CustomButton
                    text={oneProduct ? "Update" : "Save"}
                    color="primary"
                    onClick={formik.handleSubmit}
                    icon={<Save />}
                    disabled={addingProduct || updatingProduct}
                    isLoading={addingProduct || updatingProduct}
                > <Save size={14} />
                <span className="ms-50 mt-1px">Save</span>
            </CustomButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddEditUserModal;
