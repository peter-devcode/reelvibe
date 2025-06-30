import { ID } from "appwrite";
import { appwriteConfig, databases } from "../appwrite/config";
import { getSearchEntry } from "./getSearchEntry";

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const existingDoc = await getSearchEntry(searchTerm);
    if (existingDoc) {
      await databases.updateDocument(
        appwriteConfig.DATABASE_ID,
        appwriteConfig.COLLECTION_ID,
        existingDoc.$id,
        { count: existingDoc.count + 1 }
      );
    } else {
      await databases.createDocument(
        appwriteConfig.DATABASE_ID,
        appwriteConfig.COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error("Failed to update search count:", error);
  }
};
