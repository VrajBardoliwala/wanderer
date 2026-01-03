"use client";

import React, { useState } from "react";
import {
  Paperclip,
  Send,
  Calendar as CalendarIcon,
  Bell,
  Sparkles,
  Loader2,
  DollarSign,
  ClipboardList
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { groups, chatMessages as initialChatMessages, type ChatMessage } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { summarizeGroupTravelPreferences } from "@/ai/flows/summarize-group-travel-preferences";
import { generateItinerarySuggestions } from "@/ai/flows/generate-itinerary-suggestions";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

function UserAvatar({ user, className }: { user: { name: string, avatarUrl: string }, className?: string }) {
  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('');
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const group = groups.find((g) => g.id === params.id);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isItineraryLoading, setIsItineraryLoading] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [budget, setBudget] = useState<number>(3000);

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      user: { name: "You", avatarUrl: "" },
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage("");
  };

  const handleSummarize = async () => {
    setIsSummaryLoading(true);
    setSummary("");
    try {
      const chatHistory = chatMessages.map(m => `${m.user.name}: ${m.message}`).join('\n');
      const result = await summarizeGroupTravelPreferences({ chatHistory });
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to summarize preferences:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate summary. Please try again.",
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsItineraryLoading(true);
    setItinerary("");
    try {
        const travelDates = date?.from && date?.to ? `${format(date.from, "LLL dd, y")} to ${format(date.to, "LLL dd, y")}` : group.travelDates;
        const result = await generateItinerarySuggestions({
            destination: group.destination,
            travelDates: travelDates,
            budget: budget,
            groupPreferences: summary || "A mix of adventure, hiking, relaxation, and cultural experiences."
        });
        setItinerary(result.itinerarySuggestions);
    } catch (error) {
        console.error("Failed to generate itinerary:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not generate itinerary. Please try again.",
        });
    } finally {
        setIsItineraryLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full max-h-[calc(100vh-8rem)]">
      {/* Chat Column */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Group Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-grow h-0 pr-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <UserAvatar user={msg.user} className="h-8 w-8" />
                  <div className="flex-1 bg-muted rounded-lg p-3">
                    <div className="flex items-baseline justify-between">
                      <p className="font-semibold text-sm">{msg.user.name}</p>
                      <time className="text-xs text-muted-foreground">{msg.timestamp}</time>
                    </div>
                    <p className="text-sm mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2 p-2 border-t">
            <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Planning & Itinerary Column */}
      <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
        <ScrollArea className="h-full">
        <div className="space-y-6 pr-4">
          {/* Group Header */}
          <header>
            <h1 className="text-3xl font-headline font-bold">{group.name}</h1>
            <p className="text-muted-foreground">{group.destination} | {group.travelDates}</p>
            <div className="flex -space-x-2 overflow-hidden mt-2">
                {group.members.map((member) => (
                  <UserAvatar key={member.id} user={member} className="h-10 w-10 border-2 border-background" />
                ))}
            </div>
          </header>

          {/* Planning Tools */}
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center justify-between">
                    <span>Travel Plan</span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Reminder Set!", description: "We'll notify you about your trip." })}>
                            <Bell className="mr-2 h-4 w-4"/> Set Reminder
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleGenerateItinerary} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Travel Dates</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground" )}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                        <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>
                                        ) : (format(date.from, "LLL dd, y"))
                                    ) : (<span>Pick a date</span>)}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
                                </PopoverContent>
                            </Popover>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="budget">Budget (USD)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="budget" type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="pl-8" />
                            </div>
                        </div>
                    </div>

                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between">
                                Group Preferences
                                <Button type="button" size="sm" variant="ghost" onClick={handleSummarize} disabled={isSummaryLoading}>
                                    {isSummaryLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="mr-2 h-4 w-4" />
                                    )}
                                    Summarize with AI
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             {isSummaryLoading ? (
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted-foreground/10 rounded w-full animate-pulse"></div>
                                    <div className="h-4 bg-muted-foreground/10 rounded w-5/6 animate-pulse"></div>
                                </div>
                            ) : summary ? (
                                <p className="text-sm text-muted-foreground">{summary}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">Click 'Summarize with AI' to analyze the chat and identify key preferences.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full" disabled={isItineraryLoading}>
                        {isItineraryLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                            <><ClipboardList className="mr-2 h-4 w-4" /> Generate Itinerary Suggestions</>
                        )}
                    </Button>
                </form>
            </CardContent>
          </Card>

          {/* Itinerary Display */}
          {(isItineraryLoading || itinerary) && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">AI Itinerary Suggestion</CardTitle>
                <CardDescription>A tailored plan based on your group's preferences.</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground prose-strong:text-foreground">
                {isItineraryLoading ? (
                  <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                          <div key={i}>
                              <div className="h-6 w-1/3 bg-muted-foreground/10 rounded animate-pulse mb-2"></div>
                              <div className="h-4 w-full bg-muted-foreground/10 rounded animate-pulse mb-1"></div>
                              <div className="h-4 w-5/6 bg-muted-foreground/10 rounded animate-pulse"></div>
                          </div>
                      ))}
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: itinerary.replace(/\n/g, '<br />') }} />
                )}
              </CardContent>
            </Card>
          )}
        </div>
        </ScrollArea>
      </div>
    </div>
  );
}
