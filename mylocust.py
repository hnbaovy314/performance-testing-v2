from locust import HttpLocust, TaskSet, task
#know ip address: ip route get 8.8.8.8 | awk '{print $NF; exit}'

class UserBehavior(TaskSet):
    min_wait = 1000
    max_wait = 5000

    def add_to_list(self):
        self.client.get('/add')

    # def remove_from_list(self):
    #     self.client.get('/remove')
    #
    # def auth_lumin(self):
    #     self.client.post('/sign-in',
    #         {"username": "test123@gmail.com",
    #          "password": "123456"})


class WebsiteUser(HttpLocust):
    ## localhost
    # host = "http://127.0.0.1:3000"

    host = "https://app.luminpdf.com"
    task_set = UserBehavior
