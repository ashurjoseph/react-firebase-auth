import { Container, Heading, Text , Button} from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'

export default function TestPage() {

  var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = "378163333974-7hsu1mtaj4ukbc7dvp7k7mhl14c1gj8c.apps.googleusercontent.com"
  var API_KEY = "AIzaSyCrgdZbpZ8Mbjn0WFYX2vrR08FLkDRYfis"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': 'Awesome Event!',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'Really great refreshments',
          'start': {
            'dateTime': '2021-11-24T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2021-11-24T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        
        // get.events
        // gapi.client.calendar.events.list({
        //   'calendarId': 'primary',
        //   'timeMin': (new Date()).toISOString(),
        //   'showDeleted': false,
        //   'singleEvents': true,
        //   'maxResults': 10,
        //   'orderBy': 'startTime'
        // }).then(response => {
        //   const events = response.result.items
        //   console.log('EVENTS: ', events)
        // })
      })
    })
  }
  return (
    <Layout className="App">
      <Heading className="App-header">
        <Text>Click to add event to Google Calendar</Text>
        <Button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</Button>
      </Heading>
    </Layout>
  );
}