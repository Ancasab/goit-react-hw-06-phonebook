
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Input, Button, Text } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from '../../redux/contactsSlice';


export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [contactName, setcontactName] = useState('');
  const [number, setNumber] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (contactName.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === contactName.toLowerCase()
    );
    if (existingContact) {
      alert(`${contactName} is already in your contacts`);
      return;
    }

    dispatch(
      addContact({
        name: contactName,
        number,
        id: nanoid(),
      })
    )
    setcontactName('');
    setNumber('');
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setcontactName(value);
        break;
      
      case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Text>Name</Text>
      <Input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={contactName}
        onChange={handleChange}
      />
      <Text>Number</Text>
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <Button type="submit">Add Contact</Button>
    </Form>
  );
}



// function ContactForm({ addContact, contacts }) {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleNumberChange = (event) => {
//     setNumber(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (name.trim() === '' || number.trim() === '') {
//       return;
//     }

//     const existingContact = contacts.find(
//       (contact) => contact.name.toLowerCase() === name.toLowerCase()
//     );
//     if (existingContact) {
//       alert('Contact with this name already exists!');
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name: name.trim(),
//       number: number.trim(),
//     };
//     addContact(newContact);
//     setName('');
//     setNumber('');
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Text>Name</Text>
//       <Input
//         type="text"
//         name="name"
//         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
//         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//         required
//         value={name}
//         onChange={handleNameChange}
//       />
//       <Text>Number</Text>
//       <Input
//         type="tel"
//         name="number"
//         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//         required
//         value={number}
//         onChange={handleNumberChange}
//       />
//       <Button type="submit">Add Contact</Button>
//     </Form>
//   );
// }

// export default ContactForm