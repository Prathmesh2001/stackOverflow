from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE


class User(AbstractUser):
    dob = models.DateTimeField(null=True, blank=True)

class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, related_name="my_question")
    question_title = models.CharField(max_length=100, null=False)
    question_body = models.CharField(max_length=1000, null=False)
    is_blocked = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    q_upvotes = models.IntegerField(default=0)
    q_downvotes = models.IntegerField(default=0)

    voted = models.ManyToManyField(User, blank=True)
    active = models.BooleanField(default=1)

    def __str__(self):
        return f"{self.question_id}: {self.question_title}"


class Answers(models.Model):
    answer_id = models.AutoField(primary_key=True)
    commentBy = models.ForeignKey(User, on_delete=CASCADE, related_name="my_comment")
    commentOn = models.ForeignKey(Question, on_delete=CASCADE, related_name="otherComment")
    answer = models.CharField(max_length=500)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    is_accepted = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)


# "question_id": "123344",
# "question_title": "How to properly import datetime module into a
# jupyter notebook?",
# "question_body": "I am trying to import datetime module, which I
# use to create functions to be applied over a pandas dataframe column",
# "is_blocked": False,
# "is_deleted": False,
# "q_upvotes": 1,
# "q_downvotes": 0,
# "tags": ["python", "jupyter_notebook"],
# "answers": [{
# "answer_id": "123455",
# "answer": "You've imported timedelta from datetime. So you need
# to reference it as timedelta, not as datetime.timedelta. Just like you
# can't reference date as datetime.date in this example because you
# imported date from datetime.",
# "upvotes": 1,
# "downvotes": 0,
# "is_deleted": False,
# "is_accepted": True,
# "is_blocked": False
# },