"use client"

import { Star } from "lucide-react"

type StarRatingProps = {
  value: number;
  maxRating: number;
  onRate: (rating: number) => void;
  displayType?: "star" | "number";
}

const StarRating = ({ value, maxRating, onRate, displayType = "star" }: StarRatingProps) => {
    return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`
            min-w-[40px]
            min-h-[40px]
            p-2
            rounded-full 
            bg-muted
            hover:bg-primary
            hover:text-primary-foreground 
            transition-all transform hover:scale-110
            ${value >= star ? "bg-primary text-primary-foreground" : "fill-muted text-muted-foreground"}
          `}
        >
          {displayType === "number" ? star : <Star className="w-6 h-6" />}
        </button>
      ))}
    </div>
  )
}

export default StarRating
