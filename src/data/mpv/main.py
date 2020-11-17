import csv
import pandas as pd
import datetime as dt
import json

data_source = 'https://mappingpoliceviolence.org/s/MPVDatasetDownload.xlsx'
report = pd.read_excel(data_source, na_filter='')


row_id = -1
fatalityDict = {}
for rows in report.values:
    row_id += 1
    key = row_id
    fatalityDict[key] = {
        "name": rows[0],
        "age": rows[1],
        "gender": rows[2],
        "race": rows[3],
        "image_url": rows[4],
        "date": str(rows[5]),
        "address": rows[6],
        "city": rows[7],
        "state": rows[8],
        "zipcode": rows[9],
        "county": rows[10],
        "agencyResponsibleForDeath": rows[11],
        "oriAgencyIdentifier": rows[12],
        "causeOfDeath": rows[13],
        "description": rows[14],
        "justified": rows[15],
        "criminalCharges": rows[16],
        "document_url": rows[17],
        "mentalIllness": rows[18],
        "unarmed": rows[19],
        "allegedWeapon": rows[20],
        "allegedThreatLevel": rows[21],
        "fleeing": rows[22],
        "bodyCamera": rows[23],
        "wp_id": rows[24],
        "offDuty": rows[25],
        "geography": rows[26],
        "mvp_id": rows[27],
        "fatalEncounters_id": rows[28],
    }

with open('src/mpv/fatality.json', 'w') as json_file:
    json.dump(fatalityDict, json_file)


fatality = list(fatalityDict.values())
with open('src/mpv/fatalityList.json', 'w') as json_file:
    json.dump(fatality, json_file)

byDate = {}

for key, value in fatalityDict.items():
    if value['date'] == '':
        if 'unknown' in byDate:
            byDate['unknown'].append(key)
        else:
            byDate['unknown'] = [key]
    if value['date'][:10] in byDate:
        byDate[value['date'][:10]].append(key)
    else:
        byDate[value['date'][:10]] = [key]


with open('src/mpv/byDate.json', 'w') as json_file:
    json.dump(byDate, json_file)
