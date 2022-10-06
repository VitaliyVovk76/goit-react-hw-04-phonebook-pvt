import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import s from "./ContactsList.module.css";

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.item} key={id}>
          <p>
            {name}: {number}
          </p>
          <Button
            onClick={() => onDeleteContact(id)}
            text="Delete"
            id="delete"
            type="button"
          />
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactsList;
