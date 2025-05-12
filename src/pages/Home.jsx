import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [lijsten, setLijsten] = useState([]);
  const [inspecties, setInspecties] = useState([]);

  useEffect(() => {
    const opgeslagenLijsten = JSON.parse(localStorage.getItem('inspectielijsten')) || [];
    const resultaten = JSON.parse(localStorage.getItem('inspectieResultaten')) || [];

    setLijsten(opgeslagenLijsten);
    setInspecties(resultaten);
  }, []);

  const getInspectieVoorLijst = (index) => {
    return inspecties.find((insp) => insp.lijstIndex === index);
  };

  return (
    <div>
      <h1>Overzicht van inspectielijsten</h1>
      {lijsten.length === 0 ? (
        <p>Geen lijsten gevonden.</p>
      ) : (
        <ul>
          {lijsten.map((lijst, index) => {
            const inspectie = getInspectieVoorLijst(index);
            return (
              <li key={index}>
                <strong>{lijst.naam}</strong>{' '}
                <Link to={`/inspectie/${index}`}>
                  <button>Doe inspectie</button>
                </Link>
                {inspectie && (
                  <div style={{ marginTop: '8px' }}>
                    <p><em>Laatste inspectie:</em></p>
                    <ul>
                      {inspectie.antwoorden.map((a, i) => (
                        <li key={i}>
                          <strong>{lijst.vragen[i].vraag}:</strong>
                          {/* Checken of gegevenAntwoorden een array is */}
                          {a.gegevenAntwoorden && Array.isArray(a.gegevenAntwoorden) && a.gegevenAntwoorden.join(', ')}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
