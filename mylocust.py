from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    min_wait = 1000
    max_wait = 5000

    @task
    def post_something(self):
        self.client.post('/submit')


class WebsiteUser(HttpLocust):
    host = "http://127.0.0.1:3000"
    task_set = UserBehavior
