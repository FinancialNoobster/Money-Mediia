import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Leave = () => {
  const { id } = useParams();

  const [leaves, setLeaves] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  /* FETCH LEAVES */

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  /* SUMMARY */

  const totalLeaves = leaves.length;

  const approvedLeaves = leaves.filter(
    (l) => l.status === "Approved"
  ).length;

  const pendingLeaves = leaves.filter(
    (l) => l.status === "Pending"
  ).length;

  const rejectedLeaves = leaves.filter(
    (l) => l.status === "Rejected"
  ).length;

  /* AVAILABLE YEARS */

  const availableYears = [
    ...new Set(
      leaves.map((leave) =>
        new Date(leave.startDate).getFullYear()
      )
    ),
  ].sort((a, b) => b - a);

  /* FILTER LEAVES BY YEAR */

  const filteredLeaves = leaves.filter(
    (leave) =>
      new Date(leave.startDate).getFullYear() === selectedYear
  );

  /* CHART DATA */

  const monthlyData = Array(12).fill(0);

  filteredLeaves.forEach((leave) => {
    const month = new Date(leave.startDate).getMonth();
    monthlyData[month]++;
  });

  const chartData = monthlyData.map((count, index) => ({
    month: monthNames[index],
    leaves: count,
  }));

  /* GROUP LEAVES FOR TIMELINE */

  const groupedLeaves = {};

  leaves.forEach((leave) => {
    const date = new Date(leave.startDate);
    const year = date.getFullYear();
    const month = date.getMonth();

    const key = `${year}-${month}`;

    if (!groupedLeaves[key]) {
      groupedLeaves[key] = [];
    }

    groupedLeaves[key].push(leave);
  });

  const sortedMonths = Object.keys(groupedLeaves).sort((a, b) => {
    const [yearA, monthA] = a.split("-").map(Number);
    const [yearB, monthB] = b.split("-").map(Number);

    return new Date(yearB, monthB) - new Date(yearA, monthA);
  });

  return (
    <div className="p-6 space-y-8">

      {/* TITLE */}

      <h2 className="text-2xl font-bold text-center">
        Employee Leave Dashboard
      </h2>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-blue-100 p-4 rounded">
          <p className="text-lg font-semibold">Total Leaves</p>
          <p className="text-2xl">{totalLeaves}</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <p className="text-lg font-semibold">Approved</p>
          <p className="text-2xl">{approvedLeaves}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-lg font-semibold">Pending</p>
          <p className="text-2xl">{pendingLeaves}</p>
        </div>

        <div className="bg-red-100 p-4 rounded">
          <p className="text-lg font-semibold">Rejected</p>
          <p className="text-2xl">{rejectedLeaves}</p>
        </div>

      </div>

      {/* CHART */}

      <div className="bg-white p-5 rounded shadow">

        <div className="flex justify-between mb-4">

          <h3 className="text-lg font-semibold">
            Monthly Leave Analytics
          </h3>

          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(Number(e.target.value))
            }
            className="border px-3 py-1 rounded"
          >
            {availableYears.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leaves" fill="#0d9488" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* TIMELINE */}

      <div className="space-y-6">

        <h3 className="text-lg font-semibold">
          Leave Timeline
        </h3>

        {sortedMonths.map((key) => {
          const [year, month] = key.split("-");
          const monthLeaves = groupedLeaves[key];

          return (
            <div key={key} className="border rounded p-4">

              <h4 className="font-semibold mb-2">
                {monthNames[month]} {year}
              </h4>

              <table className="w-full text-sm">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">From</th>
                    <th className="px-4 py-2">To</th>
                    <th className="px-4 py-2">Reason</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>

                <tbody>

                  {monthLeaves.map((leave) => (

                    <tr key={leave._id} className="border-b">

                      <td className="px-4 py-2">
                        {leave.leaveType}
                      </td>

                      <td className="px-4 py-2">
                        {new Date(
                          leave.startDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2">
                        {new Date(
                          leave.endDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-2">
                        {leave.reason}
                      </td>

                      <td className="px-4 py-2">

                        <span
                          className={
                            leave.status === "Approved"
                              ? "text-green-600 font-semibold"
                              : leave.status === "Rejected"
                              ? "text-red-600 font-semibold"
                              : "text-yellow-600 font-semibold"
                          }
                        >
                          {leave.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Leave;