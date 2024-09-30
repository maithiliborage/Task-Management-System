import React from "react";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { TbLogout2 } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Slider = () => {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let [role, setRole] = useState("");
  let logout = useLogout();
  useEffect(() => {
    if (!userData) {
      logout();
    } else {
      setRole(userData.role);
    }
  }, []);

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="rgba(255, 255, 255, 0.2)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <FaUserCircle style={{ height: "50px", width: "40px" }} />
            {` ${userData.name}  `}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {role === "manager" ? (
              <CustomerNavLinks />
            ) : (
              <UserNavLinks userData={userData} />
            )}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            <TbLogout2 /> Logout
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

function CustomerNavLinks() {
  let logout = useLogout();
  return (
    <>
      <NavLink exact to="/dashboard" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/register" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="user">Create User</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/home" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="table">User Data</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/createTask" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="file">Create Task</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/Submitedtask" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="list-check">Tasks List</CDBSidebarMenuItem>
      </NavLink>
    </>
  );
}

function UserNavLinks({ userData }) {
  let logout = useLogout();
  let userId = userData._id;
  return (
    <>
      <NavLink exact to="/userdash" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/userTask" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="table">Task</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to="/submitedByuser" activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="list-check">Submitted Task</CDBSidebarMenuItem>
      </NavLink>
      <NavLink exact to={`/editProfile/${userId}`} activeClassName="activeClicked">
        <CDBSidebarMenuItem icon="user-edit">Edit Profile</CDBSidebarMenuItem>
      </NavLink>
    </>
  );
}

export default Slider;