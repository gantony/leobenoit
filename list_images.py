import os
import json


images = []

for image in os.listdir("./images/leo"):
	images.append({ "name": "leo", "path": "./images/leo/%s" %(image) })

for image in os.listdir("./images/benoit"):
	images.append({ "name": "benoit", "path": "./images/benoit/%s" %(image) })

json_images = json.dumps(images)

file = open("images.json", "w") 
file.write(json_images) 
file.close() 
