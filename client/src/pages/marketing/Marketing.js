import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateModal from "./data-modals/CreateModal";
import DeleteModal from "./data-modals/DeleteModal";
import EditModal from "./data-modals/EditModal";
import ViewModal from "./data-modals/ViewModal";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import DatePickerButton from "../../components/datepicker/DatePickerButton";
import { fetchMarketing } from "../../store/actions/all-actions/MarketingAction";

const Marketing = () => {
  // Get auth user and all vendors & dispatch
  let dispatch = useDispatch();
  let marketingData = useSelector(({ MarketingState }) => {
    return MarketingState.marketingData;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Modal States
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  // Update Sale States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(null);
  const [invItem, setInvItem] = useState(null);
  const [updateData, setUpdateData] = useState({
    amount: 0,
    description: "",
  });

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  let filterData = marketingData.filter(
    (e) => new Date(e.date).getMonth() === currentMonth.getMonth()
  );
  const records = filterData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filterData.length / recordsPerPage);
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

  // View Marketing Function
  const viewMarketingItem = (item) => {
    setViewModal(!viewModal);
    setInvItem(item);
  };

  // Edit Marketing Function
  const editMarketingModal = (item) => {
    setEditModal(!editModal);
    const str = item.date;
    const date = new Date(str);
    setUpdateDate(date);
    setUpdateData({
      description: item.description,
      amount: item.amount,
    });
    setInvItem(item);
  };

  // Delete Marketing Function
  const deleteItem = (item) => {
    setDeleteModal(!deleteModal);
    setInvItem(item);
  };

  // Fetch Marketing Function
  useEffect(() => {
    dispatch(fetchMarketing());
  }, []);
  return (
    <>
      <MDBContainer>
        <div className="create-new">
          <DatePickerButton
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          <div>
            {" "}
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
                <th>Date</th>
                {authUser.userRights.indexOf("Super Admin") > -1 ||
                authUser.userRights.indexOf("Developer") > -1 ? (
                  <>
                    <th>Name</th>
                    <th>TimeStamp</th>
                  </>
                ) : null}
                <th>Description</th>
                <th>Marketing ($)</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {records && records.length > 0 ? (
                records
                  .sort()
                  .reverse()
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textTransform: "uppercase" }}>
                          <Link onClick={() => viewMarketingItem(item)}>
                            {item.code}
                            {item._id.slice(-2)}
                          </Link>
                        </td>
                        <td>{item.date}</td>
                        {authUser.userRights.indexOf("Super Admin") > -1 ||
                        authUser.userRights.indexOf("Admin") > -1 ||
                        authUser.userRights.indexOf("Developer") > -1 ? (
                          <>
                            <td>{item.name}</td>
                            <td>{item.timeStamp}</td>
                          </>
                        ) : null}
                        <td className="desctd">{item.description}</td>
                        <td>{item.amount}</td>
                        <td>
                          <Link onClick={() => editMarketingModal(item)}>
                            Edit
                          </Link>
                          <Link onClick={() => deleteItem(item)}>Delete</Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center" }}>
                    Not Data
                  </td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
          <Pagination
            prePage={prePage}
            numbers={numbers}
            currentPage={currentPage}
            changeCpage={changeCpage}
            npage={npage}
            nextPage={nextPage}
          />
        </div>
      </MDBContainer>

      <EditModal
        invItem={invItem}
        updateDate={updateDate}
        setUpdateDate={setUpdateDate}
        updateData={updateData}
        setUpdateData={setUpdateData}
        editModal={editModal}
        setEditModal={setEditModal}
      />

      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />

      <DeleteModal
        invItem={invItem}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <ViewModal
        invItem={invItem}
        viewModal={viewModal}
        setViewModal={setViewModal}
      />
    </>
  );
};

export default Marketing;
