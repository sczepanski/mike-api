import React from "react";

const SkeletonCard = ({ width = "w-full", height = "h-64" }) => {
  // Props para largura e altura personalizáveis, é possível passar classes do Tailwind no componente no front-end
  return (
    <div
      className={`${width} ${height} bg-blue-900 p-4 shadow-lg animate-pulse rounded-2xl shadow-blue-700/50`}
    ></div>
  );
};

export default SkeletonCard;
