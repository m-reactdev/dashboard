import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { salesData } from "../components/data/JsonData";
import { MonthYearPicker } from "../components/datepicker/DateMonthYearPicker";
import CreateModal from "../components/modals/vendor/CreateModal";
import DeleteModal from "../components/modals/vendor/DeleteModal";
import EditModal from "../components/modals/vendor/EditModal";
import Pagination from "../components/Pagination";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Vendors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = salesData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(salesData.length / recordsPerPage);
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

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
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

  let name = months[startDate.getMonth()];

  return (
    <>
      <MDBContainer>
        <div className="create-new">
          <div className="dateBtn">
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
          </div>

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
                <th>Payment Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {records.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.ID}</td>
                    <td>{item.Date}</td>
                    <td>{item.Sales}</td>
                    <td>{item.Sales}</td>
                    <td>{item.Description}</td>
                    <td>
                      <Link onClick={() => setEditModal(!editModal)}>Edit</Link>
                      <Link onClick={() => setDeleteModal(!deleteModal)}>
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
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

      <EditModal editModal={editModal} setEditModal={setEditModal} />

      <CreateModal createModal={createModal} setCreateModal={setCreateModal} />

      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
    </>
  );
};

export default Vendors;
