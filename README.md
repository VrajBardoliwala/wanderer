# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
A social platform for solo travelers to connect, make friends, chat in groups, and decide destinations and budgets together — without bookings or payments.

Problem Statement:
Solo travelers often struggle to find trusted companions with similar travel interests, destinations, and budgets. Planning trips through scattered chats leads to confusion and poor coordination.

Solution:
This platform provides a centralized travel community where users can:
Join or create travel groups
Chat with like-minded travelers
Collaboratively decide destination and budget
Use AI to summarize group preferences and assist planning

System Architecture:
Frontend: Next.js 15, React, ShadCN UI, Tailwind CSS
Backend: Firebase Authentication & Firestore
AI Layer: Genkit + Google Gemini

Application Flow:
Login or continue as guest
View dashboard with groups & travelers
Join a group and start chatting
Discuss destination & budget
Use AI to summarize preferences
Finalize informal group travel plan

Tech Stack:
Framework: Next.js 15 (App Router)
UI: React, ShadCN Ui
Styling: Tailwind CSS
Database: Firebase Firestore
Auth: Firebase Anonymous Authentication
AI: Genkit, Google Gemini
