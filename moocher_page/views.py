from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


class MoocherPageView(APIView):
    def get(self, request, name):
        try:
            page = MoocherPage.objects.get(name=name)
            result = MoocherPageSerializer(page, many=False)
            return Response(result.data)
        except ObjectDoesNotExist:
            return Response(status=404)

    def post(self, request, name):
        try:
            try:
                page = MoocherPage.objects.get(name=name)
            except ObjectDoesNotExist:
                page = MoocherPage.objects.create(name=name, user=request.user)

            serializer = MoocherPageSerializer(instance=page, data=request.data, partial=True)
            if serializer.is_valid():
                page = serializer.save()
                return Response(serializer.data)
            return Response(500)
        except:
            return Response(400)

    def delete(self, request, name):
        try:
            page = MoocherPage.objects.get(name=name, user=request.user)
            page.delete()
            return Response('{}')
        except:
            return Response(400)
