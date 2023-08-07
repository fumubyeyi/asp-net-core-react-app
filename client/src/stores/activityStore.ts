import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../interfaces/activity";
import agent from "../app/api/agents";
import {v4 as uuid} from 'uuid';


export default class ActivityStore{
    activities: Activity[] = [];
    activityResistry = new Map<string, Activity>();
    selectedActivity?: Activity = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){ 
        makeAutoObservable(this);
    }

    get sortedActivities(){
        return Array.from(this.activityResistry.values())
                    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }

    loadActivities = async () => {
        try {
            const list = await agent.Activities.list();
            list.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityResistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state;
        })
    }

    selectActivity = (id: string) => this.selectedActivity = this.activityResistry.get(id);

    cancelSelectedActivity = () => this.selectedActivity = undefined;

    openForm = (id? : string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm = () => this.editMode = false; 

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
