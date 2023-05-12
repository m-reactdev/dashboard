import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { salesData } from "../components/data/JsonData";
import CreateModal from "../components/modals/users/CreateModal";
import DeleteModal from "../components/modals/users/DeleteModal";
import EditModal from "../components/modals/users/EditModal";
import Pagination from "../components/Pagination";
import { fetchUsers } from "../store/actions/all-actions/AuthAction";

const Users = () => {
  let dispatch = useDispatch();
  let allUsers = useSelector(({ AuthState }) => {
    return AuthState.allUser;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  const [updateName, setUpdateName] = useState("");
  const [_id, set_id] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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

  const editUserModal = (item) => {
    let password = atob(item.password);
    setEditModal(!editModal);
    set_id(item._id);
    setUpdateName(item.name);
    setUpdateEmail(item.email);
    setUpdateRole(item.role);
    setUpdatePassword(password);
  };

  const deleteUserModal = (item) => {
    setDeleteModal(!deleteModal);
    set_id(item._id);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <MDBContainer>
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
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {records && records.length > 0 ? (
                records
                  .filter((e) => e.email === authUser.email)
                  .map((item, index) => {
                    return (
                      <tr key={index} className="activeTR">
                        <td style={{ textTransform: "uppercase" }}>
                          U{item._id.slice(-2)}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>{atob(item.password)}</td>
                        <td>
                          <Link>Active User</Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Not Data
                  </td>
                </tr>
              )}
            </MDBTableBody>
            <MDBTableBody>
              {records && records.length > 0 ? (
                records
                  .sort(function (a, b) {
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (a.name > b.name) {
                      return 1;
                    }
                    return 0;
                  })
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
                        <td>
                          <Link onClick={() => editUserModal(item)}>Edit</Link>
                          <Link onClick={() => deleteUserModal(item)}>
                            Delete
                          </Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
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
      </MDBContainer>

      <EditModal
        _id={_id}
        updateName={updateName}
        setUpdateName={setUpdateName}
        updateEmail={updateEmail}
        setUpdateEmail={setUpdateEmail}
        updateRole={updateRole}
        setUpdateRole={setUpdateRole}
        updatePassword={updatePassword}
        setUpdatePassword={setUpdatePassword}
        editModal={editModal}
        setEditModal={setEditModal}
      />

      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />

      <DeleteModal
        _id={_id}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </>
  );
};

export default Users;
