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

with open('/Users/MMM/Documents/Lambda/lab/human-rights-first-fe-a/src/data/mpv/fatality.json', 'w') as json_file:
    json.dump(fatalityDict, json_file)


fatality = list(fatalityDict.values())
with open('/Users/MMM/Documents/Lambda/lab/human-rights-first-fe-a/src/data/mpv/fatalityList.json', 'w') as json_file:
    json.dump(fatality, json_file)
