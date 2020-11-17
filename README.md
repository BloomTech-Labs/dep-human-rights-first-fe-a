# Human Rights First Police Use of Force Map - Front End

## Description 👇
> **Disclaimer:** This application is currently in Alpha (as of Oct 20, 2020) and is not ready for production. Please use at your own risk as things will change almost daily.

- The team is developing an interactive map that identifies potential instances of police use of force across the United States of America for [Human Rights First](https://www.humanrightsfirst.org/), an independent advocacy and action organization. 
- The application takes information provided by the data science team, collecting relevant incidents and data from Twitter, Reddit, and police agencies, and displays it on a map.
- A Fatality Tab gives more information about the victims of police brutality 
- An Incidents Tab shows relevent social and media information relating to individual reports 
- The stats page has a few components using amCharts

## Project Overview

1️⃣ [Trello Board](https://trello.com/b/vUsfsVej/team-a-labs28)

1️⃣ [Full Github Project](https://github.com/orgs/Lambda-School-Labs/teams/labs-28-human-rights-first-a/repositories)

1️⃣ Preliminary User Flows![UX Design files](https://i.ibb.co/Xt1sw81/Human-Rights-First-1-25x.png) 


## Deployed App
> ⚙Under Construction⚙

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
	- Allows further filtering to query for a more specific set of incidents 
- Fatalities Page: 
	- Renders a collection of cards with individual information about the victims of police brutality  
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


## Requirements
- [Labs Engineering Standard requirements found here](https://www.notion.so/Human-Rights-First-Roadmap-Labs-28-4725bc357588498587902fed9d9b78c5)

## Data Sources
 - Police Shooting Fatality
 	- Source: Washington Post 
	- Github: https://github.com/washingtonpost/data-police-shootings
	- Licence: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
	- Time: January 1st 2015 - Present

### Environment variables

## Components

- Header 
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

- [Ashley Bergsma](https://github.com/ashley-bergsma)[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/blayzestone)[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ashleybergsma89/) - Front End Engineer

## ⚠ Contributing - future features needed/desired for this project:

> Please refer to the highlighted parentheses statements throughout this ReadMe for better understanding

- Successful connection between Back End and Data Science teams
- Successful connection between Back End and Front End teams
- User functionality (login, save, share, etc.)
- Ability to reset filters
- Ability to apply and filter by date range
- Ability to filter by source type
- Prevent map refresh/reload when filtering data by incident type
- Provide smooth map transitions with minimal clicking
- A filter to manipulate data on the timeline
    - Add options to the timeline, like filtering by state or zip code as well as a date range

