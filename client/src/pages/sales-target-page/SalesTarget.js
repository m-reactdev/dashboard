import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateModal from "./sales-target-modals/CreateModal";
import DeleteModal from "./sales-target-modals/DeleteModal";
import EditModal from "./sales-target-modals/EditModal";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import DatePickerButton from "../../components/datepicker/DatePickerButton";
import { fetchSalesTarget } from "../../store/actions/all-actions/SalesTargetAction";
import ViewModal from "./sales-target-modals/ViewModal";

const SalesTarget = () => {
  // Get auth user and sales target & dispatch
  let dispatch = useDispatch();
  let salesTarget = useSelector(({ SalesTargetState }) => {
    return SalesTargetState.salesTargetData;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Modal States
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  // Update Sales Target States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(null);
  const [invItem, setInvItem] = useState(null);
  const [unitUpdate, setUnitUpdate] = useState(null);
  const [salesTargetUpdate, setSalesTargetUpdate] = useState({
    target: 0,
    limit: 0,
    description: "",
  });

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = salesTarget
    .filter((e) => new Date(e.date).getMonth() === currentMonth.getMonth())
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(salesTarget.length / recordsPerPage);
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

  // View Sales Target Function
  const viewSalesTargetItem = (item) => {
    setViewModal(!viewModal);
    setInvItem(item);
  };

  // Edit Sales Target Function
  const editSalesTargetModal = (item) => {
    setEditModal(!editModal);
    const str = item.date;
    const date = new Date(str);
    setUpdateDate(date);
    setSalesTargetUpdate({
      description: item.description,
      target: item.target,
      limit: item.limit,
    });
    // setUnitUpdate({ value: item.unit, label: item.unit });
    setInvItem(item);
  };

  // Delete Sales Target Function
  const deleteItem = (item) => {
    setDeleteModal(!deleteModal);
    setInvItem(item);
  };

  // Fetch Sales Target Function
  useEffect(() => {
    dispatch(fetchSalesTarget());
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
                <th>Name</th>
                <th>TimeStamp</th>
                <th>Date</th>
                {/* <th>Unit</th> */}
                <th>Description</th>
                <th>Sales Target($)</th>
                <th>Spending Limit($)</th>
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
                          <Link onClick={() => viewSalesTargetItem(item)}>
                            {item.code}
                            {item._id.slice(-2)}
                          </Link>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.timeStamp}</td>
                        <td>{item.date}</td>
                        {/* <td>{item.unit}</td> */}
                        <td className="desctd">{item.description}</td>
                        <td>{item.target}</td>
                        <td>{item.limit}</td>
                        <td>
                          <Link onClick={() => editSalesTargetModal(item)}>
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
        salesTargetUpdate={salesTargetUpdate}
        setSalesTargetUpdate={setSalesTargetUpdate}
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

export default SalesTarget;
