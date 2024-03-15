import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import "./user.css";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/getAll");
      setUser(response.data);
    };

    fetchData();

  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`https://mongo-crud-ten.vercel.app/api/delete/${userId}`)
    .then((res)=>{
      setUser((prevUser)=> prevUser.filter((user)=> user._id !== userId))
      toast.success(res.data.msg, {position: 'top-right'})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="userTable">
      <Link to={"/add"} className="userAddBtn">
        Add User
      </Link>
      <table border={1} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            user.map((user,index)=>{
              return(
                <tr key = {index}>
                <td>{index+1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className="actionButtons">
                  <button onClick={()=> deleteUser(user._id)}>Delete</button>
                  <Link to={`/edit/`+ user._id} className="editBtn">
                    Edit
                  </Link>
                </td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default User;
