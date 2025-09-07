interface CardFrontProps {
  cardImage?: string;
  cardValue?: number;
  className?: string;
}

export default function CardFront({
  cardImage,
  cardValue,
  className = "",
}: CardFrontProps) {
  return (
    <div
      className={`card-front w-full h-full relative bg-white rounded-lg shadow-md ${className}`}
    >
      {cardImage ? (
        <>
          <img
            src={cardImage}
            alt="Character"
            className="character absolute w-full h-full object-cover rounded-lg"
          />
          {cardValue !== undefined && (
            <div className="value absolute bottom-1 left-1 right-1 text-center p-1 text-xs font-bold text-gray-500 bg-white bg-opacity-80 rounded">
              {cardValue}
            </div>
          )}
        </>
      ) : (
        <div className="noSpecialCard w-full h-full flex justify-center items-center">
          <span className="background-circle w-12 h-8 border-2 border-gray-300 rounded-full flex justify-center items-center bg-transparent">
            <div className="noSpecialCard-value text-lg font-bold text-gray-500">
              {cardValue}
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
