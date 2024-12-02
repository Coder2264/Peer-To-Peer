from django.db import models
from django.contrib.auth.models import User


class File(models.Model):
    name = models.CharField(max_length=200)  # File name
    description = models.TextField(blank=True, null=True)  # Optional description
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files")  # Uploader
    size = models.PositiveBigIntegerField()  # File size in bytes
    type = models.CharField(max_length=50)  # File type (e.g., 'txt', 'jpg')
    path = models.CharField(max_length=500)  # File path from the client machine

    def __str__(self):
        return f"{self.name} ({self.type})"

    def get_popularity_score(self):
        # Aggregated likes and dislikes based on ratings
        ratings = self.ratings.aggregate(
            likes=models.Count('id', filter=models.Q(rating=1)),
            dislikes=models.Count('id', filter=models.Q(rating=-1))
        )
        return ratings['likes'] - ratings['dislikes']



class FileRating(models.Model):
    LIKE = 1
    DISLIKE = -1

    RATING_CHOICES = [
        (LIKE, 'Like'),
        (DISLIKE, 'Dislike'),
    ]

    file = models.ForeignKey(File, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField(blank=True, null=True)  # Optional comment

    class Meta:
        unique_together = ('file', 'user')  # Each user can rate a file only once

    def __str__(self):
        return f"Rating: {self.get_rating_display()} by {self.user} on {self.file.name}"