const FALLBACK_IMAGE = "https://via.placeholder.com/300?text=Gato+Indisponível";

const CatCard = ({ cat, onError, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-blue-700 shadow-lg rounded-2xl p-2 flex flex-col items-center relative shadow-blue-700/50 cursor-pointer hover:scale-105 transition-all ease-in-out duration-200"
    >
      <img
        src={cat.url || FALLBACK_IMAGE}
        alt="Gato fofo"
        className="w-80 h-80 object-cover rounded-xl shadow-lg"
        onError={() => onError(cat.id)}
      />
      {cat.breeds && cat.breeds[0] && (
        <h2 className="mt-2 text-sm md:text-lg font-semibold text-white absolute bottom-4 md:left-4 bg-gray-800/20 border px-8 py-2 rounded-md shadow-md">
          {cat.breeds[0].name}
        </h2>
      )}
    </div>
  );
};

export default CatCard;
