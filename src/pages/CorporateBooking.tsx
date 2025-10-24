import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type BookingStep = 1 | 2 | 3 | 4;

interface BookingFormData {
  // Step 1: Contact Information
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  contactMethod: string;

  // Step 2: Event Details
  eventType: string;
  eventDate: Date | undefined;
  startTime: string;
  endTime: string;
  guestCount: string;

  // Step 3: Packages & Preferences
  venueArea: string;
  foodBeverage: string[];
  addOns: string[];
  budgetRange: string;
  specialRequirements: string;
}

const CorporateBooking = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    contactMethod: "",
    eventType: "",
    eventDate: undefined,
    startTime: "",
    endTime: "",
    guestCount: "",
    venueArea: "",
    foodBeverage: [],
    addOns: [],
    budgetRange: "",
    specialRequirements: "",
  });

  const updateFormData = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    const message = `🎉 *New Corporate Event Request*

📋 *Contact Information*
Name: ${formData.fullName}
Company: ${formData.companyName}
Phone: ${formData.phone}
Email: ${formData.email}
Contact: ${formData.contactMethod}

📅 *Event Details*
Type: ${formData.eventType}
Date: ${formData.eventDate ? format(formData.eventDate, "PPP") : "Not selected"}
Time: ${formData.startTime} - ${formData.endTime}
Guests: ${formData.guestCount}

🏢 *Venue & Preferences*
Area: ${formData.venueArea}
Food/Beverage: ${formData.foodBeverage.join(", ")}
Add-ons: ${formData.addOns.join(", ")}
Budget: ${formData.budgetRange}

📝 *Special Requirements*
${formData.specialRequirements || "None"}`;

    const whatsappUrl = `https://wa.me/573012345678?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Request sent! We'll contact you within 24 hours.");
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="w-full bg-muted h-2 sticky top-0 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentStep === 1 && "Let's Start Planning Your Event"}
            {currentStep === 2 && "Event Details"}
            {currentStep === 3 && "Customize Your Event Experience"}
            {currentStep === 4 && "Review & Submit"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {currentStep === 1 && "Tell us who to contact and how we can reach you."}
            {currentStep === 2 && "Tell us when and what you're celebrating."}
            {currentStep === 3 && "Select your ideal space, food, and extras."}
            {currentStep === 4 && "Confirm your details before submission."}
          </p>
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all",
                  currentStep === step
                    ? "bg-primary text-primary-foreground scale-110"
                    : currentStep > step
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step ? <Check className="w-6 h-6" /> : step}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company / Group Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
              <Select
                value={formData.contactMethod}
                onValueChange={(value) => updateFormData("contactMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type *</Label>
              <Select
                value={formData.eventType}
                onValueChange={(value) => updateFormData("eventType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="birthday">Birthday Celebration</SelectItem>
                  <SelectItem value="team">Team Gathering</SelectItem>
                  <SelectItem value="watch-party">Watch Party</SelectItem>
                  <SelectItem value="launch">Product Launch</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.eventDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.eventDate ? (
                      format(formData.eventDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.eventDate}
                    onSelect={(date) => updateFormData("eventDate", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateFormData("startTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateFormData("endTime", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestCount">Number of Guests *</Label>
              <Select
                value={formData.guestCount}
                onValueChange={(value) => updateFormData("guestCount", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select guest count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-20">10-20 guests</SelectItem>
                  <SelectItem value="20-40">20-40 guests</SelectItem>
                  <SelectItem value="40-60">40-60 guests</SelectItem>
                  <SelectItem value="60-100">60-100 guests</SelectItem>
                  <SelectItem value="100+">100+ guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Packages & Preferences */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            {/* Venue Area Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Venue Area *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: "rooftop", label: "Rooftop Terrace", capacity: "Up to 100" },
                  { value: "vip", label: "VIP Lounge", capacity: "Up to 40" },
                  { value: "main", label: "Main Hall", capacity: "Up to 150" },
                  { value: "private", label: "Private Room", capacity: "Up to 30" },
                ].map((area) => (
                  <button
                    key={area.value}
                    onClick={() => updateFormData("venueArea", area.value)}
                    className={cn(
                      "p-4 border-2 rounded-lg text-left transition-all hover-lift",
                      formData.venueArea === area.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <h3 className="font-semibold text-lg">{area.label}</h3>
                    <p className="text-sm text-muted-foreground">{area.capacity}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Food & Beverage */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Food & Beverage Preferences</Label>
              <div className="space-y-3">
                {[
                  { value: "a-la-carte", label: "À La Carte Menu" },
                  { value: "buffet", label: "Buffet Style" },
                  { value: "open-bar", label: "Open Bar Package" },
                  { value: "custom", label: "Custom Menu" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={formData.foodBeverage.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData("foodBeverage", [
                            ...formData.foodBeverage,
                            option.value,
                          ]);
                        } else {
                          updateFormData(
                            "foodBeverage",
                            formData.foodBeverage.filter((v) => v !== option.value)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={option.value} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-Ons */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Add-Ons & Enhancements</Label>
              <div className="space-y-3">
                {[
                  { value: "projector", label: "Projector Setup" },
                  { value: "dj", label: "DJ Booth" },
                  { value: "branding", label: "Team Branding" },
                  { value: "bartender", label: "Private Bartender" },
                ].map((addon) => (
                  <div key={addon.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={addon.value}
                      checked={formData.addOns.includes(addon.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData("addOns", [...formData.addOns, addon.value]);
                        } else {
                          updateFormData(
                            "addOns",
                            formData.addOns.filter((v) => v !== addon.value)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={addon.value} className="cursor-pointer">
                      {addon.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="budgetRange">Budget Range *</Label>
              <Select
                value={formData.budgetRange}
                onValueChange={(value) => updateFormData("budgetRange", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500">Under $500 USD</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000 USD</SelectItem>
                  <SelectItem value="1000-2000">$1,000 - $2,000 USD</SelectItem>
                  <SelectItem value="2000+">$2,000+ USD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Special Requirements */}
            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Any special decoration, AV setup, or custom theme requirements..."
                rows={4}
                value={formData.specialRequirements}
                onChange={(e) => updateFormData("specialRequirements", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-card p-6 rounded-lg border-2 border-border space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center justify-between">
                  Contact Information
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                    Edit
                  </Button>
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                  <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Contact Method:</span> {formData.contactMethod}</p>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center justify-between">
                  Event Details
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                    Edit
                  </Button>
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Type:</span> {formData.eventType}</p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formData.eventDate ? format(formData.eventDate, "PPP") : "Not selected"}
                  </p>
                  <p><span className="font-medium">Time:</span> {formData.startTime} - {formData.endTime}</p>
                  <p><span className="font-medium">Guests:</span> {formData.guestCount}</p>
                </div>
              </div>

              {/* Venue & Preferences */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center justify-between">
                  Venue & Preferences
                  <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>
                    Edit
                  </Button>
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Venue Area:</span> {formData.venueArea}</p>
                  <p>
                    <span className="font-medium">Food/Beverage:</span>{" "}
                    {formData.foodBeverage.join(", ") || "None"}
                  </p>
                  <p>
                    <span className="font-medium">Add-ons:</span>{" "}
                    {formData.addOns.join(", ") || "None"}
                  </p>
                  <p><span className="font-medium">Budget:</span> {formData.budgetRange}</p>
                  {formData.specialRequirements && (
                    <p>
                      <span className="font-medium">Special Requirements:</span>{" "}
                      {formData.specialRequirements}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-center">
                Our Events Team will review your request and contact you within 24 hours to
                finalize your booking.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          )}
          {currentStep < 4 ? (
            <Button onClick={handleNext} size="lg" className="ml-auto">
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} size="lg" className="ml-auto bg-whatsapp hover:bg-whatsapp/90">
              <Check className="mr-2 h-5 w-5" />
              Request Quote via WhatsApp
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateBooking;
