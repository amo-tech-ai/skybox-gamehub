import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VideoIntroSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="animate-fade-in space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to Skybox Medellín
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Experience the city's premier rooftop sports bar — where friends, food, and live games come together.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                From epic game nights to rooftop celebrations, Skybox is where Medellín comes alive. Catch every moment with great food, crafted cocktails, and unbeatable views.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link to="/reserve" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all">
                  Reserve Your Table
                </Button>
              </Link>
              <a href="https://wa.me/573014673039" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,45%)] text-white shadow-lg hover:shadow-xl transition-all">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Video Column */}
          <div className="animate-fade-in order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-secondary/20 to-primary/20 p-1">
              <div className="bg-card rounded-lg overflow-hidden">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dqnnl0eny&public_id=Skybox_el_rooftop_m%C3%A1s_TOP_y_emocionante_de_Medellin_aqu%C3%AD_en_Laureles_ya_est%C3%A1_aqu%C3%AD_par_kjpqo9&profile=cld-looping"
                  width="640"
                  height="360"
                  style={{ height: "auto", width: "100%", aspectRatio: "9 / 16" }}
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="Skybox Medellín rooftop experience - vibrant sports bar atmosphere"
                  className="w-full"
                  loading="lazy"
                  aria-label="Video showcasing Skybox Medellín rooftop sports bar atmosphere"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntroSection;
