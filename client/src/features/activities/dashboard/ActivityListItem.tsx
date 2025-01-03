import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";

interface props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            size="tiny"
                            circular
                            src="/assets/user.png"
                        />
                        <Item.Header as={Link} to={`activities/${activity.id}`}>
                            {activity.title}
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" />
                    {format(activity.date!, "dd MMM yyyy h:mm aa", {
                        locale: fr,
                    })}
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>Attendees go here</Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`${activity.id}`}
                    color="teal"
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    );
}
