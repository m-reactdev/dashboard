import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import PDF from "../../assets/imgs/pdf.png";
import JPG from "../../assets/imgs/jpg.png";
import PNG from "../../assets/imgs/png.png";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

const TableData = (props) => {
  let {
    approvalHandler,
    viewRejectionReason,
    updateHandler,
    deleteItem,
    currentMonth,
    paidHandler,
    stats,
  } = props;
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  let expData = useSelector(({ FinanceState }) => {
    return FinanceState.expData;
  });

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = expData
    ?.filter((e) => new Date(e.date).getMonth() === currentMonth.getMonth())
    ?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(expData?.length / recordsPerPage);
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

  return (
    <>
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
              <th>Account Type</th>
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
                .filter((e) => {
                  if (e.status === stats) return e;
                  else if ("All" === stats) return e;
                })
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
                      <td>{item.type}</td>
                      <td className="desctd" id={item._id}>
                        {item.description}
                      </td>
                      <td>{item.amount.toLocaleString("en-US")}</td>
                      <td>
                        <Link
                          onClick={() => viewRejectionReason(item)}
                          className={
                            item.status === "Approved"
                              ? "btn-approve"
                              : item.status === "Rejected"
                              ? "btn-reject"
                              : item.status === "Billed"
                              ? "btn-billed"
                              : "btn-pending"
                          }
                        >
                          {item.status}
                        </Link>
                      </td>
                      {authUser && authUser.access === true ? (
                        <td>
                          <Link onClick={() => updateHandler(item)}>Edit</Link>
                          <Link onClick={() => deleteItem(item)}>Delete</Link>
                        </td>
                      ) : item.status === "Approved" ? (
                        <td>
                          <Link onClick={() => paidHandler(item)}>Paid</Link>
                        </td>
                      ) : (
                        <td>
                          <Link onClick={() => updateHandler(item)}>Edit</Link>
                          <Link onClick={() => deleteItem(item)}>Delete</Link>
                        </td>
                      )}
                      <td>
                        {item.type === "Cash" ? (
                          "-"
                        ) : (
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
                        )}
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
    </>
  );
};

export default TableData;
