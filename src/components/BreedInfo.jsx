import React from "react";

const BreedInfo = ({ breed }) => {
  const fields = [
    ["Nome", breed.name],
    ["Temperamento", breed.temperament],
    ["Origem", breed.origin],
    ["Adaptabilidade", breed.adaptability],
    ["Afeto", breed.affection_level],
    ["Amizade com Crianças", breed.child_friendly],
    ["Amizade com Cachorros", breed.dog_friendly],
    ["Energia", breed.energy_level],
    ["Inteligência", breed.intelligence],
    ["Duração Média de Vida", breed.life_span],
    ["Necessidades Sociais", breed.social_needs],
    ["Amizade com Estranhos", breed.stranger_friendly],
    ["Média de Peso em KG", breed.weight.metric],
  ];

  return (
    <div className="text-white text-left">
      <h2 className="text-xl">Informações da Raça Selecionada:</h2>
      {fields.map(([label, value]) => (
        <p key={label}>
          {label}: {value}
        </p>
      ))}
    </div>
  );
};

export default BreedInfo;
