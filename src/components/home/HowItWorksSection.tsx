import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Compass, Calendar, MapPin } from "lucide-react";

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Tour",
    description: "Browse our curated selection of amazing tours worldwide",
    icon: Compass,
  },
  {
    step: "02",
    title: "Book Online",
    description: "Secure your spot with our easy payment system",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Start Adventure",
    description: "Pack your bags and get ready for an unforgettable experience",
    icon: MapPin,
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to start your adventure with Natours
          </p>
          <Separator className="w-20 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((item, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-primary-100 transition-colors">
                  {item.step}
                </div>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
