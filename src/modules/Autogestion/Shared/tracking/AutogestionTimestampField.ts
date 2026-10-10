export const autogestionTimestampFields = [
  'lastReservationStartedAt',
  'lastPayPopupOpenedAt',
  'lastCartReachedAt',
] as const;

export type AutogestionTimestampField =
  (typeof autogestionTimestampFields)[number];
