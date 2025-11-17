import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogArticleBySlug, blogArticles } from "@/data/blogArticles";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShareButton from "@/components/events/ShareButton";
import { Card } from "@/components/ui/card";
import { generateArticleStructuredData } from "@/utils/structuredData";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  // Get related articles (same category, excluding current)
  const relatedArticles = article
    ? blogArticles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3)
    : [];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Article Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const articleUrl = `https://skyboxmedellin.com/blog/${article.slug}`;
  const structuredData = generateArticleStructuredData(article);

  return (
    <>
      <Helmet>
        <title>{article.title} - Skybox Medellín Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={articleUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={article.image} />
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:author" content={article.author.name} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.image} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article className="min-h-screen bg-background">
        {/* Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="container">
              <Link to="/blog">
                <Button variant="ghost" className="mb-4 gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
              {article.category}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <ShareButton
                title={article.title}
                description={article.excerpt}
                url={articleUrl}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .split("\n")
                    .map((line) => {
                      if (line.startsWith("# ")) {
                        return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h1>`;
                      }
                      if (line.startsWith("## ")) {
                        return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.slice(3)}</h2>`;
                      }
                      if (line.startsWith("### ")) {
                        return `<h3 class="text-xl font-semibold mt-4 mb-2">${line.slice(4)}</h3>`;
                      }
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return `<p class="font-bold mt-4">${line.slice(2, -2)}</p>`;
                      }
                      if (line.startsWith("- ")) {
                        return `<li class="ml-6">${line.slice(2)}</li>`;
                      }
                      if (line.trim() === "") {
                        return "<br />";
                      }
                      return `<p class="mb-4 leading-relaxed">${line}</p>`;
                    })
                    .join(""),
                }}
              />
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-accent/10 rounded-lg text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Experience It Yourself?</h3>
              <p className="text-muted-foreground">
                Join us at Skybox Medellín for the ultimate sports entertainment experience.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/events">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    View Upcoming Events
                  </Button>
                </Link>
                <Link to="/reserve">
                  <Button size="lg" variant="outline">
                    Reserve a Table
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} to={`/blog/${relatedArticle.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 bg-accent/90">
                          {relatedArticle.category}
                        </Badge>
                        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default BlogDetail;
