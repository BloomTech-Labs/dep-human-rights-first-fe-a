import csv
import pandas as pd
import json

data_source = 'https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv'

report = pd.read_csv(data_source, na_filter='')
fatality = [list(row) for row in report.values]

fatalityDict = {}
for rows in report.values:
    key = rows[0]
    fatalityDict[key] = {
        'name': rows[1],
        'date': rows[2],
        'manner_of_death': rows[3],
        'armed': rows[4],
        'age': rows[5],
        'gender': rows[6],
        'race': rows[7],
        'city': rows[8],
        'state': rows[9],
        'signs_of_mental_illness': rows[10],
        'threat_level': rows[11],
        'flee': rows[12],
        'body_camera': rows[13],
        'longitude': rows[14],
        'latitude': rows[15],
        'is_geocoding_exact': rows[16]
    }

with open('src/data/wapo/fatality.json', 'w') as json_file:
    json.dump(fatalityDict, json_file)


byDate = {}

for victim in fatality:
    if victim[2] == '':
        if 'unknown' in byDate:
            byDate['unknown'].append(victim[0])
        else:
            byDate['unknown'] = [victim[0]]
    if victim[2] in byDate:
        byDate[victim[2]].append(victim[0])
    else:
        byDate[victim[2]] = [victim[0]]

with open('src/data/wapo/byDate.json', 'w') as json_file:
    json.dump(byDate, json_file)

byMannerOfDeath = {}

for victim in fatality:
    if victim[3] in byMannerOfDeath:
        byMannerOfDeath[victim[3]].append(victim[0])
    else:
        byMannerOfDeath[victim[3]] = [victim[0]]

with open('src/data/wapo/byMannerOfDeath.json', 'w') as json_file:
    json.dump(byMannerOfDeath, json_file)


byArmed = {}

for victim in fatality:
    if victim[4] == '':
        if 'unknown' in byArmed:
            byArmed['unknown'].append(victim[0])
        else:
            byArmed['unknown'] = [victim[0]]
    if victim[4] in byArmed:
        byArmed[victim[4]].append(victim[0])
    else:
        byArmed[victim[4]] = [victim[0]]

with open('src/data/wapo/byArmed.json', 'w') as json_file:
    json.dump(byArmed, json_file)

byAge = {}

for victim in fatality:
    if victim[5] == '':
        if 'unknown' in byAge:
            byAge['unknown'].append(victim[0])
        else:
            byAge['unknown'] = [victim[0]]
    elif victim[5] in byAge:
        byAge[victim[5]].append(victim[0])
    else:
        byAge[victim[5]] = [victim[0]]

with open('src/data/wapo/byAge.json', 'w') as json_file:
    json.dump(byAge, json_file)

byGender = {}

for victim in fatality:
    if victim[6] == '':
        if 'unknown' in byGender:
            byGender['unknown'].append(victim[0])
        else:
            byGender['unknown'] = [victim[0]]
    elif victim[6] in byGender:
        byGender[victim[6]].append(victim[0])
    else:
        byGender[victim[6]] = [victim[0]]

with open('src/data/wapo/byGender.json', 'w') as json_file:
    json.dump(byGender, json_file)

byRace = {}

for victim in fatality:
    if victim[7] == '':
        if 'unknown' in byRace:
            byRace['unknown'].append(victim[0])
        else:
            byRace['unknown'] = [victim[0]]
    elif victim[7] in byRace:
        byRace[victim[7]].append(victim[0])
    else:
        byRace[victim[7]] = [victim[0]]

with open('src/data/wapo/byRace.json', 'w') as json_file:
    json.dump(byRace, json_file)

byCity = {}

for victim in fatality:
    cityState = victim[8]+', ' + victim[9]
    if victim[8] == '':
        if 'unknown' in byCity:
            byCity['unknown'].append(victim[0])
        else:
            byCity['unknown'] = [victim[0]]
    elif cityState in byCity:
        byCity[cityState].append(victim[0])
    else:
        byCity[cityState] = [victim[0]]


with open('src/data/wapo/byCity.json', 'w') as json_file:
    json.dump(byCity, json_file)

byState = {}

for victim in fatality:
    if victim[9] == '':
        if 'unknown' in byState:
            byState['unknown'].append(victim[0])
        else:
            byState['unknown'] = [victim[0]]
    elif victim[9] in byState:
        byState[victim[9]].append(victim[0])
    else:
        byState[victim[9]] = [victim[0]]

with open('src/data/wapo/byState.json', 'w') as json_file:
    json.dump(byState, json_file)


bySignsOfMentalIllness = {}

for victim in fatality:
    if victim[10] == '':
        if 'unknown' in bySignsOfMentalIllness:
            bySignsOfMentalIllness['unknown'].append(victim[0])
        else:
            bySignsOfMentalIllness['unknown'] = [victim[0]]
    elif victim[10] in bySignsOfMentalIllness:
        bySignsOfMentalIllness[victim[10]].append(victim[0])
    else:
        bySignsOfMentalIllness[victim[10]] = [victim[0]]

with open('src/data/wapo/bySignsOfMentalIllness.json', 'w') as json_file:
    json.dump(bySignsOfMentalIllness, json_file)

byThreatLevel = {}

for victim in fatality:
    if victim[11] == '':
        if 'unknown' in byThreatLevel:
            byThreatLevel['unknown'].append(victim[0])
        else:
            byThreatLevel['unknown'] = [victim[0]]
    elif victim[11] in byThreatLevel:
        byThreatLevel[victim[11]].append(victim[0])
    else:
        byThreatLevel[victim[11]] = [victim[0]]

with open('src/data/wapo/byThreatLevel.json', 'w') as json_file:
    json.dump(byThreatLevel, json_file)

byFlee = {}

for victim in fatality:
    if victim[12] == '':
        if 'unknown' in byFlee:
            byFlee['unknown'].append(victim[0])
        else:
            byFlee['unknown'] = [victim[0]]
    elif victim[12] in byFlee:
        byFlee[victim[12]].append(victim[0])
    else:
        byFlee[victim[12]] = [victim[0]]

with open('src/data/wapo/byFlee.json', 'w') as json_file:
    json.dump(byFlee, json_file)

byBodyCamera = {}

for victim in fatality:
    if victim[13] == '':
        if 'unknown' in byBodyCamera:
            byBodyCamera['unknown'].append(victim[0])
        else:
            byBodyCamera['unknown'] = [victim[0]]
    elif victim[13] in byBodyCamera:
        byBodyCamera[victim[13]].append(victim[0])
    else:
        byBodyCamera[victim[13]] = [victim[0]]

with open('src/data/wapo/byBodyCamera.json', 'w') as json_file:
    json.dump(byBodyCamera, json_file)

byCoordinates = {}

for victim in fatality:
    coordinates = [(victim[14], victim[15]), victim[16]]
    byCoordinates[victim[0]] = coordinates

with open('src/data/wapo/byCoordinates.json', 'w') as json_file:
    json.dump(byCoordinates, json_file)
