import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import agent from '../api/agent'

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined) 
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.activities.list().then(response => {
      const activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
        setActivities(activities)
        setLoading(false)
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
    setSubmitting(true);
    if (activity.id) {
      agent.activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid()
      agent.activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setEditMode(false)
        setSelectedActivity(activity)
        setSubmitting(false)
      })
    }
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  if (loading) return <LoadingComponent content='Loading app'/>

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
            submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
