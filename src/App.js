import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";
import Container from "./components/Container";
import Section from "./components/Section";
import Title from "./components/Title";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts") ?? []);
  });

  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = { id: nanoid(), name: name, number: number };

    if (banToAdd(name)) {
      toast.error(`${name} is already in contacts`);
      return;
    }
    if (name.trim() === "" || number.trim() === "") {
      toast.error(`Enter the form`);
      return;
    }
    setContacts(() => [contact, ...contacts]);

    toggleModal();
  };

  const changeFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const banToAdd = (searchName) => {
    return contacts.find((contact) => contact.name === searchName);
  };

  const deleteContact = (deleteId) => {
    setContacts(() => contacts.filter((contact) => contact.id !== deleteId));
  };

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  const visibleContacts = getVisibleContacts();
  return (
    <Container>
      <Section>
        <Title text="Phonebook" type="first" />

        <Button
          type="button"
          onClick={toggleModal}
          text="Create contact"
          id="create"
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <ContactForm onSubmit={addContact} />
          </Modal>
        )}
      </Section>
      <Section>
        {" "}
        <Title text="Contacts" type="second" />
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
      <ToastContainer autoClose={3000} />
    </Container>
  );
};

export default App;
