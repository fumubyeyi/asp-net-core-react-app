import { useEffect, useState } from 'react';
import {Header, List} from 'semantic-ui-react';
import axios from "axios";
import { Activity } from '../../interfaces/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5000/api/activities")
    .then(res => {
      console.error(res);
      setActivities(res.data);
    })
  }, [])

  return (
    <div>
      <Header as="h2"icon="users"  content="reactivities" />
      <List>
        {activities.map(activity => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          )
        )}
      </List>
    </div>
  );
}

export default App;
