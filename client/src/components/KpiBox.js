import { MDBCol } from "mdb-react-ui-kit";
import React from "react";

const KpiBox = (props) => {
  let { title, amount, percentage, achieved, border, limit, target, col } =
    props;
  return (
    <>
      <MDBCol lg={col}>
        <div className="kpiBox">
          <div className="kpi_body" style={{ borderColor: `${border}` }}>
            <h5>{title}</h5>
            <div className="flexBody">
              {!achieved ? (
                <h4>
                  <span> $</span>
                  {amount}
                </h4>
              ) : (
                <h4>
                  {percentage}
                  <span> %</span>
                </h4>
              )}
              {percentage && !achieved && (
                <p>
                  {percentage}
                  <span>%</span>
                </p>
              )}

              {limit && (
                <h6>
                  <span>{target ? "Target" : "Limit"}</span>
                  <span>{target ? `~${limit}` : limit}</span>
                </h6>
              )}
            </div>
          </div>
        </div>
      </MDBCol>
    </>
  );
};

const DaysCount = (props) => {
  let { title, days, warn } = props;
  return (
    <>
      <div className="daysBox">
        <h3>{title}</h3>
        <p style={{ color: warn && "red" }}>{days}</p>
      </div>
    </>
  );
};

export { KpiBox, DaysCount };
