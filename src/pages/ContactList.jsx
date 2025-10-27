import ContactCard from '../components/ContactCard';
import { useGlobalReducer } from '../hooks/useGlobalReducer';

const ContactList = () => {
  const { state } = useGlobalReducer();
  return (
    <div>
      <h2>Contactos</h2>
      {state.contactos.map(c => <ContactCard key={c.id} contact={c}/>)}
    </div>
  );
};

export default ContactList;