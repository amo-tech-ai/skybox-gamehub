import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Rodriguez",
    text: "Best sports bar in Medellín! The rooftop views during game night are unbeatable.",
    rating: 5,
  },
  {
    name: "Maria Santos",
    text: "Amazing atmosphere, great food, and they show every major game. My go-to spot!",
    rating: 5,
  },
  {
    name: "John Mitchell",
    text: "The VIP rooftop experience is worth every peso. Professional service and incredible setup.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-2xl mx-auto">
      <Quote className="w-10 h-10 text-primary mb-4" />
      <div className="space-y-4 animate-fade-in" key={current}>
        <div className="flex gap-1 mb-2">
          {[...Array(testimonials[current].rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-lg italic text-foreground">
          "{testimonials[current].text}"
        </p>
        <p className="font-bold text-primary">— {testimonials[current].name}</p>
      </div>
      <div className="flex gap-2 justify-center mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? "bg-primary w-8" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;