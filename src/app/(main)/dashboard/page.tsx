import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star
} from "lucide-react";
import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { destinations, groups, mainUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserAvatar({ user, className }: { user: { avatarUrl: string, name: string }, className?: string }) {
  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('');
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          <Balancer>Welcome back, {mainUser.name.split(" ")[0]}!</Balancer>
        </h1>
        <p className="text-muted-foreground mt-2">
          Ready for your next adventure? Let&apos;s explore.
        </p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-headline font-semibold">
            Featured Destinations
          </h2>
          <Button variant="link" asChild>
            <Link href="/destinations">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 3).map((destination) => (
            <Card key={destination.id} className="overflow-hidden">
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
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>{destination.rating}</span>
                  <span>({destination.reviews} reviews)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-headline font-semibold">Your Groups</h2>
          <Button variant="link" asChild>
            <Link href="/groups">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">{group.name}</CardTitle>
                <CardDescription>{group.travelDates}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {group.members.map((member) => (
                     <UserAvatar key={member.id} user={member} className="h-8 w-8 border-2 border-card"/>
                  ))}
                </div>
                <Button asChild size="sm">
                  <Link href={`/groups/${group.id}`}>View Group</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
