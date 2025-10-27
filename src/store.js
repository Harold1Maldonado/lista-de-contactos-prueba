export const initialState = {
  agendas: [],
  selectedSlug: null,
  contactos: [],
};

// useReducer actualiza el estado global según el tipo de acción recibida
export function storeReducer(state = initialState, action) {
  switch (action.type) {
    case "setAgendas":
      return { ...state, agendas: action.payload };
    case "setSelectedSlug":
      return { ...state, selectedSlug: action.payload };
    case "setContactos":
      return { ...state, contactos: action.payload };
    default:
      return state;
  }
}

// Acciones que disparan dispatch() del useReducer
export const actions = (dispatch) => ({
  getAllAgendas: async () => {
    const res = await fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100");
    const data = await res.json();
    dispatch({ type: "setAgendas", payload: data.agendas || [] });
  },
  getSingleAgenda: async (slug) => {
    const res = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);
    const data = await res.json();
    dispatch({ type: "setSelectedSlug", payload: slug });
    dispatch({ type: "setContactos", payload: data.contacts || [] });
  },
  createAgenda: async (slug) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, { method: "POST" });
  },
  deleteAgenda: async (slug) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, { method: "DELETE" });
  },
  createContact: async (slug, contact) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
  },
  updateContact: async (id, contact) => {
    await fetch(`https://playground.4geeks.com/contact/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
  },
  deleteContact: async (id) => {
    await fetch(`https://playground.4geeks.com/contact/contacts/${id}`, { method: "DELETE" });
  },
});
