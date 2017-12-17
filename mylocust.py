from locust import HttpLocust, TaskSet, task
from random import randint
import json
#know ip address: ip route get 8.8.8.8 | awk '{print $NF; exit}'

nameArray = ["Arthur", "Jeanne", "Elizabeth", "Media"]
genderArray = ["Male", "Female"]
birthArray = ["1850", "1766", "1812", "1001"]
cityArray = ["London", "Paris", "Slovakia", "Texas"]

class UserBehavior(TaskSet):
    min_wait = 1000
    max_wait = 5000

    # def add_to_list(self):
    #     self.client.get('/add')

    # def remove_from_list(self):
    #     self.client.get('/remove')
    #
    # def auth_lumin(self):
    #     self.client.post('/sign-in',
    #         {"username": "test123@gmail.com",
    #          "password": "123456"})
    @task
    def search_something(self):
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
        self.client.get('/search')



class WebsiteUser(HttpLocust):
    ## localhost
    # host = "http://127.0.0.1:3000"

    host = "https://app.luminpdf.com"
    task_set = UserBehavior
