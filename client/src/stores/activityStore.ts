import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../interfaces/activity";
import agent from "../app/api/agents";
import {v4 as uuid} from 'uuid';
import { Console } from "console";


export default class ActivityStore{
    activities: Activity[] = [];
    activityResistry = new Map<string, Activity>();
    selectedActivity?: Activity = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){ 
        makeAutoObservable(this);
    }

    get sortedActivities(){
        return Array.from(this.activityResistry.values())
                    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const list = await agent.Activities.list();
            list.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if(activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else{
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
            return activity;
        }
    }

    private getActivity = (id: string) => { return this.activityResistry.get(id); }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityResistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityResistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })       
        } catch (error){
            console.error(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.edit(activity);
            runInAction(() => {
                this.activityResistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })       
        } catch (error){
            console.error(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id).then(() => {
            this.activityResistry.delete(id);
            this.loading = false;
            })
        }catch(error){
            runInAction(() => {
                this.loading = false;
            })
        }    
    }
}
