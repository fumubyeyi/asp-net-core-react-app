import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Activity } from "../interfaces/activity";
import agent from "../app/api/agents";

export default class ActivityStore{
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){ 
       makeObservable(this, {
        activities: observable,
        loadActivities: action.bound
       })
    }

    loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
        } catch (error) {
            console.log(error);
        }
    }
}