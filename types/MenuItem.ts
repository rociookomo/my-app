// types/MenuItem.ts

export interface MenuItem {
    dishName: string;
    description: string;
    course: 'starter' | 'main' | 'dessert';
    price: number;
  }
  