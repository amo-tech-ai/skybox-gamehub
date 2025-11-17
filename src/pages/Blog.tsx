import { Helmet } from "react-helmet-async";
import { blogArticles, getBlogCategories } from "@/data/blogArticles";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", ...getBlogCategories()];

  const filteredArticles = selectedCategory === "All" 
    ? blogArticles 
    : blogArticles.filter(article => article.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Blog - Skybox Medellín | Sports Entertainment & Game Day Guides</title>
        <meta 
          name="description" 
          content="Read the latest articles about sports entertainment, watch parties, game day food, and the Medellín sports scene at Skybox." 
        />
        <link rel="canonical" href="https://skyboxmedellin.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog - Skybox Medellín" />
        <meta property="og:description" content="Read the latest articles about sports entertainment, watch parties, game day food, and the Medellín sports scene." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyboxmedellin.com/blog" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Skybox Medellín" />
        <meta name="twitter:description" content="Read the latest articles about sports entertainment and game day guides." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Skybox Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                Your guide to sports entertainment, game day tips, and the best of Medellín's sports scene
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
