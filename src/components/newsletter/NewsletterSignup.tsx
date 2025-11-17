import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

const newsletterSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 digits").regex(/^[+]?[\d\s-()]+$/, "Invalid phone number format"),
  consent: z.boolean().refine((val) => val === true, "You must agree to receive communications"),
});

interface NewsletterSignupProps {
  source?: string;
  variant?: "default" | "compact";
}

export const NewsletterSignup = ({ source = "blog", variant = "default" }: NewsletterSignupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate input
      const validatedData = newsletterSchema.parse(formData);

      // Insert into database
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          source,
          status: "pending",
        });

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      // Success
      toast({
        title: "Successfully subscribed!",
        description: "Check your WhatsApp for a confirmation message.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        consent: false,
      });

      // Call edge function to send WhatsApp confirmation
      // This is optional - can be done in background
      try {
        await supabase.functions.invoke("newsletter-confirmation", {
          body: {
            name: validatedData.name,
            phone: validatedData.phone,
          },
        });
      } catch (error) {
        console.error("Failed to send WhatsApp confirmation:", error);
        // Don't show error to user - subscription was successful
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Newsletter subscription error:", error);
        toast({
          title: "Subscription failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} className="shrink-0">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id={`consent-${variant}`}
            checked={formData.consent}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, consent: checked as boolean })
            }
            required
            disabled={isLoading}
          />
          <label
            htmlFor={`consent-${variant}`}
            className="text-xs text-muted-foreground leading-tight cursor-pointer"
          >
            I agree to receive marketing communications via WhatsApp and email
          </label>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">WhatsApp Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+57 300 123 4567"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Include country code (e.g., +57 for Colombia)
        </p>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, consent: checked as boolean })
          }
          required
          disabled={isLoading}
        />
        <label
          htmlFor="consent"
          className="text-sm text-muted-foreground leading-tight cursor-pointer"
        >
          I agree to receive marketing communications via WhatsApp and email. I
          understand I can unsubscribe at any time.
        </label>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Subscribing...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Subscribe to Newsletter
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We respect your privacy. Your information is safe with us.
      </p>
    </form>
  );
};
