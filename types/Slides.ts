import { StaticImageData } from "next/image";

export interface Slide {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}
