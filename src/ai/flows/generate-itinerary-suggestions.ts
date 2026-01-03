'use server';
/**
 * @fileOverview Itinerary suggestion AI agent.
 *
 * - generateItinerarySuggestions - A function that handles the itinerary suggestions.
 * - GenerateItinerarySuggestionsInput - The input type for the generateItinerarySuggestions function.
 * - GenerateItinerarySuggestionsOutput - The return type for the generateItinerarySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateItinerarySuggestionsInputSchema = z.object({
  destination: z.string().describe('The desired travel destination.'),
  travelDates: z.string().describe('The start and end dates for the trip.'),
  budget: z.number().describe('The budget for the trip in USD.'),
  groupPreferences: z
    .string()
    .describe('A description of the group interests and preferences.'),
});
export type GenerateItinerarySuggestionsInput = z.infer<
  typeof GenerateItinerarySuggestionsInputSchema
>;

const GenerateItinerarySuggestionsOutputSchema = z.object({
  itinerarySuggestions: z
    .string()
    .describe('A detailed itinerary suggestion based on the inputs.'),
});
export type GenerateItinerarySuggestionsOutput = z.infer<
  typeof GenerateItinerarySuggestionsOutputSchema
>;

export async function generateItinerarySuggestions(
  input: GenerateItinerarySuggestionsInput
): Promise<GenerateItinerarySuggestionsOutput> {
  return generateItinerarySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateItinerarySuggestionsPrompt',
  input: {schema: GenerateItinerarySuggestionsInputSchema},
  output: {schema: GenerateItinerarySuggestionsOutputSchema},
  prompt: `You are a travel expert. Generate an itinerary suggestion based on the following information:

Destination: {{{destination}}}
Travel Dates: {{{travelDates}}}
Budget: {{{budget}}}
Group Preferences: {{{groupPreferences}}}

Please provide a detailed itinerary that includes specific activities, estimated costs, and any relevant tips or recommendations.`,
});

const generateItinerarySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateItinerarySuggestionsFlow',
    inputSchema: GenerateItinerarySuggestionsInputSchema,
    outputSchema: GenerateItinerarySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
