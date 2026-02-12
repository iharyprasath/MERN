import axios from "axios";
import { useState, useEffect, useCallback } from "react";

// change this BASE_URL to your real backend later

export default function ContactList({ setContacts, contacts }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const query = `?status=${filter}&search=${search}`;
      const res = await axios.get(`${BASE_URL}/contacts${query}`);
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoading(false);
    }
  }, [filter, search, setContacts]);

  useEffect(() => {
    const load = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 1000));
      await Promise.all([fetchContacts(), delay]);
    };
    load();
  }, [fetchContacts]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/contacts/${id}`, { status });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c)),
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`${BASE_URL}/contacts/${id}`);
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="flex gap-10">
        {/* filter dropdown */}
        <select
          className="p-2 rounded bg-amber-400 text-white cursor-pointer outline-0"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="interested">Interested</option>
          <option value="follow-up">Follow-up</option>
          <option value="closed">Closed</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or company"
          className="p-3 rounded w-full bg-yellow-100 outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="w-full h-104 flex flex-col items-center justify-center mt-10 gap-4">
          <img src="/pulse-rings-3.svg" alt="Loading..." width={60} />
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <>
          {contacts.length === 0 && (
            <div className="bg-amber-100 w-full h-103 flex flex-col items-center justify-center mt-10 gap-4">
              <p className="text-2xl">No contacts available</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-10 mt-10">
            {contacts.map((c) => (
              <div
                key={c._id}
                className="p-4 rounded bg-yellow-100 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <span className="bg-amber-200 px-3 py-1 rounded">
                    {c.company}
                  </span>
                </div>

                <div className="flex justify-between border p-3 rounded mb-4">
                  <p>{c.email}</p>
                  <p>{c.phone}</p>
                </div>

                <div className="flex justify-between items-center">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className="p-2 rounded"
                  >
                    <option value="interested">Interested</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-amber-700 text-white px-3 py-1 rounded hover:bg-amber-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
