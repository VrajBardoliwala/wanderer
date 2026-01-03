import Image from "next/image";
import {
  Search,
  Star
} from "lucide-react";
import Balancer from "react-wrap-balancer";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { destinations } from "@/lib/data";

export default function DestinationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          <Balancer>Discover Your Next Destination</Balancer>
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore breathtaking places around the world.
        </p>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for a city or country..." className="pl-10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {destinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={destination.imageHint}
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-headline">{destination.name}</CardTitle>
              <CardDescription className="mt-1">{destination.country}</CardDescription>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                {destination.description}
              </p>
              <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>{destination.rating}</span>
                <span className="text-xs">({destination.reviews} reviews)</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
