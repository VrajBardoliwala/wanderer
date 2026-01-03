import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";
import Balancer from "react-wrap-balancer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { groups, type User } from "@/lib/data";

function UserAvatar({ user, className }: { user: User, className?: string }) {
  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('');
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

export default function GroupsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold">
            <Balancer>Find Your Travel Squad</Balancer>
          </h1>
          <p className="text-muted-foreground mt-2">
            Join a group of like-minded travelers or create your own.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Group
        </Button>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for groups by destination or interest..." className="pl-10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{group.name}</CardTitle>
              <CardDescription>
                {group.destination} &middot; {group.travelDates}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {group.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex -space-x-2 overflow-hidden">
                {group.members.map((member) => (
                  <UserAvatar key={member.id} user={member} className="h-8 w-8 border-2 border-card" />
                ))}
              </div>
              <Button asChild size="sm">
                <Link href={`/groups/${group.id}`}>View Group</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
