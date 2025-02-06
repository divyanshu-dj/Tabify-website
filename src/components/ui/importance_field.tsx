import { Star } from "lucide-react";
import { useState } from "react";

interface ImportanceProps {
    field: {
      value: number;
      onChange: (value: number) => void;
      name: string;
    };
    
}

const Importance = ({ field }: ImportanceProps) => {
  const [hoveredImportance, setHoveredImportance] = useState<number>(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => field.onChange(star)}
          onMouseEnter={() => setHoveredImportance(star)}
          onMouseLeave={() => setHoveredImportance(0)}
          className="focus:outline-none "
        >
          <Star
            size={24}
            className={`${
              star <= (hoveredImportance || field.value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default Importance;