export const autogestionModuleNames = [
  'appointments',
  'purchase-zones',
  'confirm-reservation',
] as const;

export type AutogestionModuleName = (typeof autogestionModuleNames)[number];
