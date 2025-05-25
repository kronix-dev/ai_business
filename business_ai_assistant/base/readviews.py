from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView

from base.models import BusinessCategory,BusinessOwnerProfile
from budgeting.readviews import getAllExpenses,getAllSales,getMonthlyExpenses,getMonthSales
class BusinessCatList(APIView):
    def get(self,request):
        data =[]
        message = ''
        status = True
        try:
            for i in BusinessCategory.objects.all():
                data.append({'name': i.name, 'id': i.id})
        except Exception as e:
            message = str(e)
            status =False
        return Response({
            'data': data,
            'message': message,
            'status': status
        })
        
class BusinessProfile(APIView):
    def get(self,request):
        data = {}
        message = 'Ok'
        hasProfile = False
        try:
            bp = BusinessOwnerProfile.objects.get(user= request.user)
            data['name'] = bp.business_name
            data['goals'] =bp.goals
            data['industry'] = bp.industry
            data['revenue'] = bp.revenue
            data['mentorIndustry'] =bp.mentor_industry
            data['size'] = bp.business_size
            data['stage']= bp.business_stage
            data['other_chars'] = bp.preferred_mentor_characteristics
            data['skills'] = bp.skills
            data['qualifications']= bp.qualifications
            data["monthRevenue"] = getMonthSales(request.user)
            data["monthExpenses"] = getMonthlyExpenses(request.user)
            data["totalExpenses"] = getAllExpenses(request.user)
            data["totalRevenue"] = getAllSales(request.user)
            data['id'] = bp.id
            hasProfile =True
        except Exception as e:
            message = "user has no profile"+ str(e)
            hasProfile = False
            
        
        return Response({
            'hasProfile':hasProfile,
            'data':data,
            'message':message
        })