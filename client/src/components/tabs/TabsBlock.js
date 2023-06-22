import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import TableData from "./TableData";

const TabsBlock = (props) => {
  let {
    approvalHandler,
    viewRejectionReason,
    updateHandler,
    deleteItem,
    currentMonth,
    paidHandler,
  } = props;

  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            All
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Draft
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            Awaiting Approval
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab4")}
            active={basicActive === "tab4"}
          >
            Approved
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab5")}
            active={basicActive === "tab5"}
          >
            Billed
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          <TableData
            currentMonth={currentMonth}
            approvalHandler={approvalHandler}
            viewRejectionReason={viewRejectionReason}
            updateHandler={updateHandler}
            deleteItem={deleteItem}
            paidHandler={paidHandler}
            stats={"All"}
          />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <TableData
            currentMonth={currentMonth}
            approvalHandler={approvalHandler}
            viewRejectionReason={viewRejectionReason}
            updateHandler={updateHandler}
            deleteItem={deleteItem}
            paidHandler={paidHandler}
            stats={"Draft"}
          />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>
          <TableData
            currentMonth={currentMonth}
            approvalHandler={approvalHandler}
            viewRejectionReason={viewRejectionReason}
            updateHandler={updateHandler}
            deleteItem={deleteItem}
            paidHandler={paidHandler}
            stats={"Pending"}
          />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab4"}>
          <TableData
            currentMonth={currentMonth}
            approvalHandler={approvalHandler}
            viewRejectionReason={viewRejectionReason}
            updateHandler={updateHandler}
            deleteItem={deleteItem}
            paidHandler={paidHandler}
            stats={"Approved"}
          />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab5"}>
          <TableData
            currentMonth={currentMonth}
            approvalHandler={approvalHandler}
            viewRejectionReason={viewRejectionReason}
            updateHandler={updateHandler}
            deleteItem={deleteItem}
            paidHandler={paidHandler}
            stats={"Billed"}
          />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default TabsBlock;
