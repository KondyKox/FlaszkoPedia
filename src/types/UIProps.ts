export type EyeIconProps = {
  showPassword: boolean;
  togglePassword: () => void;
  className?: string;
};

export type RatingStarsProps = {
  averageRating: number;
  ratingsCount: number; // ile osób oceniło
  userRating?: number; // ocena zalogowanego usera
  editable?: boolean; // czy można klikać
  onRate?: (value: number) => Promise<void>; // callback do wystawienia oceny
};
