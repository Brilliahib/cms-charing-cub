import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <Star
            key={`full-${index}`}
            className="h-4 w-4 text-yellow-500"
            fill="currentColor"
          />
        ))}
      {halfStar && (
        <Star
          className="h-4 w-4 text-yellow-500 opacity-50"
          fill="currentColor"
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star
            key={`empty-${index}`}
            className="h-4 w-4 text-gray-300"
            fill="currentColor"
          />
        ))}
    </div>
  );
};

export default RatingStars;
