import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";
import { Edit, Trash, Plus } from "react-feather";
import Swal from "sweetalert2";
import { useSkin } from "@hooks/useSkin";
// import CustomDataTable from "../../../../components/CustomDataTable";
// import { UserService } from "../../../../services/UserService";
// import AddEditUserModal from "./AddEditUserModal";
import { Helmet } from "react-helmet";
import { siteInfo } from "@src/constants";


const UserLists = () => {
  const { skin } = useSkin();
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(null);
  const [showUpsertProductModal, setShowUpsertProductModal] = useState(false);
  const [data, setData] = useState([]);
  const [oneProduct, setOneProduct] = useState(null);
  const [currentDeleteID, setCurrentDeleteID] = useState(null);
  const [isChangingStatus, setIsChangingStatus] = useState(null);

  const [columns, setColumns] = useState([
    
    {
      name: "id",
      selector: (row) => row?.id,
      sortable: true,
      isSearchAble: true,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      isSearchAble: true,
    },
    {
      name: "Username",
      selector: (row) => row?.username,
      sortable: true,
      isSearchAble: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
      isSearchAble: true,
    },
    {
      name: "Role",
      selector: (row) => (row?.role_id === 1 ? "Admin" : "User"),
      sortable: true,
      isSearchAble: true,
    },
    {
      name: "Status",
      selector: (row) => (row?.status === 1 ? "Active" : "Inactive"),
      sortable: true,
      isSearchAble: true,
    },
    {
      name: "Actions",
      minWidth: "150px",
      maxWidth: "150px",
      allowOverflow: true,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Button
            id={`editUser${row?.id}`}
            size="sm"
            color="flat-success"
            className="rounded-circle btn-icon"
            onClick={() => handleEdit(row)}
          >
            <Edit size={15} />
          </Button>
          <UncontrolledTooltip placement="top" target={`editUser${row?.id}`}>
            Edit User
          </UncontrolledTooltip>
          <Button
            id={`deleteUser${row?.id}`}
            size="sm"
            color="flat-danger"
            className="rounded-circle btn-icon"
            onClick={() => handleDelete(row.id)}
          >
            <Trash size={15} />
          </Button>
          <UncontrolledTooltip placement="top" target={`deleteUser${row?.id}`}>
            Delete User
          </UncontrolledTooltip>
        </div>
      ),
    },
  ]);

  // useEffect(() => {
  //   setLoading(true);
  //   UserService.getUsers()
  //     .then((response) => {
  //       setData(response);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //       setLoading(false);
  //     });
  // }, [refresh]);


  const refreshParent = (prop) => {
    setRefresh(prop);
  };

  // Function to handle user deletion
  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(userId)
          .then((response) => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setRefresh((prev) => prev + 1);
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  // Function to handle user editing
  const handleEdit = (user) => {
    setOneProduct(user);
    setShowUpsertProductModal(true);
  };

  return (
    <div>
      <Helmet>
        <title>Users | {siteInfo.siteLongName}</title>
      </Helmet>
      <Card actions={["collapse"]}>
        <CardHeader className="card-header header-elements bg-primary text-white border-bottom py-1">
          <CardTitle tag="h4" className="text-white fw-bold">Users List</CardTitle>
          <div className="action-icons">
            <Button
              color="light"
              size="sm"
              onClick={() => {
                setOneProduct(null);
                setShowUpsertProductModal(true);
              }}
            >
              <Plus size={15} />
              <span className="align-middle ms-50">Add New User</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="pt-2">
          <CustomDataTable
            columns={columns}
            data={data}
            progressPending={loading}
            noDataText="No Users Found"
          />
        </CardBody>
      </Card>
      {showUpsertProductModal && (
        <AddEditUserModal
          open={showUpsertProductModal}
          stateChanger={setShowUpsertProductModal}
          oneProduct={oneProduct}
          refreshParent={refreshParent}
        />
      )}
    </div>
  );
};

UserService.getUsers()
  .then((response) => {
    console.log('Fetched Data:', response); // Log the data to check its structure
    setData(response);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
    setLoading(false);
  });
export default UserLists;
