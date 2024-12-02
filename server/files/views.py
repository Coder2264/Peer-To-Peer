from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics
from .serializers import UserSerializer, FileSerializer, FileRatingSerializer
from .models import File, FileRating
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import FileResponse, Http404
import os


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class FileUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users
    #permission_classes = [AllowAny]  # Allow any user

    def post(self, request):
        # Create a mutable copy of request.data and set the 'author' field
        data = request.data.copy()
        data['author'] = request.user.id  # Set the author to the current user's ID

        serializer = FileSerializer(data=data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Save with current user as author
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Print errors for debugging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FileDownloadView(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    permission_classes = [AllowAny]
    def get(self, request, pk):
        try:
            file_instance = File.objects.get(pk=pk)
            file_path = file_instance.path.path
            if not os.path.exists(file_path):
                raise Http404("File not found.")

            response = FileResponse(open(file_path, 'rb'), as_attachment=True)
            response['Content-Disposition'] = f'attachment; filename="{file_instance.name}"'
            return response

        except File.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)

class FileListView(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            files = File.objects.all()
            serializer = FileSerializer(files, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except File.DoesNotExist:
            return Response({"detail": "Files not found."}, status=status.HTTP_404_NOT_FOUND)
        
class FileDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            file_instance = File.objects.get(pk=pk)
            serializer = FileSerializer(file_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except File.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)

class FileUpdateView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, pk):
        try:
            file_instance = File.objects.get(pk=pk)
        except File.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = FileSerializer(file_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileDeleteView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, pk):
        try:
            file_instance = File.objects.get(pk=pk)
            file_instance.delete()
            return Response({"detail": "File deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except File.DoesNotExist:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)

class FileSearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get('q', '')  # Get the 'q' query parameter
        if not query:
            return Response({"detail": "Query parameter 'q' is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Search by name, type, or description
        files = File.objects.filter(
            Q(name__icontains=query) | 
            Q(type__icontains=query) | 
            Q(description__icontains=query)
        )
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserFilesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
            files = File.objects.filter(author=user)
            serializer = FileSerializer(files, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class RecentFilesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        files = File.objects.order_by('-created_at')[:10]  # Limit to 10 recent files
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FileRatingView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        file_id = data.get('file')
        user_id = request.user.id

        # Check if the user has already rated the file
        rating_instance, created = FileRating.objects.update_or_create(
            file_id=file_id, user_id=user_id,
            defaults={'rating': data['rating'], 'comment': data.get('comment', '')}
        )

        if created:
            return Response({"detail": "Rating created."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Rating updated."}, status=status.HTTP_200_OK)
        
class FileRatingsListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, file_id):
        ratings = FileRating.objects.filter(file_id=file_id)
        serializer = FileRatingSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PopularFilesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        files = File.objects.all()
        files = sorted(files, key=lambda f: f.get_popularity_score(), reverse=True)[:10]
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
