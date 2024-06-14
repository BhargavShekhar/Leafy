import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    database
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        // fill the database
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ name, type, habitat, temp, season, featuredImage, userid, image1, image2, image3, image4 }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    name,
                    type,
                    habitat,
                    temp,
                    season,
                    featuredImage,
                    userid,
                    image1,
                    image2,
                    image3,
                    image4
                }
            );
        } catch (error) {
            console.log('Appwrite service :: config :: error', error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite service :: config :: updatePost error', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: config :: deletePost :: error', error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service :: config :: getPost :: error', error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            console.log('Appwrite service :: config :: getPosts :: error', error);
            return false;
        }
    }

    async uploadFile(file) {
        console.log(`config :: uploadfile :: file ->`);
        console.log(file);
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: config :: uploadFile :: error', error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log('Appwrite service :: config :: deleteFile :: error', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()

export default service
