import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";
import Container from "./components/Container";
import Section from "./components/Section";
import Title from "./components/Title";
import Button from "./components/Button";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    showModal: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    //делаем из json-формата (это строка) массив
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name: name, number: number };

    if (this.banToAdd(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));

    this.toggleModal();
  };

  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  banToAdd = (searchName) => {
    return this.state.contacts.find((contact) => contact.name === searchName);
  };

  deleteContact = (deleteId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== deleteId),
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { filter, showModal } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section>
          <Title text="Phonebook" type="first" />

          <Button
            type="button"
            onClick={this.toggleModal}
            text="Create contact"
            id="create"
          />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <ContactForm onSubmit={this.addContact} />
            </Modal>
          )}
        </Section>
        <Section>
          {" "}
          <Title text="Contacts" type="second" />
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}

export default App;
