import React, { useState } from 'react';

const Contact = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1); // Index of the contact being edited
  const [dummyDataArray, setDummyDataArray] = useState([
    { name: 'Prerna', lastName: 'Bhandari', status: 'active' },
    { name: 'You are', lastName: 'Welcome :)', status: 'inactive' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    status: ''
  });

  const handleToggleForm = (index) => {
    setIsFormVisible(!isFormVisible);
    setEditIndex(index); // Set the index of the contact being edited
    if (index !== -1) {
      const contact = dummyDataArray[index];
      setFormData({
        name: contact.name,
        lastName: contact.lastName,
        status: contact.status
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const deleteFormData = (formData)=>{
    console.log("Delete this ==>", formData);
    const newArray = dummyDataArray.filter((actualData)=>(
      actualData !== formData
    ))
    console.log("newArray :",newArray);

    setDummyDataArray(newArray)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== -1) {
      // Editing an existing contact
      const updatedArray = [...dummyDataArray];
      updatedArray[editIndex] = formData;
      setDummyDataArray(updatedArray);
    } else {
      // Creating a new contact
      setDummyDataArray([...dummyDataArray, formData]);
    }

    // Clear form data and reset edit index
    setFormData({
      name: '',
      lastName: '',
      status: ''
    });
    setEditIndex(-1);
    setIsFormVisible(false);
  };

  return (
    <div>
      {!isFormVisible ? (
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md m-4"
            onClick={() => handleToggleForm(-1)} // -1 indicates creating a new contact
          >
            Create Contact
          </button>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          <form onSubmit={handleSubmit} id="form" className="border p-4 m-4 border-gray-600 w-1/2">
          <label className="block">First Name:</label>
          <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-1 w-full"
            />

          <label className="block mt-2">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-1 w-full"
            />


        <label className="block mt-2">Status:</label>
            <label className="inline-block ml-2">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={handleChange}
              />
              Active
            </label>
            <label className="inline-block ml-2">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={handleChange}
              />
              Inactive
            </label>
            <br />




            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              {editIndex !== -1 ? 'Save Edited Data' : 'Save Contact'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dummyDataArray.map((contact, index) => (
          <div
            key={index}
            className="flex w-full p-4"
          >
            <div className="border p-4 border-gray-600 w-full bg-gray-100">
              <h3>Contact {index + 1}</h3>
              <p><strong>Name:</strong> {contact.name} {contact.lastName}</p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md m-4"
                onClick={() => handleToggleForm(index)} // Start editing this contact
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md m-4"
                onClick={() => deleteFormData(contact)} // Start editing this contact
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {!dummyDataArray?.length && <>
      <div className='flex justify-center'>
      <div className='border border-red-500 w-1/2 p-4 m-4 text-center'>
      <p className='font-bold'>No contact Found! Please add contact from Create Contact Button.</p>
    </div>
      </div>
    
      </>}
    </div>



  );
};

export default Contact;
