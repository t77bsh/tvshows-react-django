from django.db import models


class Comment(models.Model):
    show = models.CharField(max_length=25)
    username = models.EmailField(max_length=40, default='null')
    comment = models.TextField(max_length=1000)
    time_stamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.show + ' ' + self.username + "'s comment"