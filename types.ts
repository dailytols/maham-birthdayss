
export enum PageState {
  PASSWORD = 'PASSWORD',
  GAME = 'GAME',
  WELCOME = 'WELCOME',
  TIMELINE = 'TIMELINE',
  QUESTION = 'QUESTION',
  LETTER = 'LETTER',
  FINAL = 'FINAL'
}

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const MEMORIES: Memory[] = [
  { 
    id: 1, 
    date: "The Beginning", 
    title: "Iconic Duo", 
    description: "The start of a friendship that no one saw coming but everyone envies.", 
    imageUrl: "https://i.supaimg.com/53ef9cc9-c649-4e89-9da8-b1d0db46fdee.jpg" 
  },
  { 
    id: 2, 
    date: "Fun Times", 
    title: "Unfiltered Laughs", 
    description: "Smiling because we have no idea what's going on, but we're doing it together.", 
    imageUrl: "https://i.supaimg.com/a6c573c6-e478-48e2-aef5-02529e56e7f2.jpg" 
  },
  { 
    id: 3, 
    date: "Adventures", 
    title: "Main Character Energy", 
    description: "Just two besties taking on the world, one aesthetic photo at a time.", 
    imageUrl: "https://i.supaimg.com/82edb476-3175-4962-b271-f67db9e05ea9.jpg" 
  },
  { 
    id: 4, 
    date: "Crazy Moments", 
    title: "Partners in Crime", 
    description: "If we get in trouble, I'm blaming you (but I'm still coming with you).", 
    imageUrl: "https://i.supaimg.com/32c8046b-36e5-43c9-aa82-990a8c86abbe.jpg" 
  },
  { 
    id: 5, 
    date: "Vibes", 
    title: "Pure Happiness", 
    description: "Life is just better when you are around to annoy me.", 
    imageUrl: "https://i.supaimg.com/38ecc8a0-d9b7-4866-bb6b-e861d0223f98.jpg" 
  },
  { 
    id: 6, 
    date: "Gossip Sesh", 
    title: "Tea Time ☕", 
    description: "Spilling the tea is our favorite cardio workout.", 
    imageUrl: "https://i.supaimg.com/5bd96460-863d-4706-b151-63ccb25b91ec.png" 
  },
  { 
    id: 7, 
    date: "Slaying", 
    title: "Queens Only", 
    description: "Fixing each other's crowns since day one.", 
    imageUrl: "https://i.supaimg.com/26b63449-2f91-4736-bf01-9ee0370b510b.png" 
  },
  { 
    id: 8, 
    date: "Support System", 
    title: "Always There", 
    description: "Through every high and low, you're my rock.", 
    imageUrl: "https://i.supaimg.com/6f15315e-7e90-487a-b08b-0bc87dffe305.png" 
  },
  { 
    id: 9, 
    date: "Celebration", 
    title: "Happy Birthday!", 
    description: "To the best human I know. You deserve the world!", 
    imageUrl: "https://i.supaimg.com/8d2b4c85-7eae-43ae-b430-0251bd2ed867.png" 
  },
  { 
    id: 10, 
    date: "Stunning", 
    title: "Golden Hour", 
    description: "We don't chase the spotlight, the spotlight finds us.", 
    imageUrl: "https://i.supaimg.com/9c723856-bda9-48e6-8d41-7affc5669870.jpg" 
  },
  { 
    id: 11, 
    date: "Memories", 
    title: "Unforgettable", 
    description: "Collecting moments and inside jokes that only we understand.", 
    imageUrl: "https://i.supaimg.com/fcb871f9-f033-4259-b065-4cdd83b791e9.jpg" 
  },
  { 
    id: 12, 
    date: "Forever", 
    title: "Better Together", 
    description: "Here's to a lifetime of adventures and bad decisions!", 
    imageUrl: "https://i.supaimg.com/40db6dda-56fc-4969-9c27-437c6292a98f.jpg" 
  }
];