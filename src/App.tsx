import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Users from "./pages/teacher/users/Users";
import LoginStudent from "./pages/homepage/LoginStudent/Login-student";
import LoginTeacher from "./pages/homepage/LoginTeacher/Login-teacher";
import AddStudent from "./pages/teacher/addUser/AddStudent";
import AddTeacher from "./pages/teacher/addUser/AddTeacher";
import TeacherDashboard from "./pages/teacher/dashboard/Dashboard";
import "./sass/main.scss";
import TeacherAccount from "./pages/teacher/account/Account";
import { useAuth } from "./store/authContext";
import WelcomePage from "./pages/homepage/WelcomePage/WelcomePage";
import MenageClasses from "./pages/teacher/MenageClasses/default/ManageClasses";
import TSchedual from "./pages/teacher/MenageClasses/Schedual/defualt/Schedule";
import AddClass from "./pages/teacher/MenageClasses/Schedual/AddClass/AddClass";
import Grades from "./pages/teacher/MenageClasses/Grades/default/Grades";

import AddMultipleGrades from "./pages/teacher/MenageClasses/Grades/addGrades/AddMultipleGrades";
import Attendance from "./pages/teacher/MenageClasses/Attendance/default/Attendance";
import AttendanceDetails from "./pages/teacher/MenageClasses/Attendance/details/AttendanceDetails";
import AddAttendance from "./pages/teacher/MenageClasses/Attendance/addAttendance/AddAttendance";
import Homework from "./pages/teacher/MenageClasses/Homework/default/Homework";
import AddHomework from "./pages/teacher/MenageClasses/Homework/addHomework/AddHomework";

import MCalendar from "./pages/teacher/MenageClasses/Calendar/default/Calendar";
import AddCalendarEvent from "./pages/teacher/MenageClasses/Calendar/AddCalendar/AddCalendarEvent";
import TeacherSchedual from "./pages/teacher/schedual/Schedual";
import Home from "./pages/student/dashboard/Dashboard";
import SGrades from "./pages/student/grades/Grades";
import SSchedule from "./pages/student/schedual/Schedule";
import SAccount from "./pages/student/account/Account";
import SAttendance from "./pages/student/attendance/Attendance";
import CalendarComponent from "./pages/student/calendar/default/Calendar";
import SHomework from "./pages/student/homework/default/Homework";
import SCalendarEvent from "./pages/student/calendar/details/CalendarEvent";
import SHomeworkDetails from "./pages/student/homework/details/HomeworkDetails";
import CalendarEvent from "./pages/teacher/MenageClasses/Calendar/details/CalendarEventDetails";
import HomeworkDetails from "./pages/teacher/MenageClasses/Homework/details/HomeworkDetails";
import EditClass from "./pages/teacher/MenageClasses/Schedual/EditClass/EditClass";
import EditHomework from "./pages/teacher/MenageClasses/Homework/editHomework/EditHomework";
import EditCalendar from "./pages/teacher/MenageClasses/Calendar/EditCalendar/EditCalendar";
import Page404 from "./pages/homepage/404/404";

function App() {
  const { currentUser } = useAuth();
  const { isTeacher } = useAuth();
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const checkTeacher = window.localStorage.getItem("isTeacher");
  console.log(loggedIn, "login ");
  console.log(checkTeacher, "teacher");

  const StudentPrivateRoute = () => {
    return checkTeacher === "false" && loggedIn === "true" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  };
  const TeacherPrivateRoute = () => {
    return checkTeacher === "true" && loggedIn === "true" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/login-teacher" element={<LoginTeacher />} />
        <Route path="*" element={<Page404 />} />
        <Route element={<TeacherPrivateRoute />}>
          <Route path="Teacher/Dashboard" element={<TeacherDashboard />} />
          <Route path="Teacher/Users" element={<Users />} />
          <Route path="Teacher/add-teacher" element={<AddTeacher />} />
          <Route path="Teacher/add-student" element={<AddStudent />} />
          <Route path="Teacher/Account" element={<TeacherAccount />} />
          <Route path="Teacher/ManageClasses" element={<MenageClasses />} />
          <Route
            path="Teacher/ManageClasses/Schedual"
            element={<TSchedual />}
          />
          <Route path="Teacher/ManageClasses/AddClass" element={<AddClass />} />
          <Route
            path="Teacher/ManageClasses/EditClass"
            element={<EditClass />}
          />
          <Route path="Teacher/ManageClasses/Grades" element={<Grades />} />
          <Route
            path="Teacher/ManageClasses/AddMultipleGrades"
            element={<AddMultipleGrades />}
          />
          <Route
            path="Teacher/ManageClasses/Attendance"
            element={<Attendance />}
          />
          <Route
            path="Teacher/ManageClasses/Attendance/UserDetails"
            element={<AttendanceDetails />}
          />
          <Route
            path="/Teacher/ManageClasses/AddAttendance"
            element={<AddAttendance />}
          />
          <Route path="Teacher/ManageClasses/Homework" element={<Homework />} />
          <Route
            path="/Teacher/ManageClasses/AddHomework"
            element={<AddHomework />}
          />
          <Route
            path="/Teacher/ManageClasses/EditHomework"
            element={<EditHomework />}
          />
          <Route
            path="/Teacher/ManageClasses/Calendar"
            element={<MCalendar />}
          />
          <Route
            path="/Teacher/ManageClasses/AddCalendarEvent"
            element={<AddCalendarEvent />}
          />
          <Route
            path="/Teacher/ManageClasses/EditCalendar"
            element={<EditCalendar />}
          />
          <Route path="/Teacher/Schedule" element={<TeacherSchedual />} />
          <Route
            path="/Teacher/ManageClasses/Calendar/EventDetails"
            element={<CalendarEvent />}
          />
          <Route
            path="/Teacher/ManageClasses/Homework/HomeworkDetails"
            element={<HomeworkDetails />}
          />
        </Route>

        {/* <Route path="*" element={<PageNotFound/>} /> */}
        <Route element={<StudentPrivateRoute />}>
          <Route path="/Student/Dashboard" element={<Home />} />
          <Route path="/Student/Grades" element={<SGrades />} />
          <Route path="/Student/Schedule" element={<SSchedule />} />
          <Route path="/Student/Account" element={<SAccount />} />
          <Route path="/Student/Attendance" element={<SAttendance />} />
          <Route path="/Student/Calendar" element={<CalendarComponent />} />
          <Route path="/Student/Homework" element={<SHomework />} />
          <Route
            path="Student/Calendar/EventDetails"
            element={<SCalendarEvent />}
          />
          <Route
            path="Student/Homework/HomeworkDetails"
            element={<SHomeworkDetails />}
          />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
