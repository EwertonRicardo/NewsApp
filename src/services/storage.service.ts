import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { StorageKeysEnum } from "../enums/storage-keys.enum";
import { HighlightsModel } from "../models/highlights.model";


@Injectable()
export class StorageService {

    constructor(
        private storage: Storage
    ) {

    }

    async getToken(): Promise<string> {
        try {
            const token = await this.storage.get(StorageKeysEnum.Token);
            return token;
        } catch (error) {
            console.log(error);
        }
    }

    async setToken(token: string): Promise<void> {
        try {
            await this.storage.set(StorageKeysEnum.Token, token);
        } catch (error) {
            console.log(error);
        }
    }

    async removeToken(): Promise<void> {
        try {
            await this.storage.remove(StorageKeysEnum.Token);
        } catch (error) {
            console.log(error);
        }
    }

    async getNews(): Promise<HighlightsModel[]> {
        try {
            const news = await this.storage.get(StorageKeysEnum.News);
            if (news && news.length > 0) return news;
            return [];
        } catch (error) {
            console.log(error);
        }
    }

    async setNews(news): Promise<void> {
        try {
            await this.storage.set(StorageKeysEnum.News, news);
        } catch (error) {
            console.log(error);
        }
    }

    async removeNews(): Promise<void> {
        try {
            await this.storage.remove(StorageKeysEnum.News);
        } catch (error) {
            console.log(error);
        }
    }

    async getFilter(): Promise<boolean> {
        try {
            const filter = await this.storage.get(StorageKeysEnum.FilterOptions);
            return filter;
        } catch (error) {
            console.log(error);
        }
    }

    async setFilter(filterOption: boolean ): Promise<void> {
        try {
            await this.storage.set(StorageKeysEnum.FilterOptions, filterOption);
        } catch (error) {
            console.log(error);
        }
    }

    async removeFilter(): Promise<void> {
        try {
            await this.storage.remove(StorageKeysEnum.FilterOptions);
        } catch (error) {
            console.log(error);
        }
    }

}