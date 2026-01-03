'use server';
/**
 * @fileOverview Summarizes group travel preferences from chat history.
 *
 * - summarizeGroupTravelPreferences - A function that takes chat history and returns a summary of travel preferences.
 * - SummarizeGroupTravelPreferencesInput - The input type for the summarizeGroupTravelPreferences function.
 * - SummarizeGroupTravelPreferencesOutput - The return type for the summarizeGroupTravelPreferences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGroupTravelPreferencesInputSchema = z.object({
  chatHistory: z
    .string()
    .describe('The chat history of the travel group.'),
});
export type SummarizeGroupTravelPreferencesInput = z.infer<
  typeof SummarizeGroupTravelPreferencesInputSchema
>;

const SummarizeGroupTravelPreferencesOutputSchema = z.object({
  summary: z.string().describe('A summary of the group travel preferences.'),
});
export type SummarizeGroupTravelPreferencesOutput = z.infer<
  typeof SummarizeGroupTravelPreferencesOutputSchema
>;

export async function summarizeGroupTravelPreferences(
  input: SummarizeGroupTravelPreferencesInput
): Promise<SummarizeGroupTravelPreferencesOutput> {
  return summarizeGroupTravelPreferencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeGroupTravelPreferencesPrompt',
  input: {schema: SummarizeGroupTravelPreferencesInputSchema},
  output: {schema: SummarizeGroupTravelPreferencesOutputSchema},
  prompt: `You are a travel planning assistant. Summarize the following chat history to identify key travel preferences, including preferred activities, budget, and dates. Return the summary in a concise paragraph.\n\nChat History:\n{{{chatHistory}}}`,
});

const summarizeGroupTravelPreferencesFlow = ai.defineFlow(
  {
    name: 'summarizeGroupTravelPreferencesFlow',
    inputSchema: SummarizeGroupTravelPreferencesInputSchema,
    outputSchema: SummarizeGroupTravelPreferencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
