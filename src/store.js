export const initialState = {
  agendas: [],
  selectedSlug: null,
  contactos: [],
};

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

export const actions = (dispatch, state) => ({
  getAllAgendas: async () => {
    try {
      const res = await fetch(
        "https://playground.4geeks.com/contact/agendas?offset=0&limit=100"
      );
      if (!res.ok) throw new Error("Error al obtener las agendas");
      const data = await res.json();
      dispatch({ type: "setAgendas", payload: data.agendas || [] });
    } catch (err) {
      console.error(err);
      dispatch({ type: "setAgendas", payload: [] });
    }
  },

  getSingleAgenda: async (slug) => {
    if (!slug) return;
    try {
      const res = await fetch(
        `https://playground.4geeks.com/contact/agendas/${slug}`
      );
      if (!res.ok) throw new Error("Error al obtener la agenda");
      const data = await res.json();
      dispatch({ type: "setSelectedSlug", payload: slug });
      dispatch({ type: "setContactos", payload: data.contacts || [] });
      localStorage.setItem("selectedSlug", slug); // ✅ guardamos la selección
    } catch (err) {
      console.error(err);
    }
  },

  createAgenda: async (slug) => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}`,
      { method: "POST" }
    );
    await actions(dispatch, state).getAllAgendas();
  },

  deleteAgenda: async (slug) => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}`,
      { method: "DELETE" }
    );
    const stored = localStorage.getItem("selectedSlug");
    if (stored === slug) localStorage.removeItem("selectedSlug"); // ✅ limpiamos si era la activa
    await actions(dispatch, state).getAllAgendas();
  },

  createContact: async (slug, contact) => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }
    );
    await actions(dispatch, state).getSingleAgenda(slug); // ✅ actualiza lista
  },

  updateContact: async (id, contact) => {
    await fetch(
      `https://playground.4geeks.com/contact/contacts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }
    );
    const slug = localStorage.getItem("selectedSlug");
    if (slug) await actions(dispatch, state).getSingleAgenda(slug);
  },

  deleteContact: async (slug, contactId) => {
    const res = await fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      const updated = state.contactos.filter((c) => c.id !== contactId);
      dispatch({ type: "setContactos", payload: updated });
    }
  },
});
