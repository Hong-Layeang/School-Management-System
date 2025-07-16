import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    courses: 0,
    students: 0,
    teachers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchCounts = async () => {
      try {
        const [coursesRes, studentsRes, teachersRes] = await Promise.all([
          API.get("/api/courses", { headers }),
          API.get("/api/students", { headers }),
          API.get("/api/teachers", { headers }),
        ]);

        setSummary({
          courses: coursesRes.data.total || 0,
          students: studentsRes.data.total || 0,
          teachers: teachersRes.data.total || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard summary:", err);
        // Set default values if API calls fail
        setSummary({
          courses: 0,
          students: 0,
          teachers: 0,
        });
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <SummaryCard title="Courses" count={summary.courses} href="/courses" />
        <SummaryCard
          title="Students"
          count={summary.students}
          href="/students"
        />
        <SummaryCard
          title="Teachers"
          count={summary.teachers}
          href="/teachers"
        />
      </div>
    </div>
  );
}

function SummaryCard({ title, count, href }) {
  return (
    <Link
      to={href}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </Link>
  );
}
