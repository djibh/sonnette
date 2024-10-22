import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined) 
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  const handleSelectActivity = (id: string) => {
      setSelectedActivity(activities.find(x => x.id === id))
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleFormOpen = (id?: string) => {
      if (id) {
        handleSelectActivity(id)
      } else {
        handleCancelSelectedActivity()
      }
      setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    if (activity.id) {
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
    } else {
      setActivities([...activities, {...activity, id: uuid()}])
    }
    setEditMode(false)
    setSelectedActivity(activity)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard 
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectedActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
