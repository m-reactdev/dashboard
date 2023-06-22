import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateModal from "./modals/CreateModal";
import DeleteModal from "./modals/DeleteModal";
import EditModal from "./modals/EditModal";
import Pagination from "../../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import PDF from "../../../assets/imgs/pdf.png";
import JPG from "../../../assets/imgs/jpg.png";
import PNG from "../../../assets/imgs/png.png";
import ApprovalModal from "./modals/ApprovalModal";
import RejectModal from "./modals/RejectModal";
import DatePickerButton from "../../../components/datepicker/DatePickerButton";
import { fetchBudget } from "../../../store/actions/all-actions/finance-actions/BudgetAction";

const Budget = () => {
  // Get auth user and all inventories & dispatch
  let dispatch = useDispatch();
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let budgetData = useSelector(({ FinanceState }) => {
    return FinanceState.budgetData;
  });

  // Modal States
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  // Update States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(null);
  const [updatePdfFile, setUpdatePdfFile] = useState("");
  const [updatedFileName, setupdatedFileName] = useState("");
  const [updateAmount, setUpdateAmount] = useState();
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateRejectedDescription, setUpdateRejectedDescription] =
    useState("");
  const [invItem, setInvItem] = useState(null);

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = budgetData
    .filter((e) => new Date(e.date).getMonth() === currentMonth.getMonth())
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(budgetData.length / recordsPerPage);
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

  // Edit Function
  const updateHandler = (item) => {
    setEditModal(!editModal);
    const str = item.date;
    const date = new Date(str);
    setUpdateDate(date);
    setUpdatePdfFile(item.pdfFile);
    setupdatedFileName(item.fileName);
    setUpdateAmount(item.amount);
    setUpdateDescription(item.description);
    setInvItem(item);
  };

  // Approval Function
  const approvalHandler = (item) => {
    setApprovalModal(!approvalModal);
    setUpdatePdfFile(item.pdfFile);
    setupdatedFileName(item.fileName);
    setInvItem(item);
    setUpdateRejectedDescription(item.rejectedDescription);
  };

  // View Rejection Function
  const viewRejectionReason = (item) => {
    if (item.status === "Rejected") {
      setRejectModal(true);
      setInvItem(item);
    } else {
      setRejectModal(false);
    }
  };

  // Delete Function
  const deleteItem = (item) => {
    setDeleteModal(!deleteModal);
    setInvItem(item);
  };

  // Fetch Function
  useEffect(() => {
    dispatch(fetchBudget());
  }, []);

  return (
    <>
      <MDBContainer>
        <div className="create-new">
          <h4>Budget</h4>
          <DatePickerButton
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
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
                <th>Date</th>
                {authUser && authUser.access === true && (
                  <>
                    <th>Name</th>
                    <th>TimeStamp</th>
                  </>
                )}
                <th>Description</th>
                <th>Amount</th>
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
                    return (
                      <tr key={index}>
                        <td style={{ textTransform: "uppercase" }}>
                          <Link onClick={() => approvalHandler(item)}>
                            {item.code}
                            {item._id.slice(-2)}
                          </Link>
                        </td>
                        <td>{item.date}</td>
                        {authUser && authUser.access === true && (
                          <>
                            <td>{item.name}</td>
                            <td>{item.timeStamp}</td>
                          </>
                        )}
                        <td className="desctd" id={item._id}>
                          {item.description}
                        </td>
                        <td>{item.amount.toLocaleString("en-US")}</td>
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
                        {authUser && authUser.access === true ? (
                          <td>
                            <Link onClick={() => updateHandler(item)}>
                              Edit
                            </Link>
                            <Link onClick={() => deleteItem(item)}>Delete</Link>
                          </td>
                        ) : item.status === "Approved" ? (
                          <td className="text-center">-</td>
                        ) : (
                          <td>
                            <Link onClick={() => updateHandler(item)}>
                              Edit
                            </Link>
                            <Link onClick={() => deleteItem(item)}>Delete</Link>
                          </td>
                        )}
                        <td>
                          <Link to={item.pdfFile} target="_blank" download>
                            {item.fileName.split(".").pop() === "pdf" ? (
                              <img
                                src={PDF && PDF}
                                alt=""
                                className="pdf_icon"
                              />
                            ) : item.fileName.split(".").pop() === "png" ? (
                              <img
                                src={PNG && PNG}
                                alt=""
                                className="pdf_icon"
                              />
                            ) : item.fileName.split(".").pop() === "jpg" ? (
                              <img
                                src={JPG && JPG}
                                alt=""
                                className="pdf_icon"
                              />
                            ) : null}
                          </Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={15} style={{ textAlign: "center" }}>
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
        updateAmount={updateAmount}
        setUpdateAmount={setUpdateAmount}
        updateDescription={updateDescription}
        setUpdateDescription={setUpdateDescription}
        invItem={invItem}
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
        invItem={invItem}
        updateRejectedDescription={updateRejectedDescription}
        setUpdateRejectedDescription={setUpdateRejectedDescription}
        approvalModal={approvalModal}
        setApprovalModal={setApprovalModal}
      />
    </>
  );
};

export default Budget;
