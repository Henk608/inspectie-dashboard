import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function InspectieInvullen() {
  const { index } = useParams();
  const [lijst, setLijst] = useState(null);
  const [antwoorden, setAntwoorden] = useState([]);

  useEffect(() => {
    const opgeslagen = JSON.parse(localStorage.getItem('inspectielijsten')) || [];
    const geselecteerde = opgeslagen[parseInt(index)];
    setLijst(geselecteerde);
    setAntwoorden(geselecteerde.vragen.map(() => [])); // Antwoorden zijn nu arrays van geselecteerde antwoorden
  }, [index]);

  const handleCheckboxChange = (vraagIndex, antwoordIndex) => {
    const nieuweAntwoorden = [...antwoorden];
    const vraagAntwoorden = nieuweAntwoorden[vraagIndex] || [];
    
    // Als het antwoord al geselecteerd is, verwijderen we het
    if (vraagAntwoorden.includes(antwoordIndex)) {
      nieuweAntwoorden[vraagIndex] = vraagAntwoorden.filter(item => item !== antwoordIndex);
    } else {
      vraagAntwoorden.push(antwoordIndex); // Voeg toe aan de geselecteerde antwoorden
      nieuweAntwoorden[vraagIndex] = vraagAntwoorden;
    }

    setAntwoorden(nieuweAntwoorden);
  };

  const handleOpslaan = () => {
    const ingevuld = {
      lijstIndex: parseInt(index),
      antwoorden: lijst.vragen.map((vraag, vraagIndex) => ({
        vraag: vraag.vraag,
        gegevenAntwoorden: antwoorden[vraagIndex].map((antwoordIndex) => vraag.antwoorden[antwoordIndex]),
      })),
      datum: new Date().toISOString(),
    };

    const bestaande = JSON.parse(localStorage.getItem('inspectieResultaten')) || [];
    const nieuw = [...bestaande, ingevuld];
    localStorage.setItem('inspectieResultaten', JSON.stringify(nieuw));

    alert('Inspectie opgeslagen!');
  };

  if (!lijst) return <p>Lijst laden...</p>;

  return (
    <div>
      <h1>Inspectie: {lijst.naam}</h1>
      {lijst.vragen.map((vraag, vraagIndex) => (
        <div key={vraagIndex}>
          <p>{vraag.vraag}</p>
          {vraag.antwoorden.map((antwoord, antwoordIndex) => (
            <div key={antwoordIndex}>
              <input
                type="checkbox"
                id={`antwoord-${vraagIndex}-${antwoordIndex}`}
                onChange={() => handleCheckboxChange(vraagIndex, antwoordIndex)}
                checked={antwoorden[vraagIndex]?.includes(antwoordIndex)}
              />
              <label htmlFor={`antwoord-${vraagIndex}-${antwoordIndex}`}>{antwoord}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleOpslaan}>Inspectie opslaan</button>
    </div>
  );
}

export default InspectieInvullen;
