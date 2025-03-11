import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function MarksBarGraph({ data, name, dataKey }) {
  return (
    <BarChart width={430} height={250} data={data} barCategoryGap={30}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip/>
      <Legend />
      <Bar dataKey={dataKey} fill="#8884d8" barSize={40} />
    </BarChart>
  );
}

export default MarksBarGraph;
