import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Link, useParams, useNavigate } from "react-router-dom";

const Edit = () => {

  const {id} = useParams();
  const users = {
    fname: "",
    lname: "",
    email: "",
    
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(()=>{
    axios.get(`https://mongo-crud-ten.vercel.app/api/getone/${id}`)
    .then((res)=>{
      
      setUser(res.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [id])
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://mongo-crud-ten.vercel.app/api/update/${id}`, user)
      
      .then((res) => {
        toast.success(res.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            value={user.fname}
            autoComplete="off"
            placeholder="First name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            value={user.lname}
            autoComplete="off"
            placeholder="Last name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
