import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = () => {
  const [text, setText] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formData, setFormData] = useState();
  const [refresh, setRefresh] = useState(false);

  const tablestyling = {
    borderCollapse: "separate",
    borderSpacing: "1rem",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "2rem",
    border: "1px solid",
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setText({ ...text, [name]: value });
  };
  
  const showData = () => {
    refresh===true ? setRefresh(false) : setRefresh(true);
    console.log(refresh); 
    // setRefresh(true);
  };

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:7000/form", text)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.data));

    console.log("text: ", text);
    setText({
      name: "",
      email: "",
      phone: "",
    });
    // setRefresh(false);
  };

  useEffect(() => {
    //  GET request using fetch()

    // fetch("http://localhost:7000/form")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // const data=res.json();
    //     console.log("data from server: ", res);

    //     setFormData(res);
    //     // showRefreshTime();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //  GET request using axios()
    axios.get("http://localhost:7000/form")
    // .then((res) => res.json())  axios automatically convert the data into JSON
    .then((res) => {
      // const data=res.json();
      console.log("data from server: ", res.data);

      setFormData(res.data);
      // showRefreshTime();
    })
    .catch((err)=>{
      console.log(err)

    })
  }, [refresh]);

  // POST request (to send request to the server) using fetch()

  //   fetch("/form", {
  //     // Adding method type
  //     method: "POST",
  //     // Adding body or contents to send
  //     body: JSON.stringify(text),
  //     // Adding headers to the request
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   })
  //     // Converting to JSON
  //     // .then((response) => response.json())
  //     // Displaying results to console
  //     .then((json) => console.log(json))
  //     .catch((error) => {
  //       alert("Something went wrong!");
  //       console.log(error.data);
  //     });

  //   POST DATA WITH AXIOS

  // -------------------------

  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={submit} >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={text.name}
          onChange={onChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={text.email}
          onChange={onChange}
          required
        />
        <br />
        <input
          type="number"
          name="phone"
          placeholder="Enter Phone Number"
          value={text.phone}
          onChange={onChange}
          required
        />
        <br />

        <button>Submit</button>
      </form>

      <h2>Data</h2>
      <div>
        <button onClick={showData}>Refresh</button>
      </div>

      <table style={tablestyling}>
        <thead>
          <tr>
            <th>Id:</th>
            <th>Name: </th>
            <th>Email: </th>
            <th>Phone: </th>
          </tr>
        </thead>
        {formData?.length !== 0 ? ( // true
          formData?.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              </tbody>
            );
          }) // false
        ) : (
          <tbody>
            <tr>
              <td rowSpan={"4"}>No Entry to Display</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
