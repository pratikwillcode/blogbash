const conf = {
    
        appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
        appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
        appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
        appwriteProfileCollectionId : String(import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID),
        appwriteAPIKey :  String(import.meta.env.VITE_APPWRITE_API_KEY),
        appwriteDeleteUserFunctionId :  String(import.meta.env.VITE_APPWRITE_DELETE_USER_FUNCTION_ID),
}

export default conf