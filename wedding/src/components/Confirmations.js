import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          <h2>{t('confirmationsTitle')}</h2>
            <h4>{t('confirmationsSubtitle')}</h4>
          </div>
          <FormGroup>
            <Label for="name">{t('formName')}</Label>
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
            <Label for="email">{t('formEmail')}</Label>
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
            <Label for="phone">{t('formPhone')}</Label>
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
            <Label for="guests">{t('formGuests')}</Label>
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
            <h2>{t('modalConfirm')}</h2>
          </ModalHeader>
          <ModalBody>
            <ul>
              <li>{t('modalName')} {formData.name}</li>
              <li>{t('modalEmail')} {formData.email}</li>
              <li>{t('modalPhone')}{formData.phone}</li>
              <li>{t('modalGuests')} {formData.guests}</li>
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

