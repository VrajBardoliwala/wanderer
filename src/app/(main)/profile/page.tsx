import Image from "next/image";
import Balancer from "react-wrap-balancer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mainUser, destinations } from "@/lib/data";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Calendar, MapPin, UserPlus } from "lucide-react";

const profileCover = placeHolderImages.find((p) => p.id === 'profile-cover');
const photoGallery = placeHolderImages.filter((p) => p.id.startsWith('photo-gallery-'));

function UserAvatar({ user, className }: { user: { avatarUrl: string, name: string }, className?: string }) {
  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('');
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          {profileCover && (
            <Image
              src={profileCover.imageUrl}
              alt={profileCover.description}
              fill
              className="object-cover"
              data-ai-hint={profileCover.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="p-6">
          <div className="relative flex flex-col sm:flex-row gap-6">
            <div className="-mt-24">
              <UserAvatar user={mainUser} className="w-32 h-32 border-4 border-card" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-2xl md:text-3xl font-headline font-bold">
                  {mainUser.name}
                </h1>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Follow
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">{mainUser.bio}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="trips">My Trips</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-headline font-semibold mb-4">Travel Style</h3>
              <div className="flex flex-wrap gap-2">
                {mainUser.travelStyle.map(style => (
                  <Badge key={style} variant="secondary" className="text-sm">{style}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-headline font-semibold">Past Adventures</h3>
              {mainUser.pastTrips.map(trip => (
                <div key={trip.destination} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4 text-primary"/>{trip.destination}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {trip.year}
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoGallery.map(photo => (
              <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={photo.imageUrl}
                  alt={photo.description}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={photo.imageHint}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
