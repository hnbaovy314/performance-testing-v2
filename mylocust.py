from locust import HttpLocust, TaskSet, task
from random import randint
import json
#know ip address: ip route get 8.8.8.8 | awk '{print $NF; exit}'

nameArray = ["Arthur", "Jeanne", "Elizabeth", "Media"]
genderArray = ["Male", "Female"]
birthArray = ["1850", "1766", "1812", "1001"]
cityArray = ["London", "Paris", "Slovakia", "Texas"]

def add_to_list(l):
    l.client.get('/add')

def remove_from_list(l):
    l.client.get('/remove')

def auth_lumin(l):
    l.client.post('/sign-in',
        {"username": "test123@gmail.com",
         "password": "123456"})

def search_something(l):
    rand = randint(0, len(nameArray)+1)
    if rand >= len(nameArray):
        sName = ''
    else:
        sName = nameArray[rand]

    rand = randint(0, len(genderArray)+1)
    if rand >= len(genderArray):
        sGender = ''
    else:
        sGender = genderArray[rand]

    rand = randint(0, len(birthArray)+1)
    if rand >= len(birthArray):
        sBirth = ''
    else:
        sBirth = birthArray[rand]

    rand = randint(0, len(cityArray)+1)
    if rand >= len(cityArray):
        sCity = ''
    else:
        sCity = cityArray[rand]

    search = {
        'sName': sName,
        'sGender': sGender,
        'sBirth': sBirth,
        'sCity': sCity
    }
    searchTerm = json.dumps(search)
    l.client.get('/search', params=searchTerm)


class UserBehavior(TaskSet):
    tasks = {add_to_list: 3, remove_from_list: 1}


class WebsiteUser(HttpLocust):
    ## localhost
    host = "http://127.0.0.1:3000"
    ## lumin host
    # host = "https://app.luminpdf.com"
    task_set = UserBehavior
    min_wait = 0
    max_wait = 0
