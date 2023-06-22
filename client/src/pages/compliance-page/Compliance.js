import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateModal from "./compliance-modals/CreateModal";
import DeleteModal from "./compliance-modals/DeleteModal";
import EditModal from "./compliance-modals/EditModal";
import ViewModal from "./compliance-modals/ViewModal";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import DatePickerButton from "../../components/datepicker/DatePickerButton";
import { fetchCompliance } from "../../store/actions/all-actions/ComplianceAction";

const Compliance = () => {
  // Get auth user and all vendors & dispatch
  let dispatch = useDispatch();
  let complianceData = useSelector(({ ComplianceState }) => {
    return ComplianceState.allCompliance;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Modal States
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  // Update compliance States
  const [currentArray, setCurrentArray] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(null);
  const [invItem, setInvItem] = useState(null);
  const [typeUpdate, setTypeUpdate] = useState(null);
  const [complianceUpdate, setComplianceUpdate] = useState({
    amount: 0,
    description: "",
  });

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = complianceData
    .filter((e) => new Date(e.date).getMonth() === currentMonth.getMonth())
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(complianceData.length / recordsPerPage);
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

  // View Compliance Function
  const viewComplianceItem = (item) => {
    setViewModal(!viewModal);
    setInvItem(item);
  };

  // Edit Compliance Function
  const editComplianceModal = (item) => {
    setEditModal(!editModal);
    const str = item.date;
    const date = new Date(str);
    setUpdateDate(date);
    setComplianceUpdate({
      description: item.description,
      amount: item.amount,
    });
    setTypeUpdate({ value: item.type, label: item.type });
    setInvItem(item);
  };

  // Delete Compliance Function
  const deleteItem = (item) => {
    setDeleteModal(!deleteModal);
    setInvItem(item);
  };

  // Fetch Vendors Function
  useEffect(() => {
    dispatch(fetchCompliance());

    // if (records.length > 0) {
    //   let chargeback = records
    //     .filter((e) => e.type === "Chargeback")
    //     .map((item) => {
    //       return {
    //         _id: item._id,
    //         code: item.code,
    //         date: item.date,
    //         name: item.name,
    //         email: item.email,
    //         timeStamp: item.timeStamp,
    //         description: item.description,
    //         type: item.type,
    //         chargeback: item.amount,
    //       };
    //     });

    //   let refund = records
    //     .filter((e) => e.type === "Refund")
    //     .map((item) => {
    //       return {
    //         _id: item._id,
    //         code: item.code,
    //         date: item.date,
    //         name: item.name,
    //         email: item.email,
    //         timeStamp: item.timeStamp,
    //         description: item.description,
    //         type: item.type,
    //         refund: item.amount,
    //       };
    //     });

    //   let caseWin = records
    //     .filter((e) => e.type === "CaseWin")
    //     .map((item) => {
    //       return {
    //         _id: item._id,
    //         code: item.code,
    //         date: item.date,
    //         name: item.name,
    //         email: item.email,
    //         timeStamp: item.timeStamp,
    //         description: item.description,
    //         type: item.type,
    //         caseWin: item.amount,
    //       };
    //     });

    //   let caseLoss = records
    //     .filter((e) => e.type === "CaseLoss")
    //     .map((item) => {
    //       return {
    //         _id: item._id,
    //         code: item.code,
    //         date: item.date,
    //         name: item.name,
    //         email: item.email,
    //         timeStamp: item.timeStamp,
    //         description: item.description,
    //         type: item.type,
    //         caseLoss: item.amount,
    //       };
    //     });

    //   let results = [...chargeback, ...refund, ...caseWin, ...caseLoss];

    //   var obj = {};
    //   for (var i = 0; i < results.length; i++) {
    //     var date = new Date(results[i].date);
    //     date = `${date.toLocaleString("en-US", {
    //       month: "numeric",
    //     })}/${date.getDate()}/${date.getFullYear()}`;

    //     var p_date = obj[date] || {
    //       date: "",
    //       chargeback: 0,
    //       refund: 0,
    //       caseWin: 0,
    //       caseLoss: 0,
    //       _id: "",
    //       code: "",
    //       date: "",
    //       name: "",
    //       email: "",
    //       timeStamp: "",
    //       description: "",
    //       type: "",
    //     };
    //     obj[date] = Object.assign(p_date, results[i]);
    //   }

    //   var getMergeArray = Object.values(obj);
    //   console.log(getMergeArray);
    //   setCurrentArray(getMergeArray);
    // }
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
                authUser.userRights.indexOf("Admin") > -1 ||
                authUser.userRights.indexOf("Developer") > -1 ? (
                  <>
                    <th>Name</th>
                    <th>TimeStamp</th>
                  </>
                ) : null}
                <th>Description</th>
                <th>Type</th>
                <th>Amount($)</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {records && records.length > 0 ? (
                records
                  .sort((a, b) => b.date - a.date)
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textTransform: "uppercase" }}>
                          <Link onClick={() => viewComplianceItem(item)}>
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
                        <td className="desctd" id={item._id}>
                          {item.description}
                        </td>
                        <td>{item.type}</td>
                        <td>{item.amount}</td>
                        <td>
                          <Link onClick={() => editComplianceModal(item)}>
                            Edit
                          </Link>
                          <Link onClick={() => deleteItem(item)}>Delete</Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={20} style={{ textAlign: "center" }}>
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
        complianceUpdate={complianceUpdate}
        setComplianceUpdate={setComplianceUpdate}
        setTypeUpdate={setTypeUpdate}
        typeUpdate={typeUpdate}
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

export default Compliance;
