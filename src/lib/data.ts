import { placeHolderImages } from "./placeholder-images";

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  travelStyle: string[];
  pastTrips: { destination: string; year: number }[];
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  reviews: number;
  rating: number;
};

export type Group = {
  id: string;
  name: string;
  destination: string;
  travelDates: string;
  members: User[];
  description: string;
};

export type ChatMessage = {
  id: string;
  user: Pick<User, 'name' | 'avatarUrl'>;
  message: string;
  timestamp: string;
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alex Novak',
    avatarUrl: placeHolderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
    bio: 'Adventure seeker and photographer. I love exploring remote landscapes and capturing the beauty of the world. My goal is to visit every continent.',
    travelStyle: ['Adventure', 'Photography', 'Hiking', 'Culture'],
    pastTrips: [
      { destination: 'Patagonia, Argentina', year: 2023 },
      { destination: 'Kyoto, Japan', year: 2022 },
      { destination: 'Serengeti, Tanzania', year: 2021 },
    ],
  },
  {
    id: 'user-2',
    name: 'Maria Garcia',
    avatarUrl: placeHolderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
    bio: 'Foodie and history buff. I travel to eat and learn. My perfect trip involves exploring ancient ruins followed by a delicious local meal.',
    travelStyle: ['Food', 'History', 'Museums', 'City Tours'],
    pastTrips: [
      { destination: 'Rome, Italy', year: 2023 },
      { destination: 'Cairo, Egypt', year: 2022 },
    ],
  },
  {
    id: 'user-3',
    name: 'Chen Wei',
    avatarUrl: placeHolderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '',
    bio: 'Digital nomad and cafe connoisseur. I enjoy working from scenic locations and finding the best coffee shops around the world.',
    travelStyle: ['Digital Nomad', 'Cafes', 'Co-working', 'Relaxation'],
    pastTrips: [
      { destination: 'Santorini, Greece', year: 2023 },
    ],
  },
    {
    id: 'user-4',
    name: 'Samira Khan',
    avatarUrl: placeHolderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '',
    bio: 'Beach lover and relaxation expert. Give me a good book and a sandy shore, and I\'m happy. Always looking for the next paradise island.',
    travelStyle: ['Beach', 'Relaxation', 'Snorkeling', 'Resorts'],
    pastTrips: [
      { destination: 'Maldives', year: 2023 },
      { destination: 'Bali, Indonesia', year: 2022 },
    ],
  },
];

export const destinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Kyoto',
    country: 'Japan',
    description: 'A city of ancient temples, serene gardens, and traditional geishas. Experience the heart of old Japan.',
    imageUrl: placeHolderImages.find(p => p.id === 'destination-kyoto')?.imageUrl || '',
    imageHint: 'japan temple',
    reviews: 1420,
    rating: 4.9,
  },
  {
    id: 'dest-2',
    name: 'Patagonia',
    country: 'Argentina/Chile',
    description: 'Witness the raw, untamed beauty of jagged mountains, vast glaciers, and stunning turquoise lakes.',
    imageUrl: placeHolderImages.find(p => p.id === 'destination-patagonia')?.imageUrl || '',
    imageHint: 'patagonia mountains',
    reviews: 985,
    rating: 4.9,
  },
  {
    id: 'dest-3',
    name: 'Santorini',
    country: 'Greece',
    description: 'Famous for its dramatic views, stunning sunsets from Oia town, and the iconic white-washed buildings.',
    imageUrl: placeHolderImages.find(p => p.id === 'destination-santorini')?.imageUrl || '',
    imageHint: 'santorini greece',
    reviews: 2150,
    rating: 4.8,
  },
  {
    id: 'dest-4',
    name: 'Serengeti National Park',
    country: 'Tanzania',
    description: 'Home to the Great Migration, this park offers some of the most breathtaking wildlife viewing in Africa.',
    imageUrl: placeHolderImages.find(p => p.id === 'destination-serengeti')?.imageUrl || '',
    imageHint: 'serengeti tanzania',
    reviews: 760,
    rating: 4.9,
  },
  {
    id: 'dest-5',
    name: 'Cairo',
    country: 'Egypt',
    description: 'Explore the millennia-old history of the Pyramids of Giza and the bustling Khan el-Khalili bazaar.',
    imageUrl: placeHolderImages.find(p => p.id === 'destination-cairo')?.imageUrl || '',
    imageHint: 'egypt pyramids',
    reviews: 1120,
    rating: 4.6,
  },
  {
    id: 'dest-6',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City, where ancient history, art, and vibrant street life come together in a stunning display.',
    imageUrl: placeHolderImages.find(p => p.id === 'destination-rome')?.imageUrl || '',
    imageHint: 'rome colosseum',
    reviews: 3200,
    rating: 4.8,
  },
];

export const groups: Group[] = [
  {
    id: 'group-1',
    name: 'Andes Adventure Squad',
    destination: 'Patagonia',
    travelDates: 'Dec 15-30, 2024',
    members: [users[0], users[2]],
    description: 'A group for experienced hikers looking to tackle the W-Trek in Torres del Paine and explore the stunning landscapes of Patagonia.',
  },
  {
    id: 'group-2',
    name: 'Italian Food & History Tour',
    destination: 'Rome',
    travelDates: 'Sep 1-10, 2024',
    members: [users[1], users[3]],
    description: 'Join us as we eat our way through Rome, exploring ancient sites and learning to make pasta from scratch.',
  },
  {
    id: 'group-3',
    name: 'Zen Gardens & Temples',
    destination: 'Kyoto',
    travelDates: 'Oct 20-30, 2024',
    members: [users[0], users[1], users[2], users[3]],
    description: 'A relaxed-pace trip to discover the most beautiful temples and gardens of Kyoto during the autumn foliage season.',
  },
];

export const chatMessages: ChatMessage[] = [
    {
        id: 'msg-1',
        user: { name: users[0].name, avatarUrl: users[0].avatarUrl },
        message: 'Hey everyone! So excited for this Patagonia trip. I was thinking we should definitely prioritize hiking.',
        timestamp: '10:30 AM',
    },
    {
        id: 'msg-2',
        user: { name: users[2].name, avatarUrl: users[2].avatarUrl },
        message: 'Agreed on the hiking! But I also want to make sure we have some downtime. Maybe a day or two in El Chaltén to just relax and enjoy the views?',
        timestamp: '10:32 AM',
    },
    {
        id: 'msg-3',
        user: { name: users[0].name, avatarUrl: users[0].avatarUrl },
        message: 'Good point. My budget is around $3000 for the two weeks, not including flights. How about you?',
        timestamp: '10:35 AM',
    },
    {
        id: 'msg-4',
        user: { name: users[2].name, avatarUrl: users[2].avatarUrl },
        message: 'That sounds reasonable. I\'m in the same ballpark, maybe up to $3500. I\'m more into unique guesthouses than fancy hotels.',
        timestamp: '10:38 AM',
    },
    {
        id: 'msg-5',
        user: { name: users[0].name, avatarUrl: users[0].avatarUrl },
        message: 'Perfect. Me too. Let\'s prioritize amazing experiences over luxury accommodation. I really want to do some ice trekking on Perito Moreno Glacier.',
        timestamp: '10:40 AM',
    },
    {
        id: 'msg-6',
        user: { name: users[2].name, avatarUrl: users[2].avatarUrl },
        message: 'Ice trekking sounds incredible! Count me in. I also saw some cool kayaking tours near the glaciers. We should look into that.',
        timestamp: '10:45 AM',
    }
];

export const mainUser = users[0];
