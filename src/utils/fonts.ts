import { Fira_Code, Open_Sans } from 'next/font/google';
export const firaCode = Fira_Code({ subsets: ['latin'] });
export const openSans = Open_Sans({ subsets: ['latin'] });
export const withFiraCode = (className: string): string => `${className} ${firaCode.className}`;
export const withOpenSans = (className: string): string => `${className} ${openSans.className}`;