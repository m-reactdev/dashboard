import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateModal from "./vendor-modals/CreateModal";
import DeleteModal from "./vendor-modals/DeleteModal";
import EditModal from "./vendor-modals/EditModal";
import ViewModal from "./vendor-modals/ViewModal";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../store/actions/all-actions/VendorAction";
import DatePickerButton from "../../components/datepicker/DatePickerButton";
import PDF from "../../assets/imgs/pdf.png";

const Vendors = () => {
  // Get auth user and all vendors & dispatch
  let dispatch = useDispatch();
  let allVendors = useSelector(({ VendorState }) => {
    return VendorState.allVendors;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // Modal States
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  // Update vendor States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(null);
  const [invItem, setInvItem] = useState(null);
  const [updatePdfFile, setUpdatePdfFile] = useState("");
  const [updatedFileName, setupdatedFileName] = useState("");
  const [unitUpdate, setUnitUpdate] = useState(null);
  const [vendorUpdate, setVendorUpdate] = useState({
    amount: 0,
    description: "",
    unit: "",
  });

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allVendors
    .filter((e) => new Date(e.date).getMonth() === currentMonth.getMonth())
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(allVendors.length / recordsPerPage);
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

  // View Vendor Function
  const viewVendorItem = (item) => {
    setViewModal(!viewModal);
    setInvItem(item);
  };

  // Edit Vendor Function
  const editVendorModal = (item) => {
    setEditModal(!editModal);
    const str = item.date;
    const date = new Date(str);
    setUpdateDate(date);
    setVendorUpdate({
      description: item.description,
      amount: item.amount,
    });
    setUnitUpdate({ value: item.unit, label: item.unit });
    setInvItem(item);
    setUpdatePdfFile(item.pdfFile);
    setupdatedFileName(item.fileName);
  };

  // Delete Vendor Function
  const deleteItem = (item) => {
    setDeleteModal(!deleteModal);
    setInvItem(item);
  };

  // Fetch Vendors Function
  useEffect(() => {
    dispatch(fetchVendors());
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
                {authUser.userRights.indexOf("Super Admin") > -1 ||
                authUser.userRights.indexOf("Admin") > -1 ||
                authUser.userRights.indexOf("Developer") > -1 ? (
                  <>
                    <th>Name</th>
                    <th>TimeStamp</th>
                  </>
                ) : null}
                <th>Date</th>
                <th>Unit</th>
                <th>Description</th>
                <th>Amount($)</th>
                <th>Actions</th>
                <th>Files</th>
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
                          <Link onClick={() => viewVendorItem(item)}>
                            {item.code}
                            {item._id.slice(-2)}
                          </Link>
                        </td>
                        {authUser.userRights.indexOf("Super Admin") > -1 ||
                        authUser.userRights.indexOf("Admin") > -1 ||
                        authUser.userRights.indexOf("Developer") > -1 ? (
                          <>
                            <td>{item.name}</td>
                            <td>{item.timeStamp}</td>
                          </>
                        ) : null}
                        <td>{item.date}</td>
                        <td>{item.unit}</td>
                        <td className="desctd" id={item._id}>
                          {item.description}
                        </td>
                        <td>{item.amount}</td>
                        <td>
                          <Link onClick={() => editVendorModal(item)}>
                            Edit
                          </Link>
                          <Link onClick={() => deleteItem(item)}>Delete</Link>
                        </td>
                        <td>
                          <Link to={item.pdfFile} target="_blank" download>
                            <img src={PDF && PDF} alt="" className="pdf_icon" />
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
        invItem={invItem}
        updatePdfFile={updatePdfFile}
        setUpdatePdfFile={setUpdatePdfFile}
        updatedFileName={updatedFileName}
        setupdatedFileName={setupdatedFileName}
        updateDate={updateDate}
        setUpdateDate={setUpdateDate}
        vendorUpdate={vendorUpdate}
        setVendorUpdate={setVendorUpdate}
        setUnitUpdate={setUnitUpdate}
        unitUpdate={unitUpdate}
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

export default Vendors;
