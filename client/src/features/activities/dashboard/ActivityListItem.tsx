import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { SyntheticEvent, useState } from "react";

interface props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: props) {
    const { activityStore } = useStore();
    const [target, setTarget] = useState("");
    const { deleteActivity, loading } = activityStore;

    const handleActivityDelete = (
        e: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    };

    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>
                        {activity.city}, {activity.venue}
                    </div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        floated="right"
                        content="View"
                        color="blue"
                    ></Button>
                    <Button
                        name={activity.id}
                        loading={loading && target === activity.id}
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        negative
                        floated="right"
                        content="Delete"
                    ></Button>
                    <Label basic content={activity.category}></Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}
