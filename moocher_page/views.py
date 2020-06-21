from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


class MoocherPageView(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            page = MoocherPage.objects.get(pk=pk)
            result = MoocherPageSerializer(page, many=False)
            return Response(result.data)
        return Response(status=400)

