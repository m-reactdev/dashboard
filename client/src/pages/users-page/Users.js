import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateModal from "./user-modals/CreateModal";
import DeleteModal from "./user-modals/DeleteModal";
import EditModal from "./user-modals/EditModal";
import Pagination from "../../components/Pagination";
import { fetchUsers } from "../../store/actions/all-actions/AuthAction";
import UserRights from "./user-modals/UserRights";

const Users = () => {
  // Get auth and all users & dispatch
  let dispatch = useDispatch();
  let allUsers = useSelector(({ AuthState }) => {
    return AuthState.allUser;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Modal States
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openUserSetting, setOpenUserSetting] = useState(false);

  // Update User States
  const [_id, set_id] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updateUserRights, setUpdateUserRights] = useState([]);

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =
    allUsers && allUsers.length > 0 && allUsers.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allUsers && allUsers.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCpage = (id) => {
    setCurrentPage(id);
  };

  // Edit User Rights Function
  const openUserRights = (item) => {
    setOpenUserSetting(!openUserSetting);
    let password = atob(item.password);
    set_id(item._id);
    setUpdateName(item.name);
    setUpdateEmail(item.email);
    setUpdateRole(item.role);
    setUpdatePassword(password);
    setUpdateStatus(item.status);
    setUpdateUserRights(item.userRights);
  };

  // Edit User Function
  const editUserModal = (item) => {
    let password = atob(item.password);
    setEditModal(!editModal);
    set_id(item._id);
    setUpdateName(item.name);
    setUpdateEmail(item.email);
    setUpdateRole(item.role);
    setUpdatePassword(password);
    setUpdateStatus(item.status);
    setUpdateUserRights(item.userRights);
  };

  // Delete User Function
  const deleteUserModal = (item) => {
    setDeleteModal(!deleteModal);
    set_id(item._id);
  };

  // Fetch Users Function
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <MDBContainer>
        {openUserSetting ? (
          <UserRights
            openUserSetting={openUserSetting}
            setOpenUserSetting={setOpenUserSetting}
            _id={_id}
            updateName={updateName}
            updateEmail={updateEmail}
            updateRole={updateRole}
            updatePassword={updatePassword}
            updateStatus={updateStatus}
            updateUserRights={updateUserRights}
          />
        ) : (
          <>
            <div className="create-new">
              <div>
                <Link
                  className="btn_icon"
                  onClick={() => setCreateModal(!createModal)}
                >
                  <BiPlus />
                </Link>
              </div>
            </div>
            <div className="dataTables">
              <MDBTable striped responsive hover small bordered>
                <MDBTableHead>
                  <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Role</th>
                    <th>User Password</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Rights</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {records && records.length > 0 ? (
                    records
                      .filter((e) => e.email === authUser.email)
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ textTransform: "uppercase" }}>
                              U{item._id.slice(-2)}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{atob(item.password)}</td>
                            <td className="text-center">
                              <Link
                                className={
                                  item.status === "Active" ? "btn-approve" : ""
                                }
                              >
                                {item.status}
                              </Link>{" "}
                            </td>
                            <td className="text-center">
                              <Link onClick={() => openUserRights(item)}>
                                {item.status === "Pending"
                                  ? "Setting"
                                  : "Update Rights"}
                              </Link>
                            </td>
                            {item.status === "Active" ? (
                              <td className="text-center">
                                <Link onClick={() => editUserModal(item)}>
                                  Edit
                                </Link>
                              </td>
                            ) : (
                              <td className="text-center">
                                <Link onClick={() => editUserModal(item)}>
                                  Edit
                                </Link>
                                <Link onClick={() => deleteUserModal(item)}>
                                  Delete
                                </Link>
                              </td>
                            )}
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center" }}>
                        Not Data
                      </td>
                    </tr>
                  )}
                </MDBTableBody>
                <MDBTableBody>
                  {records && records.length > 0 ? (
                    records
                      .filter((e) => e.email !== authUser.email)
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ textTransform: "uppercase" }}>
                              U{item._id.slice(-2)}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{atob(item.password)}</td>
                            <td className="text-center">
                              <Link
                                className={
                                  item.status === "Active" ? "btn-approve" : ""
                                }
                              >
                                {item.status}
                              </Link>{" "}
                            </td>
                            <td className="text-center">
                              <Link onClick={() => openUserRights(item)}>
                                {item.status === "Pending"
                                  ? "Setting"
                                  : "Update Rights"}
                              </Link>
                            </td>
                            <td className="text-center">
                              <Link onClick={() => editUserModal(item)}>
                                Edit
                              </Link>
                              <Link onClick={() => deleteUserModal(item)}>
                                Delete
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center" }}>
                        Not Data
                      </td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
              {records.length > 0 && (
                <Pagination
                  prePage={prePage}
                  numbers={numbers}
                  currentPage={currentPage}
                  changeCpage={changeCpage}
                  npage={npage}
                  nextPage={nextPage}
                />
              )}
            </div>
          </>
        )}
      </MDBContainer>

      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />

      <EditModal
        _id={_id}
        updateName={updateName}
        setUpdateName={setUpdateName}
        updateEmail={updateEmail}
        updateRole={updateRole}
        setUpdateRole={setUpdateRole}
        updatePassword={updatePassword}
        setUpdatePassword={setUpdatePassword}
        editModal={editModal}
        setEditModal={setEditModal}
        updateUserRights={updateUserRights}
      />
      <DeleteModal
        _id={_id}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </>
  );
};

export default Users;
