from django.urls import path
from .views import FileUploadView, FileDownloadView, FileListView, FileDetailView, FileUpdateView, FileDeleteView, FileSearchView, UserFilesView, RecentFilesView, FileRatingView, FileRatingsListView, PopularFilesView

urlpatterns = [
    path('upload', FileUploadView.as_view(), name='file-upload'),
    path('<int:pk>/download/', FileDownloadView.as_view(), name='file-download'),
    path('list/', FileListView.as_view(), name='file-list'),
    path('search/', FileSearchView.as_view(), name='file-search'),
    path('<int:pk>/', FileDetailView.as_view(), name='file-detail'),
    path('<int:pk>/update/', FileUpdateView.as_view(), name='file-update'),
    path('<int:pk>/delete/', FileDeleteView.as_view(), name='file-delete'),
    path('user/<str:username>/', UserFilesView.as_view(), name='user-files'),
    path('recent/', RecentFilesView.as_view(), name='recent-files'),
    path('rate/', FileRatingView.as_view(), name='file-rate'),
    path('ratings/', FileRatingsListView.as_view(), name='file-ratings'),
    path('popular/', PopularFilesView.as_view(), name='popular-files'),
]
