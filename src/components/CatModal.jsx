import React from "react";

const CatModal = ({ isOpen, cat, onClose }) => {
  if (!isOpen || !cat) return null; // Se o modal não estiver aberto ou não houver gato, não renderiza nada

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-2xl shadow-lg relative">
        <button
          className="absolute bottom-3 right-4 cursor-pointer px-6 py-2 bg-blue-500 text-white font-bold rounded-lg border-2 border-blue-500 hover:bg-white hover:text-blue-700 hover:border-blue-700 transition-all ease-in-out duration-300"
          onClick={onClose}
        >
          Fechar
        </button>
        <img
          src={cat.url}
          alt="Gato em destaque"
          className="rounded-xl mb-4 w-fit h-128 object-cover shadow-lg"
        />
        <div>
          {cat.breeds && cat.breeds[0] ? ( // Verifica se há informações da raça, se tiver, irá exibir as informações, caso contrário, exibirá "Raça desconhecida"
            <div className="text-left">
              <h2 className="text-blue-500 text-2xl font-semibold mb-2">
                {cat.breeds[0].name}
              </h2>
              <p className="text-blue-500">
                <span className="font-medium">Temperamento: </span>
                {cat.breeds[0].temperament}
              </p>
              <p className="text-blue-500">
                <span className="font-medium">Origem: </span>
                {cat.breeds[0].origin}
              </p>
            </div>
          ) : (
            <p className="text-blue-500 text-left font-thin italic mt-4 mb-2 text-lg">
              Raça desconhecida
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatModal;
