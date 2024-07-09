import React from 'react';

const Policy = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-800 font-outfit">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-[#12adee] mb-8">Privacy Verklaring</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contactgegevens</h2>
          <p className="text-gray-600 mb-2">GezondFit50Plus</p>
          <p className="text-gray-600 mb-2">Hamburgerweg 154</p>
          <p className="text-gray-600 mb-2">3851ER ERMELO</p>
          <p className="text-gray-600 mb-2"><a href="mailto:info@gezondfit50plus.nl" className="text-blue-500 underline">info@gezondfit50plus.nl</a></p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Verwerkte Persoonsgegevens</h2>
          <p className="text-gray-600">GezondFit50Plus.nl verwerkt persoonsgegevens die u zelf aan ons verstrekt of die worden verzameld bij gebruik van onze diensten. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:</p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
            <li>Naam</li>
            <li>E-mailadres</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Doel en Grondslag van Gegevensverwerking</h2>
          <p className="text-gray-600">GezondFit50Plus.nl verwerkt uw persoonsgegevens voor de volgende doelen:</p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
            <li>Verzenden van onze nieuwsbrief</li>
            <li>Contact met u opnemen indien nodig voor onze dienstverlening</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Geautomatiseerde Besluitvorming</h2>
          <p className="text-gray-600">Gezondfit50plus neemt geen beslissingen op basis van geautomatiseerde verwerkingen die aanzienlijke gevolgen kunnen hebben voor personen.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bewaartermijnen</h2>
          <p className="text-gray-600">GezondFit50Plus.nl bewaart uw persoonsgegevens niet langer dan nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delen van Gegevens met Derden</h2>
          <p className="text-gray-600">GezondFit50Plus.nl verstrekt uw gegevens alleen aan derden indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan wettelijke verplichtingen.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cookies en Vergelijkbare Technieken</h2>
          <p className="text-gray-600">GezondFit50Plus.nl gebruikt geen functionele, analytische en tracking cookies om de website goed te laten werken en te optimaliseren.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Inzien, Aanpassen of Verwijderen van Gegevens</h2>
          <p className="text-gray-600">U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Ook kunt u uw toestemming voor gegevensverwerking intrekken of bezwaar maken tegen de verwerking van uw persoonsgegevens. Daarnaast heeft u recht op gegevensoverdraagbaarheid. Verzoeken hiervoor kunt u sturen naar <a href="mailto:info@gezondfit50plus.nl" className="text-blue-500 underline">info@gezondfit50plus.nl</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Klachten</h2>
          <p className="text-gray-600">Indien u een klacht heeft over de verwerking van uw persoonsgegevens, kunt u deze indienen bij de Autoriteit Persoonsgegevens via deze <a href="https://autoriteitpersoonsgegevens.nl/nl/zelf-doen/gebruik-uw-privacyrechten/klacht-melden-bij-de-ap" className="text-blue-500 underline">link</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Beveiliging van Persoonsgegevens</h2>
          <p className="text-gray-600">Gezondfit50plus neemt passende maatregelen om uw persoonsgegevens te beschermen tegen misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging. Als u vermoedt dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met onze klantenservice of via <a href="mailto:info@gezondfit50plus.nl" className="text-blue-500 underline">info@gezondfit50plus.nl</a>.</p>
        </section>
      </div>
    </div>
  );
}

export default Policy;
