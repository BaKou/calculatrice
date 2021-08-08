import { CardType } from './card.type';

export interface CardResponseType {
    success: boolean;
    cards: CardType[];
    deck_id: string;
    remaining: number;
}