import { Query } from "appwrite"
import { appwriteConfig, databases } from "../appwrite/config"
// Get search term to retrieve movie
// from the fetched data

// necessary parameters:
// endpoint for the query:
// 'https://api.themoviedb.org/3/search/movie?title=query'

export const getSearchEntry = async (searchTerm) => {
   try {
     const response = await databases.listDocuments(
        appwriteConfig.DATABASE_ID,
        appwriteConfig.COLLECTION_ID,
        [Query.equal("searchTerm", searchTerm)]
    )

    return response.documents[0] || null;
   } catch (error) {
    console.error("Failed to load search entry:", error);
    
   }
}