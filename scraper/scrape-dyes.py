import requests
import json
import time

colors_baseurl = 'https://api.guildwars2.com/v2/colors'

def call_api(endpoint):
    headers = {'User-agent': 'dyePoolScraper'}
    url = 'https://api.guildwars2.com/v2/' + str(endpoint)
    response = requests.get(url, headers=headers)
    if(response.status_code == 200):
        return json.loads(response.content)
    else:
        raise Exception(response.status_code, response.content)



# TODO: change this to format data for postgres - need schema first from sequelize
colors = call_api('colors')
for i, color in enumerate(colors):
    color_data = call_api('colors/' + str(color))
    print(color_data) 
    if('item' in color_data):
        item_data = call_api('items/' + str(color_data['item']))
        print(item_data)
    if (i > 0 and i % 250 == 0):
        time.sleep(60)
