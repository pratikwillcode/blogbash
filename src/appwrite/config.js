import conf from "../conf/config";
import {
    Client,
    ID,
    Databases,
    Storage,
    Query, 
    Functions
} from 'appwrite';

export class Service {
    client = new Client();
    functions = new Functions(this.client);
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
        authorName,
        createdOn,
        topic
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    authorName,
                    createdOn,
                    topic
                }
            );
        } catch (e) {
            console.log("Create Post Failed" + e.message);
        }
    }

    async updatePost(slug, {
        title,
        content,
        featuredImage,
        status,
        topic
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                    title,
                    content,
                    featuredImage,
                    status,
                    topic
                }
            );
        } catch (e) {
            console.log("Update Post Failed" + e.message);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (e) {
            console.log("Delete Post Failed" + e.message);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (e) {
            console.log("Get Post Failed" + e.message);
            return false
        }
    }

    async getMyPosts(userId, queries = [Query.equal("userId", userId)]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (e) {
            console.log("Get Posts Failed" + e.message);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", ["active"])]) {
        try {
            const allPosts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId);
            // allPosts.documents = allPosts.documents.filter(post => post.status === "active")
            return allPosts

        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    //file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (e) {
            console.log("Upload File Failed" + e.message);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (e) {
            console.log("Delete File Failed" + e.message);
            return false;
        }
    }

    getFilePreviewUrl(fileId) {

        return this.bucket.getFileView(conf.appwriteBucketId, fileId).href;
    }

    async getProfileDetails(userId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userId
            );
        } catch (e) {
            console.log("Get Profile Details Failed" + e.message);
            return false
        }
    }

    async createUserProfile(userId, name, email ) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userId, {
                    name, 
                    email
                }
            );
        } catch (e) {
            console.log("Create Profile Failed" + e.message);
        }
    }
    
    async updateProfile(userId, {
        name,
        email,
        linkedInUrl,
        twitterUrl,
        githubUrl,
        profilePicture
    }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userId, {
                    name,
                    email,
                    linkedInUrl,
                    twitterUrl,
                    githubUrl,
                    profilePicture
                }
            );
        } catch (e) {
            console.log("Update Profile Failed" + e.message);
        }
    }

    fetchUsers = async () => {
        try {
          const response = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteProfileCollectionId);
          return response.documents;
        // allPosts.documents = allPosts.documents.filter(post => post.status === "active")
        return allPosts
        } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
        }
      };

    blockUser = async (userId) => {
        try {
          // Implement block logic here
          console.log(`Blocking user with ID: ${userId}`);
          return true;
        } catch (error) {
          console.error("Error blocking user:", error);
          throw error;
        }
      };
      
    unblockUser = async (userId) => {
        try {
          // Implement unblock logic here
          console.log(`Unblocking user with ID: ${userId}`);
          return true;
        } catch (error) {
          console.error("Error unblocking user:", error);
          throw error;
        }
      };

    async deleteUserProfile(userId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userId
            );
            return true;
        } catch (e) {
            console.log("Delete User Profile Failed" + e.message);
            return false;
        }
    }

    deleteUserViaFunction = async (userId) => {
        try {
          const payload = JSON.stringify({ userId });
      
          const response = await this.functions.createExecution(
            conf.appwriteDeleteUserFunctionId,           // 1st argument: functionId
            JSON.stringify({ userId: userId }),                  // 2nd argument: body
            false,                                       // 3rd argument: async (false means synchronous execution)
            "/delete-user",                              // 4th argument: xpath (path)
            "POST",                                      // 5th argument: method
            { "x-appwrite-key": import.meta.env.VITE_APPWRITE_ADMIN_API_KEY } // 6th argument: headers
          );
          
          
          
      
          const parsedResponse = JSON.parse(response.responseBody);
          return parsedResponse;
        } catch (error) {
          console.error("Error deleting user via function:", error);
          throw error;
        }
      };



}

const service = new Service();
export default service;