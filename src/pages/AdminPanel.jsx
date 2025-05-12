import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function AdminPanel() {
  const [lijsten, setLijsten] = useState([]);
  const [inspecties, setInspecties] = useState([]);

  // Haal de gegevens op uit localStorage
  useEffect(() => {
    const opgeslagenLijsten = JSON.parse(localStorage.getItem('inspectielijsten')) || [];
    const resultaten = JSON.parse(localStorage.getItem('inspectieResultaten')) || [];
    setLijsten(opgeslagenLijsten);
    setInspecties(resultaten);
  }, []);

  // Functie om de antwoorden per vraag te verzamelen
  const getAntwoordenPerVraag = (lijstIndex, vraagIndex) => {
    const antwoordenCount = {};

    const inspectie = inspecties.find((insp) => insp.lijstIndex === lijstIndex);

    if (inspectie && Array.isArray(inspectie.antwoorden)) {
      inspectie.antwoorden.forEach((antwoord) => {
        // We nemen alleen het eerste antwoord per vraag
        const gegevenAntwoord = antwoord.gegevenAntwoorden[vraagIndex];

        if (gegevenAntwoord) {
          if (antwoordenCount[gegevenAntwoord]) {
            antwoordenCount[gegevenAntwoord] += 1;
          } else {
            antwoordenCount[gegevenAntwoord] = 1;
          }
        }
      });
    }

    return antwoordenCount;
  };

  // Verwijder een lijst uit localStorage
  const handleDeleteLijst = (index) => {
    const nieuweLijsten = lijsten.filter((lijst, i) => i !== index);
    const nieuweInspecties = inspecties.filter((inspectie) => inspectie.lijstIndex !== index);

    setLijsten(nieuweLijsten);
    setInspecties(nieuweInspecties);

    // Update localStorage
    localStorage.setItem('inspectielijsten', JSON.stringify(nieuweLijsten));
    localStorage.setItem('inspectieResultaten', JSON.stringify(nieuweInspecties));
  };

  return (
    <div>
      <h1>Admin Panel - Inspectie Antwoorden</h1>
      {lijsten.length === 0 ? (
        <p>Er zijn geen lijsten beschikbaar.</p>
      ) : (
        lijsten.map((lijst, lijstIndex) => (
          <div key={lijstIndex} style={{ marginBottom: '30px' }}>
            <h2>{lijst.naam}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {lijst.vragen.map((vraag, vraagIndex) => {
                const antwoordenTeller = getAntwoordenPerVraag(lijstIndex, vraagIndex);
                const labels = Object.keys(antwoordenTeller);
                const data = Object.values(antwoordenTeller);

                const chartData = {
                  labels: labels,
                  datasets: [
                    {
                      label: `Antwoorden voor vraag: ${vraag.vraag}`,
                      data: data,
                      backgroundColor: [
                        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33A1FF', '#A1FF33',
                        '#FF9133', '#57FF33', '#57A1FF', '#A1FF57',
                      ],
                    },
                  ],
                };

                return (
                  <div key={vraagIndex} style={{ width: '45%', minWidth: '300px' }}>
                    <h3>{vraag.vraag}</h3>
                    <div style={{ width: '100%', height: '400px', margin: '0 auto' }}>
                      <Pie data={chartData} />
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => handleDeleteLijst(lijstIndex)}
              style={{
                marginTop: '10px',
                backgroundColor: 'red',
                color: 'white',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Verwijder Lijst
            </button>
          </div>
        ))
      )}
      <Link to="/">
        <button style={{ marginTop: '20px' }}>Terug naar Home</button>
      </Link>
    </div>
  );
}

export default AdminPanel;
