from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
import io
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated



@api_view(['POST'])
def UserRegisteration(request):
    if request.method=="POST":
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = User.objects.get(username=serializer.data.get('username'))
            active = "INACTIVE"
            if user.is_active:
                active = "ACTIVE"
            resp = {
                "status": "Account successfully created", 
                "status_code": 201, 
                "json_data": { 
                    "user_id": user.id ,
                    "account_state": active
                    } 
            }
            return Response(resp, status=status.HTTP_201_CREATED)
        return Response({"msg":"Registeration Failed"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"msg":"Not Post Method"})



# Getting error of not 404 >>
@api_view(['POST'])
def UserLogin(request):
    if request.method=="POST":
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            print(User.objects.get(email=email))
            user = User.objects.get(email=email)
            # user = authenticate(email=email, password=password)
            print(user)
            if user is not None and user.password==password:
                return Response({"msg":"Login Successful"}, status=status.HTTP_200_OK)
            return Response({"errors":{"non_field_errors":["Email or Password not Vaild"]}}, status=status.HTTP_404_NOT_FOUND)
        return Response({"msg":"Login Failed"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"msg":"Not Post Method"})


# @login_required
# @permission_classes((IsAuthenticated,))
@api_view(['GET'])
def UserView(request):
    if request.method=="GET":
        serializer = UserViewSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"msg":"Error viewing users"})





#### Questions view

@api_view(['GET','POST'])
def getQuestions(request):
    if request.method=="GET":
        Questions = Question.objects.all()
        serializer = QuestionSerializer(Questions, many=True)
        # json_data = JSONRenderer().render(serializer)
        return Response(serializer.data)


    if request.method=="POST":
        json_data = request.body
        stream = io.BytesIO(json_data)
        parse_data = JSONParser().parse(stream)
        serialized = QuestionSerializer(data=parse_data)
        if(serialized.is_valid()):
            serialized.save()
            resp = {"msg":"New Question added."}
            return Response(resp)
        # error_msg = JSONRenderer().render()
        return Response(serialized.errors)

@api_view(['GET', 'PUT', 'DELETE'])
def get_Question(request, pk):
    if Question.objects.filter(id=pk).exists():
        Question = Question.objects.get(id=pk)
        if request.method=='GET':
            serailizer = QuestionSerializer(Question)
            return Response(serailizer.data)
        if request.method=='PUT':
            serailizer = QuestionSerializer(Question, data=request.data, partial=True)
            if serailizer.is_valid():
                serailizer.save()
                return Response({"msg":"Data updated successfully."})
            return Response({"msg":"Update failed!"})
        if request.method=='DELETE':
            Question.delete()
            return Response({"msg":"Data deleted successfully"})
        
    else:
        resp = {"msg":"Data for this ID does not exist!!"}
        return Response(resp)
        