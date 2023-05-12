import React from "react";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
  Point,
  Title,
  Font,
  ValueAxis,
  CommonAxisSettings,
  ArgumentAxis,
} from "devextreme-react/chart";
import { grossProductData } from "../data/JsonData";

const Charts = () => {
  return (
    <Chart id="chart" dataSource={grossProductData} style={{ height: 400 }}>
      <Title text="APRIL 2023">
        <Font
          color="black"
          size={24}
          weight={600}
          family='"Mulish", sans-serif'
        />
      </Title>
      <CommonSeriesSettings argumentField="state">
        <Label visible={true} />
      </CommonSeriesSettings>

      <Series
        argumentField="state"
        valueField="year2016"
        name="Sales"
        type="bar"
        color="#3E85C7"
      />

      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-45} />
      </ArgumentAxis>

      <ValueAxis name="year2016" position="left" tickInterval={5000} />

      <Series
        valueField="year2017"
        name="Chargeback/Refund"
        type="splineArea"
        label={false}
        color="red"
        // hoverMode="includePoints"
      />
      <Series
        valueField="year2018"
        name="Spending"
        type="spline"
        label={false}
        color="#B261E3"
      />
      <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
      <Export enabled={false} />
    </Chart>
  );
};

export default Charts;
