import { useEffect, useState } from "react";
import { fetchInstructors } from "../services/api";

export default function InstructorList() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      const res = await fetchInstructors();
      setInstructors(res.data);
    } catch (error) {
      console.error("Failed to fetch instructors", error);
    }
  };

  return (
    <div>
      <h2>Instructors</h2>
      <ul>
        {instructors.map((inst) => (
          <li key={inst.id}>
            {inst.user.first_name} {inst.user.last_name} ({inst.user.username})
          </li>
        ))}
      </ul>
    </div>
  );
}
