import PropTypes from 'prop-types';
import { ListContact, ContactItems, ContactData,  Button } from './ContactList.styled'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/filterSlice';


export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filtered = useSelector(getFilter);

  const normalizedFilter = filtered.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
);


    return (
      <ListContact>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactItems key={id}>
          <ContactData>
            {name}: {number}
          </ContactData>
          <Button
            type="button"
            onClick={() => dispatch(deleteContact(id))}>
            Delete
          </Button>
        </ContactItems>
      ))}
    </ListContact>
  );
};
    

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string),
  deleteContact: PropTypes.func.isRequired,
};




// import PropTypes from 'prop-types';
// import { ContactItems, ContactName, ContactNumber, Button } from './ContactList.styled'

// const ContactList = ({ contacts, deleteContact }) => {
//   return (
//     <ul>
//       {contacts.map((contact) => (
//         <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />
//       ))}
//     </ul>
//   );
// }

// const ContactItem = ({ contact, deleteContact }) => {
//   const handleDelete = () => {
//     deleteContact(contact.id);
//   };

//   return (
//     <ContactItems>
//       <ContactName>{contact.name}: </ContactName>
//       <ContactNumber>{contact.number}</ContactNumber>
//       <Button onClick={handleDelete}>Delete</Button>
//     </ContactItems>
//   );
// }

// ContactItem.propTypes = {
//   contact: PropTypes.object.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };

// export default ContactList