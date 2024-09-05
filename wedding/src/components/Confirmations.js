import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "react-bootstrap";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Confirmations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.guests) newErrors.guests = "Number of guests is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("API URL:", process.env.REACT_APP_API_URL);
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/rsvp`,  // Using the environment variable
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setConfirmation(response.data.message);
        toggleModal();
      } catch (error) {
        console.error("There was an error!", error);
        setErrors({ submit: "There was an error submitting the form." });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      setFormData({ name: "", email: "", phone: "", guests: "" });
      setErrors({});
      setConfirmation("");
    }
  };

  return (
    <section className="block services-block">
      <Container fluid>
        <Form onSubmit={handleFormSubmit} className="confirmationForm">
          <div className="title-holder" id="title-confirm">
            <h2>RSVP</h2>
            <h4>- Please confirm your attendance by September 30th, 2024 -</h4>
          </div>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="guests">Number of Attendees:</Label>
            <Input
              type="select"
              name="guests"
              className="confirmBox"
              value={formData.guests}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Input>
            {errors.guests && <div style={{ color: "red" }}>{errors.guests}</div>}
          </FormGroup>
          <Button
            type="submit"
            className="btn btn-primary"
            id="confirmButton"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
                Submitting...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Form>
        <Modal show={modal} onHide={toggleModal}>
          <ModalHeader closeButton>
            <h2>Confirmed</h2>
          </ModalHeader>
          <ModalBody>
            <ul>
              <li>Name: {formData.name}</li>
              <li>Email: {formData.email}</li>
              <li>Phone: {formData.phone}</li>
              <li>Number of Attendees: {formData.guests}</li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {confirmation && (
          <div className="alert alert-success" role="alert">
            {confirmation}
          </div>
        )}
        {errors.submit && (
          <div className="alert alert-danger" role="alert">
            {errors.submit}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Confirmations;






// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Spinner,
// } from "react-bootstrap"; // Import Spinner from react-bootstrap
// import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Confirmations() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     guests: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [modal, setModal] = useState(false);
//   const [confirmation, setConfirmation] = useState("");
//   const [loading, setLoading] = useState(false); // State for loading

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.phone) newErrors.phone = "Phone is required";
//     if (!formData.guests) newErrors.guests = "Number of guests is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setLoading(true); // Set loading to true when form is submitted
//       try {
//         const response = await axios.post(
//           "http://0.0.0.0:8000/submit",
//           formData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setConfirmation(response.data.message);
//         toggleModal(); // Toggle modal to show confirmation details
//       } catch (error) {
//         console.error("There was an error!", error);
//         setErrors({ submit: "There was an error submitting the form." });
//       } finally {
//         setLoading(false); // Set loading to false after request is completed
//       }
//     }
//   };

//   const toggleModal = () => {
//     setModal(!modal);
//     if (modal) {
//       // If modal is being closed
//       setFormData({ name: "", email: "", phone: "", guests: "" }); // Reset form fields
//       setErrors({}); // Reset errors
//       setConfirmation(""); // Reset confirmation message
//     }
//   };

//   return (
//     <section className="block services-block">
//       <Container fluid>
//         <Form onSubmit={handleFormSubmit} className="confirmationForm">
//           <div className="title-holder" id="title-confirm">
//             <h2>RSVP</h2>
//             <h4>- Please confirm your attendance by September 30th, 2024 -</h4>
//           </div>
//           <FormGroup >
//             <Label for="name">Name</Label>
//             <Input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
//           </FormGroup>
//           <FormGroup>
//             <Label for="email">Email</Label>
//             <Input
//               type="text"
//               name="email"
//               placeholder="Enter your email address"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
//           </FormGroup>
//           <FormGroup>
//             <Label for="phone">Phone Number:</Label>
//             <Input
//               type="text"
//               name="phone"
//               placeholder="Enter your phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//             />
//             {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
//           </FormGroup>
//           <FormGroup>
//             <Label for="guests">Number of Attendees:</Label>
//             <Input
//               type="select"
//               name="guests"
//               description="Bring your +1"
//               className="confirmBox"
//               value={formData.guests}
//               onChange={handleInputChange}
//             >
//               <option value="">Select...</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//             </Input>
//             {errors.guests && <div style={{ color: "red" }}>{errors.guests}</div>}
//           </FormGroup>
//           <Button
//             type="submit"
//             className="btn btn-primary"
//             id="confirmButton"
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                   className="mr-2"
//                 />
//                 Submitting...
//               </>
//             ) : (
//               "Confirm"
//             )}
//           </Button>
//         </Form>
//         <Modal show={modal} onHide={toggleModal}>
//           <ModalHeader closeButton>
//             <h2>Confirmed</h2>
//           </ModalHeader>
//           <ModalBody>
//             <ul>
//               <li>Name: {formData.name}</li>
//               <li>Email: {formData.email}</li>
//               <li>Phone: {formData.phone}</li>
//               <li>Number of Attendees: {formData.guests}</li>
//             </ul>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="primary" onClick={toggleModal}>
//               Close
//             </Button>
//           </ModalFooter>
//         </Modal>
//         {confirmation && (
//           <div className="alert alert-success" role="alert">
//             {confirmation}
//           </div>
//         )}
//         {errors.submit && (
//           <div className="alert alert-danger" role="alert">
//             {errors.submit}
//           </div>
//         )}
//       </Container>
//     </section>
//   );
// }

// export default Confirmations;

