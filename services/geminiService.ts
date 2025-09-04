
import { GoogleGenAI, Type } from "@google/genai";
import { ContentItem, Ambiance, ContentType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const contentSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: 'The fictional title of the content.' },
      synopsis: { type: Type.STRING, description: 'A short, one-paragraph synopsis.' },
      year: { type: Type.INTEGER, description: 'The year of release, between 1990 and 2024.' },
      rating: { type: Type.NUMBER, description: 'A rating out of 10, with one decimal place.' },
      genres: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of 3-4 relevant genres.',
      },
      posterUrl: {
        type: Type.STRING,
        description: 'A URL for a poster image using picsum.photos with a resolution of 400x600. The URL should be exactly `https://picsum.photos/400/600?random=X` where X is a unique random integer for each item.',
      },
    },
    required: ['title', 'synopsis', 'year', 'rating', 'genres', 'posterUrl'],
  },
};

const ambianceSchema = {
    type: Type.OBJECT,
    properties: {
        mood: { type: Type.STRING, description: "A short phrase describing the viewing mood (e.g., 'dark and suspenseful', 'lighthearted and whimsical')." },
        primaryColor: { type: Type.STRING, description: "A hex color code for the primary ambiance color." },
        secondaryColor: { type: Type.STRING, description: "A hex color code for the secondary ambiance color." },
        accentColor: { type: Type.STRING, description: "A hex color code for the accent ambiance color." },
        musicSuggestion: { type: Type.STRING, description: "A brief suggestion for ambient music or sound (e.g., 'Gentle rain sounds', 'Epic orchestral score')." },
    },
    required: ['mood', 'primaryColor', 'secondaryColor', 'accentColor', 'musicSuggestion'],
};

export const searchContent = async (query: string, type: ContentType): Promise<ContentItem[]> => {
  const prompt = `Generate a list of 12 fictional ${type} based on the theme '${query}'. For each, provide a unique title, a short, one-paragraph synopsis, a year of release between 1990 and 2024, a rating out of 10 (e.g., 8.7), a list of 3-4 relevant genres, and a unique poster image URL from picsum.photos with resolution 400x600. Ensure each poster URL has a different random seed.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: contentSchema,
    },
  });

  const parsedResponse = JSON.parse(response.text);
  
  if (!Array.isArray(parsedResponse)) {
      throw new Error("Invalid response format from API.");
  }

  // Add a unique ID to each item
  return parsedResponse.map((item: Omit<ContentItem, 'id'>, index: number) => ({
    ...item,
    id: `${Date.now()}-${index}`,
  }));
};

export const beautifyContent = async (title: string, synopsis: string, genres: string[]): Promise<Ambiance> => {
    const prompt = `Based on the content titled '${title}', with the synopsis "${synopsis}" and genres [${genres.join(', ')}], generate an 'ambiance palette' for the ideal viewing experience. Provide a mood description, three distinct hex color codes (primary, secondary, accent), and a suggestion for ambient music or sound.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: ambianceSchema,
        },
    });

    return JSON.parse(response.text);
};
