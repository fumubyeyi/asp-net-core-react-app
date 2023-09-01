import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../stores/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ActivityDashboard(){
    const {activityStore} = useStore();
    const {loadActivities, activityResistry} = activityStore;

    useEffect(()=>{
        if (activityResistry.size <= 1) loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Filters</h2>
            </Grid.Column>
        </Grid>
    )
})