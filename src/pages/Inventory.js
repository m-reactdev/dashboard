import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MonthYearPicker } from "../components/datepicker/DateMonthYearPicker";
import CreateModal from "../components/modals/inventory/CreateModal";
import DeleteModal from "../components/modals/inventory/DeleteModal";
import EditModal from "../components/modals/inventory/EditModal";
import Pagination from "../components/Pagination";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../store/actions/all-actions/InventoryAction";
import PDF from "../assets/imgs/pdf.png";
import { Tooltip } from "react-tooltip";
import ApprovalModal from "../components/modals/inventory/ApprovalModal";
import RejectModal from "../components/modals/inventory/RejectModal";

const Inventory = () => {
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let allInventoryData = useSelector(({ InventoryState }) => {
    return InventoryState.allInventories;
  });
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateDate, setUpdateDate] = useState(null);
  const [updatePdfFile, setUpdatePdfFile] = useState("");
  const [updatedFileName, setupdatedFileName] = useState("");
  const [invItem, setInvItem] = useState(null);
  const [inventoryData, setInventoryData] = useState({
    _id: "",
    amount: 0,
    description: "",
    status: "Pending",
    rejectedDescription: "",
    email: authUser.email,
    name: authUser.name,
    timeStamp: "",
    fileName: "",
  });

  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allInventoryData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allInventoryData.length / recordsPerPage);
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const editInventoryModal = (item) => {
    const str = item.monthYear;
    const date = new Date(str);
    setEditModal(!editModal);
    setUpdateDate(date);
    setUpdatePdfFile(item.pdfFile);
    setupdatedFileName(item.fileName);

    setInventoryData({
      _id: item._id,
      name: item.name,
      email: item.email,
      status: item.status,
      description: item.description,
      amount: item.amount,
      rejectedDescription: item.rejectedDescription,
      timeStamp: item.timeStamp,
    });
  };

  const viewItemHandler = (item) => {
    setApprovalModal(!approvalModal);

    const str = item.monthYear;
    const date = new Date(str);
    setUpdateDate(date);
    setUpdatePdfFile(item.pdfFile);
    setupdatedFileName(item.fileName);

    setInventoryData({
      _id: item._id,
      name: item.name,
      email: item.email,
      description: item.description,
      amount: item.amount,
      status: item.status,
      rejectedDescription: item.rejectedDescription,
      timeStamp: item.timeStamp,
    });
  };

  const viewRejectionReason = (item) => {
    if (item.status === "Rejected") {
      setRejectModal(true);
      setInvItem(item);
    } else {
      setRejectModal(false);
    }
  };

  const deleteItem = (item) => {
    setDeleteModal(!deleteModal);
    setInvItem(item);
  };

  useEffect(() => {
    dispatch(fetchInventory());
  }, []);

  return (
    <>
      <MDBContainer>
        <div className="create-new">
          {/* <div className="dateBtn">
            <button className="btn btn-primary" onClick={handleClick}>
              {name}, {startDate.getFullYear()}
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </button>

            {isOpen && (
              <MonthYearPicker
                handleChange={handleChange}
                startDate={startDate}
              />
            )}
          </div> */}
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
                {authUser && authUser.role === "Admin" && <th>Name</th>}
                {authUser && authUser.role === "Admin" && <th>TimeStamp</th>}
                <th>Month</th>
                <th>Description</th>
                <th>Amount($)</th>
                <th>Status</th>
                <th>Actions</th>
                <th>File</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {records && records.length > 0 ? (
                records
                  .sort()
                  .reverse()
                  .map((item, index) => {
                    const str = item.monthYear;
                    const date = new Date(str);
                    let month = months[date.getMonth()];
                    let year = date.getFullYear();

                    return (
                      <tr key={index}>
                        <td style={{ textTransform: "uppercase" }}>
                          <Link onClick={() => viewItemHandler(item)}>
                            IN{item._id.slice(-2)}
                          </Link>
                        </td>
                        {authUser && authUser.role === "Admin" && (
                          <td>{item.name}</td>
                        )}
                        {authUser && authUser.role === "Admin" && (
                          <td>{item.timeStamp}</td>
                        )}

                        <td>
                          {month}, {year}
                        </td>
                        <td className="desctd" id={item._id}>
                          {item.description}
                        </td>
                        <td>{item.amount}</td>
                        <td>
                          <Link
                            onClick={() => viewRejectionReason(item)}
                            className={
                              item.status === "Pending"
                                ? "btn-pending"
                                : item.status === "Rejected"
                                ? "btn-reject"
                                : "btn-approve"
                            }
                          >
                            {item.status}
                          </Link>
                        </td>
                        {item.status === "Approved" ? (
                          <td className="text-center">-</td>
                        ) : (
                          <td>
                            <Link onClick={() => editInventoryModal(item)}>
                              Edit
                            </Link>
                            <Link onClick={() => deleteItem(item)}>Delete</Link>
                          </td>
                        )}
                        <td>
                          <Link to={item.pdfFile} target="_blank" download>
                            <img src={PDF} alt="" className="pdf_icon" />
                          </Link>
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
        updateDate={updateDate}
        setUpdateDate={setUpdateDate}
        updatePdfFile={updatePdfFile}
        setUpdatePdfFile={setUpdatePdfFile}
        updatedFileName={updatedFileName}
        setupdatedFileName={setupdatedFileName}
        inventoryData={inventoryData}
        setInventoryData={setInventoryData}
        editModal={editModal}
        setEditModal={setEditModal}
      />

      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />

      <DeleteModal
        invItem={invItem}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <RejectModal
        invItem={invItem}
        rejectModal={rejectModal}
        setRejectModal={setRejectModal}
      />

      <ApprovalModal
        updatedFileName={updatedFileName}
        updateDate={updateDate}
        updatePdfFile={updatePdfFile}
        inventoryData={inventoryData}
        setInventoryData={setInventoryData}
        approvalModal={approvalModal}
        setApprovalModal={setApprovalModal}
      />
    </>
  );
};

export default Inventory;
