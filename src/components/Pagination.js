import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

function Pagination({
  prePage,
  numbers,
  currentPage,
  changeCpage,
  npage,
  nextPage,
}) {
  return (
    <>
      <MDBPagination className="mb-0 justify-content-end">
        <MDBPaginationItem disabled={currentPage === 1 && true}>
          <MDBPaginationLink onClick={prePage}>Previous</MDBPaginationLink>
        </MDBPaginationItem>

        {numbers.map((n, i) => {
          return (
            <MDBPaginationItem
              key={i}
              className={`page-item ${currentPage === n ? "active" : ""}`}
            >
              <MDBPaginationLink onClick={() => changeCpage(n)}>
                {n}
              </MDBPaginationLink>
            </MDBPaginationItem>
          );
        })}

        <MDBPaginationItem disabled={currentPage === npage && true}>
          <MDBPaginationLink onClick={nextPage}>Next</MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </>
  );
}

export default Pagination;
