import {RouteObject, createBrowserRouter} from 'react-router-dom'
import App from '../layout/App'
import Home from '../../features/home/Home';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

export const routes : RouteObject[] =[
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Home />},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'create', element: <ActivityForm key="create" />},
            {path: 'edit/:id', element: <ActivityForm  key="edit" />}
        ]
    },
    
]

export const router = createBrowserRouter(routes);