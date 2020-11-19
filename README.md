# Human Rights First Police Use of Force Map - Front End

## Description 👇
> **Disclaimer:** This application is currently in Alpha (as of Oct 20, 2020) and is not ready for production. Please use at your own risk as things will change almost daily.

- The team is developing an interactive map that identifies potential instances of police use of force across the United States of America for [Human Rights First](https://www.humanrightsfirst.org/), an independent advocacy and action organization. 
- The application takes information provided by the data science team, collecting relevant incidents and data from Twitter, Reddit, and police agencies, and displays it on a map.
- A Fatality Tab gives more information about the victims of police brutality 
- An Incidents Tab shows relevent social and media information relating to individual reports of police use of force  
- The stats page has a few components using amCharts - the amCharts library is expansive and capable of showing highly organized layers of data. 

## Project Overview

1️⃣ [Trello Board](https://trello.com/b/vUsfsVej/team-a-labs28)

1️⃣ [Full Github Project](https://github.com/orgs/Lambda-School-Labs/teams/labs-28-human-rights-first-a/repositories)

1️⃣ Preliminary User Flows![UX Design files](https://i.ibb.co/Xt1sw81/Human-Rights-First-1-25x.png) 


## Deployed App
### [App](https://main.d2v2y4y91pkwd.amplifyapp.com/)

## Features
- A navigation/header displaying the Map, the Incidents page, the Fatality page, or the Stats page. 
- Map: 
	- Displays incidents on a country, state and city level
	- A list of states will allow the user to quickly focus on a region
	- Allows filtering by type of force `(not functional)`
	- Allows filtering by source `(not functional)`
	- Allows user to reset map filters `(not functional)`
- Graph/Timeline: 
	- Displays the number of incidents for a given location `(not functional)`
	- Dropdown month ranges will allow the user to change the timeline `(not functional)`
- Incidents Page: 
	- Displays cards with social/news information for available incidents 
	- Pagination implemented at 24 records per page
- Fatalities Page: 
	- Renders a collection of cards with individual information about the victims of police brutality  
	- - Pagination implemented at 24 record per page
- Pie Chart: 
	- The pie charts visualizes uses the Washington Post data to visualize the reported number of victims of police brutality. 
	- The data is broken down into age ranges - 18 and under, 18-25, and so on
- Bar Graph: 
	- The bar graph is again using the Washington Post data to display the total number of victims of police brutality by state. 
	- Below the graph is a scrollbar that can be dragged from either end to narrow to display range 


## Libraries
- amCharts 
- uikit 
- react query (a hook `useIncidents` is set up with react query to get a large, complete data set from the backend)

## Tech Stack Tips: 

- amCharts:
	- amCharts is a data visualization library, responsiveness comes baked in, which is a great perk. 
	- The charts are instantiated inside a useLayoutEffect hook... this hook is pretty much a useEffect hook, except that it works synchronously, after DOM mutations 
	- The graphs, slices, lines, etc that appear in a chart are called a 'series.' They have a huge range of methods that control their styling, tag text, shading, positioning and more - check the docs they have a lot of examples of different kinds of cool series classes - the line series is an interesting one that could be used with the bar graph, for example
	- Make sure that you add refs to charts, if they don't dispose of themselves correctly they break the charts around them

## Requirements
- [Labs Engineering Standard requirements found here](https://www.notion.so/Human-Rights-First-Roadmap-Labs-28-4725bc357588498587902fed9d9b78c5)

## Data Sources
 - Police Shooting Fatality
 	- Source: Washington Post 
	- Github: https://github.com/washingtonpost/data-police-shootings
	- Licence: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
	- Time: January 1st 2015 - Present

## Components

- Header 
- Timeline Map
- Map 
- Stats: 
	- Pie Chart 
	- Bar Graph 
	- Timeline
- Incidents: 
	- Incident Card
	- Incidents Page 
- Fatalities: 
	- Fatality Card 
	- Fatality Page 
- Footer

## Styling Our App
- `CSS`
- `UIKit`
- `Favicon`

## Data Visualization 
- `AMcharts` [Docs](https://www.amcharts.com/docs/v4/)

## The Team
- [Jean-Pierre Fraga ](https://github.com/JeanFraga)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/JeanFraga)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jeanfraga/) - Team Project Lead

- [Jessica Duell](https://github.com/jduell12)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jduell12)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jessicaduell/)   - Back End Engineer

- [Terrence Malone](https://github.com/TerrenceAm22)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/TerrenceAM22)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/terrence-malone/) - Back End Engineer

- [Benjamin Witter](https://github.com/witerone)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/witerone)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15">](https://www.linkedin.com/in/benjamin-witter-a8980a50/) - Data Science Engineer

- [Johann Augustine](https://github.com/DataLovecraft)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/DataLovecraft)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/johannaugustine/) - Data Science Engineer

- [Antonio Martinez Baez](https://github.com/tonomb)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tonomb)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/antoniomtzb/) - Front End Engineer

- [Maryam Mosstoufi](https://github.com/MaryamMosstoufi)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MaryamMosstoufi)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/maryammosstoufi/) - Front End Engineer

- [Ashley Bergsma](https://github.com/ashley-bergsma)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ashley-bergsma)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ashleybergsma89/) - Front End Engineer


## Wishlist 
Here are the things we wish we'd done, but alas, time flies when you're having fun... 🎉🎠

- A successful connection between the DS and backend and the frontend, the backend now has more endpoints that are just waiting to be used! 
- User functionality (login, save, share, etc)
	- login using twitter auth with [passpor.js](http://www.passportjs.org/)
	- twitter share component is already built but we didnt end up using it `src/components/common/TwitterShare.js`
- Show more information and allow filtering in charts:
	- In the bar graph, comparative data can be shown if another series is added to the chart. A reusable dropdown [Hook](https://dev.to/vunderkind/quick-introduction-to-react-custom-hooks-with-dropdown-selection-edh) could allow users to filter through the kind of data they want to see. 
	- In the pie chart more global data could be broken down (display different types of force, ethnicities, etc)
- Color code fatality and incident cards 
- Further build out the timeline (i.e. the RadarTimeline) to contain state, city, and national data. 
	- Radar timelines data is already fromated, just need an endpoint to return exact format and it should work.
- Build out the Population Pyramid component - this amCharts chart is currently showing a comparison of the male-to-female population in the US. 
- Connect map to backend 
- Filtering to query for a more specific set of incidents on incidents & fatality pages
- Use users geolocation to show more relevant data
	-  we built a useGeolocation hook to pull in the location `src/hooks/useGeolocation`