import { loadMeetups } from "../actions/eventActions";

export const getMeetups = () => dispatch => {
  return fetch(
    `http://api.meetup.com/find/upcoming_events?key=13a6c19667bd255232452d766c2f6c&sign=true&format=json&photo-host=public&topic_category=witi`,
    { mode: "cors" }
  )
    .then(resp => resp.json())
    .then(data => {
      const meetups = data.events.map(meetup => {
        return {
          id: meetup.id,
          name: meetup.name,
          sponsor: meetup.group.name,
          event_date: meetup.local_date,
          event_time: meetup.local_time,
          url: meetup.link,
          location: meetup.group.localized_location
        };
      });

      return dispatch(loadMeetups(meetups));
    });
};