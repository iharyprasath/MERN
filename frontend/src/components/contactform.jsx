import axios from "axios";
import { useState } from "react";

export default function ContactForm({ setContacts, contacts }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("interested");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/contacts", {
        name,
        email,
        phone,
        company,
        status,
      });

      setContacts([...contacts, response.data]);

      // clear form
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setStatus("interested");
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Failed to add contact. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="bg-amber-100 p-3 rounded w-full text-blue-950 outline-0"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="bg-amber-100 p-3 rounded w-full text-blue-950 outline-0"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Phone"
        className="bg-amber-100 p-3 rounded w-full text-blue-950 outline-0"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Company"
        className="bg-amber-100 p-3 rounded w-full text-blue-950 outline-0"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <select
        className="bg-amber-200 p-3 rounded w-full text-blue-950 outline-0 cursor-pointer"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="interested">Interested</option>
        <option value="follow-up">Follow-up</option>
        <option value="closed">Closed</option>
      </select>
      
      <button
        type="submit"
        className="bg-amber-500 text-white p-3 rounded w-full hover:bg-amber-700 transition cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
