import { useState, useEffect, useCallback } from "react";
import { fetchRandomCatImage } from "./services/catApi";
import CatCard from "./components/CatCard";
import SkeletonCard from "./components/SkeletonCard";
import CatModal from "./components/CatModal";
import BreedInfo from "./components/BreedInfo";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]); // Guarda os gatos que serão exibidos na tela
  const [breeds, setBreeds] = useState([]); // Guarda as raças de gatos
  const [selectedBreed, setSelectedBreed] = useState(""); // Guarda a raça selecionada

  const [selectedCat, setSelectedCat] = useState(null); // Guarda o gato selecionado para detalhes (se necessário)
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a visibilidade do modal

  const [loading, setLoading] = useState(false); // Indica se está carregando

  // O termo 'UseEffect' é executado sempre que o componente é renderizado, ele possui dois argumentos, uma função e um array de dependências
  // Sempre que uma variável do array de dependências mudar, a função será executada novamente
  // Se o Array estiver vazio, a função será executada apenas uma vez, quando o componente for montado
  // Em resumo:
  // sem dependências -> roda sempre que o componente renderiza
  // array vazio -> roda apenas uma vez, quando o componente monta
  // com dependências -> roda sempre que uma das dependências mudar

  // Função para buscar gatos aleatórios
  const getRandomCats = async () => {
    try {
      setLoading(true);
      const data = await fetchRandomCatImage(4); // Busca 4 gatos aleatórios
      setCats(data.slice(0, 4)); // Atualiza o State com os novos gatos
      setLoading(false);
      // console.log(data); // Mostra no console os gatos buscados
    } catch (error) {
      console.error("Erro ao buscar gatos aleatórios:", error);
    }
  };

  // Busca as raças de gatos ao carregar a página
  useEffect(() => {
    const getBreeds = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds"); // Chama a API e espera a resposta
        const data = await response.json(); // Converte a resposta em JSON
        setBreeds(data); // Salva no State, disparando uma nova renderização para mostrar as opções no dropdown - esse State que foi definido lá em cima, e agora é salvo no Select - É um Array de Objetos de Raças
        // console.log(data); // Mostra no console as raças buscadas
      } catch (error) {
        console.error("Erro ao buscar raças:", error);
      }
    };
    getBreeds(); // Chama a função para buscar as raças ao carregar a página
  }, []);

  // Busca gatos com base na raça selecionada
  const getCatsByBreed = async () => {
    try {
      setLoading(true);
      let url = "https://api.thecatapi.com/v1/images/search?limit=100";
      if (selectedBreed) {
        // Se 'selectedBreed' estiver vazio, busca gatos aleatórios
        url += `&breed_ids=${selectedBreed}`; // Adiciona o filtro de raça se uma raça estiver selecionada
      }

      const response = await fetch(url);
      const data = await response.json();
      setCats(data); // Atualiza os cards de gatos com base na raça selecionada
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar gatos por raça:", error);
    }
  };

  // Quando a raça muda, busca gatos filtrados
  useEffect(() => {
    if (selectedBreed) getCatsByBreed();
  }, [selectedBreed]);

  // Função para lidar com erro ao carregar imagem de gato
  const handleCatImageError = useCallback(async (id) => {
    const newCatArray = await fetchRandomCatImage(1); // Busca um novo gato para substituir o que falhou ao carregar a imagem
    try {
      if (newCatArray.length > 0)
        setCats((prevCats) =>
          prevCats.map((cat) => (cat.id === id ? newCatArray[0] : cat))
        );
    } catch (error) {
      console.error("Erro ao substituir imagem de gato:", error);
    }
  }, []);

  const openModal = (cat) => {
    console.log("Abrindo modal para o gato:", cat);
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCat(null);
    setIsModalOpen(false);
  };

  const breedInfo = breeds.find((b) => b.id === selectedBreed); // Encontra as informações da raça selecionada para exibir detalhes

  console.log(breedInfo);

  return (
    <>
      <h1 className="p-4 text-5xl font-semibold text-center">
        Gerador de Gatos! 🐱
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
        <div className="grid grid-cols-2 gap-4 p-4">
          {loading // Se estiver carregando, mostra os placeholders
            ? [...Array(4)].map((_, index) => (
                // Cria um array temporário só para fazer o .map e renderizar 4 placeholders
                <SkeletonCard width="w-84" height="h-84" key={index} />
              ))
            : cats.map((cat) => (
                // O .map usa três argumentos: o elemento atual, o índice e o array completo - aqui só usamos o elemento atual
                <CatCard
                  key={cat.id}
                  cat={cat}
                  onError={handleCatImageError}
                  onClick={() => openModal(cat)}
                />
              ))}
        </div>
        <div className="flex flex-col gap-4 p-4 w-sm">
          <button
            className="bg-stone-900 px-4 py-2 rounded-xl text-lg border-2 border-stone-900 cursor-pointer hover:bg-stone-800 hover:border-blue-700 hover:shadow-blue-700/30 hover:shadow-xl transition-all ease-in-out duration-200"
            onClick={() => {
              setSelectedBreed(""); // Reseta o filtro
              getRandomCats(); // Busca gatos aleatórios
            }}
          >
            <span>Gerar Gatos Aleatórios</span>
          </button>
          <select
            className="bg-stone-900 px-4 py-2 rounded-xl text-lg border-2 border-stone-900 cursor-pointer hover:bg-stone-800 hover:border-blue-700 hover:shadow-blue-700/30 hover:shadow-xl transition-all ease-in-out duration-200"
            value={selectedBreed} // Vincula o Select ao State 'SelectedBreed'
            onChange={(e) => {
              setSelectedBreed(e.target.value);
              // console.log("Evento completo", e); // Mostra o evento completo no console
              // console.log("Raça selecionada", e.target.value); // Mostra o valor selecionado no console
            }} // Atualiza o State ao escolher outra opção de Raça
          >
            <option className="bg-stone-800" value="">
              Todas as Raças
            </option>
            {breeds.map((breed) => (
              <option className="bg-stone-800" key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
            {/* Percorre todas as raças e cria uma opção para cada - É obrigatório ter o 'key' em listas no React */}
            {/* É possível usar controle.log({breed}) para visualizar o conteúdo do JSON */}
          </select>
          {selectedBreed && breedInfo && <BreedInfo breed={breedInfo} />}
          {/* Mostra as informações da raça selecionada, se houver uma raça selecionada */}
        </div>
      </div>
      <CatModal isOpen={isModalOpen} cat={selectedCat} onClose={closeModal} />
      {/* Componente do Modal, que recebe as props para controlar a visibilidade e o gato selecionado */}
    </>
  );
}

export default App;
