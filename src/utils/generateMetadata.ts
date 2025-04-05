import { Metadata } from "next";

export const generateMetadata = (title: string, description: string ): Metadata => ({
    title: `Yargo | ${title}`,
    description,
  });
  