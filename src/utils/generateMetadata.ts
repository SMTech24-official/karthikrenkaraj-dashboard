import { Metadata } from "next";

export const generateMetadata = (
  title: string,
  description: string
): Metadata => ({
  title: `Ubhayam | ${title}`,
  description,
});
