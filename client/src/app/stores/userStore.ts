import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        const user = await agent.account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => (this.user = user));
        router.navigate("/activities");
        store.modalStore.closeModal();
    };

    register = async (creds: UserFormValues) => {
        const user = await agent.account.register(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => (this.user = user));
        router.navigate("/activities");
        store.modalStore.closeModal();
    };

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    };

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate("/");
    };

    getUser = async () => {
        try {
            const user = await agent.account.current();
            runInAction(() => (this.user = user));
        } catch (error) {
            console.log(error);
        }
    };

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    };
}
