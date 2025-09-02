import { useState } from "react";
import InfoResultat from "./InfoResultat";

function Resultat({ year, race }) {
  const [session, setSession] = useState("race"); // "race", "qualif", "sprint", "fp1", "fp2", "fp3"

  return (
    <div>
      <div>
        <label>Choisir une session : </label>
        <select value={session} onChange={(e) => setSession(e.target.value)}>
          <option value="race">Course</option>
          <option value="qualif">Qualifications</option>
          <option value="sprint">Sprint</option>
        </select>
      </div>

      <InfoResultat year={year} race={race} session={session} />
    </div>
  );
}

export default Resultat;