import { useState } from 'react';

function MaakLijst() {
  const [lijstNaam, setLijstNaam] = useState('');
  const [vragen, setVragen] = useState([{ vraag: '', antwoorden: [''] }]);

  const voegVraagToe = () => {
    setVragen([...vragen, { vraag: '', antwoorden: [''] }]);
  };

  const voegAntwoordToe = (index) => {
    const nieuweVragen = [...vragen];
    nieuweVragen[index].antwoorden.push(''); // Voeg leeg antwoord toe
    setVragen(nieuweVragen);
  };

  const updateVraag = (index, field, value) => {
    const nieuweVragen = [...vragen];
    nieuweVragen[index][field] = value;
    setVragen(nieuweVragen);
  };

  const updateAntwoord = (vraagIndex, antwoordIndex, value) => {
    const nieuweVragen = [...vragen];
    nieuweVragen[vraagIndex].antwoorden[antwoordIndex] = value;
    setVragen(nieuweVragen);
  };

  const opslaan = () => {
    const nieuweLijst = {
      naam: lijstNaam,
      vragen: vragen,
    };

    const bestaande = JSON.parse(localStorage.getItem('inspectielijsten')) || [];
    const alles = [...bestaande, nieuweLijst];
    localStorage.setItem('inspectielijsten', JSON.stringify(alles));

    alert('Inspectielijst opgeslagen!');
    setLijstNaam('');
    setVragen([{ vraag: '', antwoorden: [''] }]);
  };

  return (
    <div>
      <h1>Maak een nieuwe inspectielijst</h1>
      <input
        placeholder="Naam van de lijst"
        value={lijstNaam}
        onChange={(e) => setLijstNaam(e.target.value)}
      />
      {vragen.map((vraag, vraagIndex) => (
        <div key={vraagIndex}>
          <input
            placeholder="Vraag"
            value={vraag.vraag}
            onChange={(e) => updateVraag(vraagIndex, 'vraag', e.target.value)}
          />
          {vraag.antwoorden.map((antwoord, antwoordIndex) => (
            <div key={antwoordIndex}>
              <input
                placeholder="Antwoord optie"
                value={antwoord}
                onChange={(e) => updateAntwoord(vraagIndex, antwoordIndex, e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => voegAntwoordToe(vraagIndex)}>+ Antwoord toevoegen</button>
        </div>
      ))}
      <button onClick={voegVraagToe}>+ Voeg vraag toe</button>
      <button onClick={opslaan}>Opslaan</button>
    </div>
  );
}

export default MaakLijst;
