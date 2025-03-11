import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/StudentInfo/StudentInfo.css";
import MarksBarGraph from "../../components/Chart/MarksBarGraph";

function StudentInfo() {
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const rollNo = location.state?.student?.roll_no;

    useEffect(() => {
        if (!rollNo) {
            setError("No Roll Number Provided");
            return;
        }

        axios.get(`http://localhost:8000/student/${rollNo}`)
            .then((response) => {
                setStudent(response.data);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
                setError("Student Not Found");
            });
    }, [rollNo]);

    if (!student) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return (
            <div className="student-info-container">
                <h2>{error}</h2>
                <button className="back-btn" onClick={() => navigate("/")}>Back</button>
            </div>
        );
    }

    const marksData = [
        { semester: `Semester ${student.semester}`, marks: student.semester_mark }
    ];

    const attendanceData = [
        { category: "Present", days: student.present_days },
        { category: "Total", days: student.total_days},
        { category: "Absent", days: student.total_days - student.present_days }
    ];
    const Percentage=((student.present_days)/student.total_days)*100
    console.log(Percentage);
    function roundTo(n, decimalPlaces) {
        let factor = Math.pow(10, decimalPlaces);
        return Math.round(n * factor) / factor;
      }
    return (
        <div className="student-info-container">
            <button className="back-btn" onClick={() => navigate("/")}>Back</button>

            <div className="student-details">
                <img src={student.student_image} alt={student.student_name} className="student-img-large" />
                <h2>{student.student_name} ({student.roll_no})</h2>
                <p><strong>Attendance Percentage:</strong> {roundTo(Percentage, 2)}%</p>
                <p><strong>Mentor:</strong> {student.mentor_name}</p>
                <p><strong>Warden:</strong> {student.warden_name}</p>
                <p><strong>Boarding:</strong> {student.boarding}</p>
                <p><strong>Achievements:</strong> {student.achivements || "None"}</p>
            </div>

            <div className="marks-section">
                <h3>Semester Marks</h3>
                <MarksBarGraph data={marksData} name="semester" dataKey="marks" />
            </div>

            <div className="attendance-section">
                <h3>Attendance Overview</h3>
                <MarksBarGraph data={attendanceData} name="category" dataKey="days" />
            </div>
        </div>
    );
}

export default StudentInfo;
