import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import DatePickerButton from "../../components/datepicker/DatePickerButton";
import { fetchSales } from "../../store/actions/all-actions/SalesAction";
import ViewModal from "./ViewModal";
import { fetchMarketing } from "../../store/actions/all-actions/MarketingAction";
import { fetchCompliance } from "../../store/actions/all-actions/ComplianceAction";

const MasterData = () => {
  // Get auth user and all vendors & dispatch
  let dispatch = useDispatch();
  let salesData = useSelector(({ SalesState }) => {
    return SalesState.salesData;
  });
  let complianceData = useSelector(({ ComplianceState }) => {
    return ComplianceState.allCompliance;
  });
  let marketingData = useSelector(({ MarketingState }) => {
    return MarketingState.marketingData;
  });
  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  // console.log(salesData)

  // Modal States
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewModal, setViewModal] = useState(false);
  const [dataArray, setDataArray] = useState([]);

  // Update Sale States
  const [invItem, setInvItem] = useState(null);

  // Pagination States and Functions
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataArray.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataArray.length / recordsPerPage);
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

  // View Sale Function
  const viewItem = (item) => {
    setViewModal(!viewModal);
    setInvItem(item);
  };

  const fetchData = () => {
    let salesArray = [];
    let marketingArray = [];
    let complianceArray = [];
    const salesCurrentMonth = salesData?.filter((e) => {
      if (new Date(e.date).getMonth() === currentMonth.getMonth()) {
        return e;
      }
    });

    if (salesCurrentMonth.length > 0) {
      salesArray = salesCurrentMonth.map((item) => {
        return {
          _id: item._id,
          code: item.code,
          date: item.date,
          name: item.name,
          timeStamp: item.timeStamp,
          description: item.description,
          sales: item.amount,
          status: item.status,
        };
      });
    }

    const marketingCurrentMonth = marketingData?.filter((e) => {
      if (new Date(e.date).getMonth() === currentMonth.getMonth()) {
        return e;
      }
    });

    if (marketingCurrentMonth.length > 0) {
      marketingArray = marketingCurrentMonth.map((item) => {
        return {
          _id: item._id,
          code: item.code,
          date: item.date,
          name: item.name,
          timeStamp: item.timeStamp,
          description: item.description,
          marketing: item.amount,
        };
      });
    }

    const complianceCurrentMonth = complianceData?.filter((e) => {
      if (new Date(e.date).getMonth() === currentMonth.getMonth()) {
        return e;
      }
    });

    if (complianceCurrentMonth.length > 0) {
      complianceArray = complianceCurrentMonth.map((item) => {
        return {
          _id: item._id,
          code: item.code,
          date: item.date,
          name: item.name,
          timeStamp: item.timeStamp,
          description: item.description,
          unit: item.unit,
          compliance: item.amount,
        };
      });
    }

    // console.log(complianceArray);

    let merge1 = salesArray.concat(marketingArray);

    let merge2 = merge1.concat(complianceArray);

    var obj = {};
    for (var i = 0; i < merge2.length; i++) {
      var date = new Date(merge2[i].date);
      date = `${date.getFullYear()}-${date.toLocaleString("en-US", {
        month: "2-digit",
      })}-${date.getDate()}`;
      var p_date = obj[date] || {
        _id: "",
        date: "",
        name: "",
        timeStamp: "",
        description: "",
        unit: "-",
        sales: 0,
        marketing: 0,
        compliance: 0,
        status: "-",
      };
      obj[date] = Object.assign(p_date, merge2[i]);
    }

    var getMergeArray = Object.values(obj);

    if (getMergeArray.length > 0) {
      setDataArray(getMergeArray);
    }
  };

  // Fetch Sales Function
  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchMarketing());
    dispatch(fetchCompliance());
    // fetchData();
  }, [currentMonth]);

  return (
    <>
      <MDBContainer>
        <div className="create-new">
          <DatePickerButton
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
        <div className="dataTables">
          <MDBTable striped responsive hover small bordered>
            <MDBTableHead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>TimeStamp</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Sales($)</th>
                <th>Marketing($)</th>
                <th>Compliance($)</th>
                <th>Status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {records && records.length > 0 ? (
                records.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textTransform: "uppercase" }}>
                        <Link onClick={() => viewItem(item)}>
                          {item.code}
                          {item._id.slice(-2)}
                        </Link>
                      </td>
                      <td>{item.date}</td>
                      <td>{item.name}</td>
                      <td>{item.timeStamp}</td>
                      <td className="desctd" id={item._id}>
                        {item.description}
                      </td>
                      <td>{item.unit}</td>
                      <td>{item.sales}</td>
                      <td>{item.marketing}</td>
                      <td>{item.compliance}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={12} style={{ textAlign: "center" }}>
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

      <ViewModal
        invItem={invItem}
        viewModal={viewModal}
        setViewModal={setViewModal}
      />
    </>
  );
};

export default MasterData;
