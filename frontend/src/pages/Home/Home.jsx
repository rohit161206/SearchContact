import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Home/Home.css";
import { PiStudentFill } from "react-icons/pi";

function Home() {
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (text.trim() !== "") {
            axios.get(`http://localhost:8000/search?query=${text}`)
                .then((response) => setResults(response.data))
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            setResults([]);
        }
    }, [text]);

    const handleStudentClick = (student) => {
        navigate(`/student/${student.roll_no}`, { state: { student } });
    };

    return (
        <div className={`container ${text ? "search-active" : ""}`}>
            
            <PiStudentFill className="icon" />
            <h1 className="title">Student Info</h1>
            <h2>Search Students</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Roll Number..."
                className="search-input"
            />
            <div className="results-container">
                {results.length > 0 ? (
                    results.map((student, index) => (
                        <button key={index} className="student-btn" onClick={() => handleStudentClick(student)}>
                            <img src={student.student_image} alt={student.student_name} className="student-img" />
                            <span>{student.student_name} ({student.roll_no})</span>
                        </button>
                    ))
                ) : text && (
                    <p className="no-results">No results found</p>
                )}
            </div>
        </div>
    );
}

export default Home;
