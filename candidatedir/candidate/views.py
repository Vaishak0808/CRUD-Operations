from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from datetime import datetime
from django.utils import timezone
from django.db import transaction
import re


# Create your views here.

class CandidateSaveApi(APIView):
    def post(self, request):
        try:
            with transaction.atomic():
                dob = request.data.get('dob')
                dob_datetime = datetime.strptime(dob, '%Y-%m-%d').date()
                login_time = datetime.now()
                logout_time = datetime.now()
                created_date = datetime.now()

                if not request.data.get('event') or request.data.get('event') == '' :
                    raise Exception('Event is required')
                if not request.data.get('job_position') or request.data.get('job_position') == '':
                    raise Exception('Job position is required')
                if not request.data.get('recruiter_alert'):
                    raise Exception('Recruiter alert is required')
                if not request.data.get('first_name'):
                    raise Exception('First name is required')
                if not request.data.get('last_name'):
                    raise Exception('Last name is required')
                if request.data.get('first_name') == request.data.get('last_name'):
                    raise Exception('First and last name canot be same')
                if not request.data.get('email'):
                    raise Exception('Email is required')
                if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', request.data.get('email')):
                    raise Exception("Invalid email address")
                if not request.data.get('persona_id') or request.data.get('persona_id') == '':
                    raise Exception('Persona is required')
                if not request.data.get('screening_mode') or request.data.get('screening_mode') == '':
                    raise Exception('Screening mode is required')
                if not request.data.get('dob'):
                    raise Exception('Date of birth is required')
                if not request.data.get('gender') or request.data.get('gender') == '':
                    raise Exception('Gender is required')
                if not request.data.get('marital_status') or request.data.get('marital_status') == '':
                    raise Exception('Marital status is required')
                if not request.data.get('contact_no_primary'):
                    raise Exception('Primary contact number is required')
                if not len(str(request.data.get('contact_no_primary'))) ==10:
                    raise Exception('Primary contact number must be 10 digit')
                if request.data.get('contact_no_alternate') and not len(str(request.data.get('contact_no_alternate'))) ==10:
                    raise Exception('Alternate contact number must be 10 digit')
                if not request.data.get('address_line'):
                    raise Exception('Address line is required')
                if not request.data.get('pincode'):
                    raise Exception('Pincode is required')
                if not len(str(request.data.get('pincode'))) ==6:
                    raise Exception('Pincode must be 6 digit')
                if not request.data.get('experience_level') or request.data.get('experience_level') == '':
                    raise Exception('Experience level is required')
                if not request.data.get('education_qualification') or request.data.get('education_qualification') == '':
                    raise Exception('Education qualification is required')
                if not request.data.get('education_specialization') or request.data.get('education_specialization') == '':
                    raise Exception('Education specialization is required')
                if not request.data.get('education_institution') or request.data.get('education_institution') == '':
                    raise Exception('Institution is required')
                if not request.data.get('source') or request.data.get('source') == '':
                    raise Exception('Source is required')
                if not request.data.get('source_type') or request.data.get('source_type') == '':
                    raise Exception('Source type is required')
                if not request.data.get('years_of_experience') or request.data.get('years_of_experience') == '':
                    raise Exception('Years of experience is required')
                if not request.data.get('current_employer') or request.data.get('current_employer') == '':
                    raise Exception('Current employer is required')
                if not request.data.get('current_designation') or request.data.get('current_designation') == '':
                    raise Exception('Current designation is required')
                if not request.data.get('current_monthly_salary') or request.data.get('current_monthly_salary') == '':
                    raise Exception('Current salary is required')
                if not request.data.get('expected_monthly_salary') or request.data.get('expected_monthly_salary') == '':
                    raise Exception('Expected salary is required')
                if not request.data.get('notice_period') or request.data.get('notice_period') == '':
                    raise Exception('Notice period is required')
                if not request.data.get('reason_for_change_id') or request.data.get('reason_for_change_id') == '':
                    raise Exception('Reason for change is required')

                Candidatedirectory.objects.create(
                    event_id=request.data.get('event'),
                    job_position_id=request.data.get('job_position'),
                    recruiter_alert=request.data.get('recruiter_alert'),
                    first_name=request.data.get('first_name'),
                    last_name=request.data.get('last_name'),
                    email=request.data.get('email'),
                    persona_id=request.data.get('persona_id'),
                    screening_mode_id=request.data.get('screening_mode'),
                    dob=dob_datetime,
                    address_line=request.data.get('address_line'),
                    gender_id=request.data.get('gender'),
                    marital_status_id=request.data.get('marital_status'),
                    contact_no_primary=request.data.get('contact_no_primary'),
                    contact_no_alternate=request.data.get('contact_no_alternate'),
                    pincode=request.data.get('pincode'),
                    experience_level_id=request.data.get('experience_level'),
                    education_qualification_id=request.data.get('education_qualification'),
                    education_specialization_id=request.data.get('education_specialization'),
                    education_institution_id=request.data.get('education_institution'),
                    source_id=request.data.get('source'),
                    source_type_id=request.data.get('source_type'),
                    years_of_experience=request.data.get('years_of_experience'),
                    current_employer=request.data.get('current_employer'),
                    current_designation=request.data.get('current_designation'),
                    current_monthly_salary=request.data.get('current_monthly_salary'),
                    expected_monthly_salary=request.data.get('expected_monthly_salary'),
                    notice_period=request.data.get('notice_period'),
                    reason_for_change_id=request.data.get('reason_for_change_id'),
                    photo_path=request.data.get('photo_path'),
                    resume_path=request.data.get('resume_path'),
                    login_time=login_time,
                    logout_time=logout_time,
                    created_date=created_date,
                    status=1,
                )
                return Response({'status' : 1, 'message' : 'Successfully created'})
        except Exception as e:
            return Response({'status' : 0,'message':str(e)})
    def get(self, request):
        try:
            if request.GET.get('id'):
                data = Candidatedirectory.objects.filter(status = 1, id = request.GET.get('id')).values('id','event_id','job_position_id','recruiter_alert','first_name','last_name','email','persona_id','role','screening_mode_id','dob','gender_id','marital_status_id','contact_no_primary','contact_no_alternate','referred_by_id','address_line','city_id','pincode','experience_level_id','education_qualification_id','education_level_id','education_institution_id','education_specialization_id','source_id','source_type_id','years_of_experience','current_employer','current_designation','current_monthly_salary','expected_monthly_salary','notice_period','reason_for_change','photo_path','resume_path','login_time','logout_time','ip_address','geo_location','created_date','created_by','modified_date','modified_by').first()
            else:
                data = Candidatedirectory.objects.filter(status = 1).values('id','event__name','job_position__name','recruiter_alert','first_name','last_name','email','persona__name','persona__json_deatils','role','screening_mode__name','dob','gender__name','marital_status__name','contact_no_primary','contact_no_alternate','referred_by__name','referred_by__employee_name','referred_by_other','address_line','city__name','pincode','experience_level__name','education_level__name','education_qualification__name','education_specialization_other','source__name','source_type__name','years_of_experience','current_employer','current_designation','current_monthly_salary','expected_monthly_salary','notice_period','reason_for_change','photo_path','resume_path','login_time','logout_time','ip_address','geo_location','created_date','created_by','modified_date','modified_by')

            return Response({'status' : 1, 'data': data})
        except:
            return Response({'status' : 0})
    def put(self, request):
        try:
            id = request.data.get('Id')
            if id is not None:
                dob = request.data.get('dob')
                dob_datetime = None
                if dob is not None:
                    dob_datetime = datetime.strptime(dob, '%Y-%m-%d').date()


                if not request.data.get('event') or request.data.get('event') == '' :
                   raise Exception('Event is required')
                if not request.data.get('job_position') or request.data.get('job_position') == '':
                   raise Exception('Job position is required')
                if not request.data.get('recruiter_alert'):
                   raise Exception('Recruiter alert is required')
                if not request.data.get('first_name'):
                   raise Exception('First name is required')
                if not request.data.get('last_name'):
                   raise Exception('Last name is required')
                if request.data.get('first_name') == request.data.get('last_name'):
                   raise Exception('First and last name canot be same')
                if not request.data.get('email'):
                   raise Exception('Email is required')
                if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', request.data.get('email')):
                    raise Exception("Invalid email address")
                if not request.data.get('persona_id') or request.data.get('persona_id') == '':
                   raise Exception('Persona is required')
                if not request.data.get('screening_mode') or request.data.get('screening_mode') == '':
                   raise Exception('Rscreening mode is required')
                if not request.data.get('dob'):
                   raise Exception('Date of birth is required')
                if not request.data.get('gender') or request.data.get('gender') == '':
                   raise Exception('Gender is required')
                if not request.data.get('marital_status') or request.data.get('marital_status') == '':
                   raise Exception('Marital status is required')
                if not request.data.get('contact_no_primary'):
                   raise Exception('Primary contact number is required')
                if not len(str(request.data.get('contact_no_primary'))) ==10:
                   raise Exception('Primary contact number must be 10 digit')
                if request.data.get('contact_no_alternate') and not len(str(request.data.get('contact_no_alternate'))) ==10:
                   raise Exception('Alternate contact number must be 10 digit')
                if not request.data.get('address_line'):
                   raise Exception('Address line is required')
                if not request.data.get('pincode'):
                   raise Exception('Pincode is required')
                if not len(str(request.data.get('pincode'))) ==6:
                   raise Exception('Pincode must be 6 digit')
                if not request.data.get('experience_level') or request.data.get('experience_level') == '':
                   raise Exception('Experience level is required')
                if not request.data.get('education_qualification') or request.data.get('education_qualification') == '':
                   raise Exception('Education qualification is required')
                if not request.data.get('education_specialization') or request.data.get('education_specialization') == '':
                   raise Exception('Education specialization is required')
                if not request.data.get('education_institution') or request.data.get('education_institution') == '':
                   raise Exception('Institution is required')
                if not request.data.get('source') or request.data.get('source') == '':
                   raise Exception('Source is required')
                if not request.data.get('source_type') or request.data.get('source_type') == '':
                   raise Exception('Source type is required')
                if not request.data.get('years_of_experience') or request.data.get('years_of_experience') == '':
                   raise Exception('Years of experience is required')
                if not request.data.get('current_employer') or request.data.get('current_employer') == '':
                   raise Exception('Current employer is required')
                if not request.data.get('current_designation') or request.data.get('current_designation') == '':
                   raise Exception('Current designation is required')
                if not request.data.get('current_monthly_salary') or request.data.get('current_monthly_salary') == '':
                   raise Exception('Current salary is required')
                if not request.data.get('expected_monthly_salary') or request.data.get('expected_monthly_salary') == '':
                   raise Exception('Expected salary is required')
                if not request.data.get('notice_period') or request.data.get('notice_period') == '':
                   raise Exception('Notice period is required')
                if not request.data.get('reason_for_change_id') or request.data.get('reason_for_change_id') == '':
                   raise Exception('Reason for change is required')

                created_date = timezone.now()                
                ins_data = Candidatedirectory.objects.get(id=int(id))
                ins_data.event_id=request.data.get('event')
                ins_data.job_position_id=request.data.get('job_position')
                ins_data.recruiter_alert=request.data.get('recruiter_alert')
                ins_data.persona_id=request.data.get('persona_id')
                ins_data.first_name=request.data.get('first_name')
                ins_data.last_name=request.data.get('last_name')
                ins_data.email=request.data.get('email')
                ins_data.screening_mode_id=request.data.get('screening_mode')
                ins_data.reason_for_change_id=request.data.get('reason_for_change_id')
                ins_data.dob=dob_datetime
                ins_data.gender_id=request.data.get('gender')
                ins_data.marital_status_id=request.data.get('marital_status')
                ins_data.contact_no_primary=request.data.get('contact_no_primary')
                ins_data.contact_no_alternate=request.data.get('contact_no_alternate')
                ins_data.pincode=request.data.get('pincode')
                ins_data.experience_level_id=request.data.get('experience_level')
                ins_data.education_qualification_id=request.data.get('education_qualification')
                ins_data.education_specialization_id=request.data.get('education_specialization')
                ins_data.education_institution_id=request.data.get('education_institution')
                ins_data.source_id=request.data.get('source')
                ins_data.source_type_id=request.data.get('source_type')
                ins_data.years_of_experience=request.data.get('years_of_experience')
                ins_data.current_employer=request.data.get('current_employer')
                ins_data.current_designation=request.data.get('current_designation')
                ins_data.current_monthly_salary=request.data.get('current_monthly_salary')
                ins_data.expected_monthly_salary=request.data.get('expected_monthly_salary')
                ins_data.notice_period=request.data.get('notice_period')
                ins_data.photo_path=request.data.get('photo_path')
                ins_data.resume_path=request.data.get('resume_path')
                ins_data.ip_address=request.data.get('ip_address')
                ins_data.modified_date=created_date
                ins_data.role=request.data.get('role')
                ins_data.status=1
                ins_data.save()
                
                return Response({'status' : 1, 'message' : 'Succesfully updated'})
            return Response({'status' : 0})
        except Exception as e:
            return Response({'status' : 0,'message':str(e)})
    def delete(self, request):
        try:            
            Candidatedirectory.objects.filter(id = request.GET['id']).delete()
            return Response({'status' : 1, 'message' : 'Succesfully deleted '})
        except:
            return Response({'status' : 0})


class FilterData(APIView):
    def get(self, request):
        try:
            data = {
                'event' : Eventdetails.objects.filter().values(),
                'job_requisition' : Jobrequisition.objects.filter().values(),
                'persona' : Persona.objects.filter().values(),
                'screening_mode' : Screeningmode.objects.filter().values(),
                'marital_status' : Maritalstatus.objects.filter().values(),
                'gender' : Gender.objects.filter().values(),
                'employee_directory' : Employeedirectory.objects.filter().values(),
                'city' : City.objects.filter().values(),
                'experience_level' : Experiencelevel.objects.filter().values(),
                'edu_level' : Educationlevel.objects.filter().values(),
                'edu_qualification' : Educationqualification.objects.filter().values(),
                'edu_specialization' : Educationspecialization.objects.filter().values(),
                'edu_institution' : EducationInstitution.objects.filter().values(),
                'source_type' : Sourcetype.objects.filter().values(),
                'source' : Source.objects.filter().values(),
                'reason_for_change' : Reasonforchange.objects.filter().values()
            }

            return Response({'status' : 1, 'data' : data})
        except:
            return Response({'status' : 0})

        


