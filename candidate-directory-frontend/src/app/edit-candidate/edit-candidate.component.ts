import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {

  first_name !: string;
  last_name !: string;
  role !: string;
  email !: string;
  mobnum !: number;
  altmobnum !: number;
  address !: string;
  currentDesig !: string;
  currentEmp !: string;
  currentSalary !: string;
  expSalary !: string;
  noticePeroid !: string;
  yearsExp !: string;
  resumeSrc !: string;
  photoSrc !: string;
  dob !: string;
  recruiterAlert !: string;

  blnshowData = true
  intEvent:any | undefined;
  inteduInstitution:any | undefined;
  intjobRequisition:any | undefined;
  intpersona:any | undefined;
  intscreeningMode:any | undefined;
  intgender:any | undefined;
  intcity:any | undefined;
  intexpLevel:any | undefined;
  inteduLevel:any | undefined;
  inteduQualification:any | undefined;
  intEduSpecialization:any | undefined;
  intsourceType:any | undefined;
  intsource:any | undefined;
  intreasonForChange:any | undefined;
  intempdir:any | undefined;
  intMaritalStat:any | undefined;
  pincode:any | undefined;



  eventData = [{'id':0,'name' : ''}]
  eduInstitution = [{'id':0,'name' : ''}]
  jobRequisition = [{'id':0,'name' : ''}]
  persona = [{'id':0,'name' : ''}]
  screeningMode = [{'id':0,'name' : ''}]
  gender = [{'id':0,'name' : ''}]
  city = [{'id':0,'name' : ''}]
  expLevel = [{'id':0,'name' : ''}]
  maritalStatus = [{'id':0,'name' : ''}]
  eduLevel = [{'id':0,'name' : ''}]
  eduQualification = [{'id':0,'name' : ''}]
  eduSpecialization = [{'id':0,'name' : ''}]
  empDirectory = [{'id':0,'name' : ''}]
  sourceType = [{'id':0,'name' : ''}]
  source = [{'id':0,'name' : ''}]
  reasonForChange = [{'id':0,'reason' : ''}]

  constructor(
    private service : BackendService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getFilterData()
    this.getData()
  }
  getData() {

    this.service.getData('candidate/candidate_save/?id='+localStorage.getItem('candidateId')).subscribe(
      (response) => {
        console.log(response);
        this.first_name = response['data']['first_name'];
        this.last_name = response['data']['last_name'];
        this.role = response['data']['role'];
        this.currentDesig = response['data']['current_designation'];
        this.currentEmp = response['data']['current_employer'];
        this.currentSalary = response['data']['current_monthly_salary'];
        this.expSalary = response['data']['expected_monthly_salary'];
        this.email = response['data']['email'];
        this.mobnum = response['data']['contact_no_primary'];
        this.altmobnum = response['data']['contact_no_alternate'];
        this.address = response['data']['address_line'];
        this.recruiterAlert = response['data']['recruiter_alert'];
        this.intEvent = JSON.stringify(response['data']['event_id']);
        this.inteduInstitution = JSON.stringify(response['data']['education_institution_id']);
        this.intjobRequisition = JSON.stringify(response['data']['job_position_id']);
        this.intpersona = JSON.stringify(response['data']['persona_id']);
        this.intscreeningMode = JSON.stringify(response['data']['screening_mode_id']);
        this.intgender = JSON.stringify(response['data']['gender_id']);
        this.intcity = JSON.stringify(response['data']['city_id']);
        this.intexpLevel = JSON.stringify(response['data']['experience_level_id']);
        this.inteduLevel = JSON.stringify(response['data']['education_level_id']);
        this.inteduQualification = JSON.stringify(response['data']['education_qualification_id']);
        this.intEduSpecialization = JSON.stringify(response['data']['education_specialization_id']);
        this.intsourceType = JSON.stringify(response['data']['source_type_id']);
        this.intsource = JSON.stringify(response['data']['source_id']);
        this.intreasonForChange = JSON.stringify(response['data']['reason_for_change']);
        this.intempdir = JSON.stringify(response['data']['referred_by_id']);
        this.intMaritalStat = JSON.stringify(response['data']['marital_status_id']);
        this.pincode = response['data']['pincode'];
        this.noticePeroid = response['data']['notice_period'];
        this.yearsExp = response['data']['years_of_experience'];
        this.photoSrc = response['data']['photo_path'];
        this.resumeSrc = response['data']['resume_path'];
        this.dob = response['data']['dob'];
      }
    )
    
  }
  getFilterData() {
    this.service.getData('candidate/dropdownData/').subscribe((response) => {
      
      this.eduInstitution = response['data']['edu_institution']
      this.jobRequisition = response['data']['job_requisition']
      this.persona = response['data']['persona']
      this.screeningMode = response['data']['screening_mode']
      this.empDirectory = response['data']['employee_directory']
      this.eduLevel = response['data']['edu_level']
      this.eventData = response['data']['event']
      this.gender = response['data']['gender']
      this.city = response['data']['city']
      this.expLevel = response['data']['experience_level']
      this.eduQualification = response['data']['edu_qualification']
      this.eduSpecialization = response['data']['edu_specialization']
      this.sourceType = response['data']['source_type']
      this.source = response['data']['source']
      this.reasonForChange = response['data']['reason_for_change']
      this.maritalStatus = response['data']['marital_status']
      

    })
  }

  updateData() {
    let dctData = {
      "Id" : localStorage.getItem('candidateId'),
      "event" : this.intEvent,
      "job_position" : this.intjobRequisition,
      "recruiter_alert" : this.recruiterAlert,
      "first_name" : this.first_name,
      "last_name" : this.last_name,
      "email" : this.email,
      "persona_id":this.intpersona,
      "role" : this.role,
      "screening_mode" : this.intscreeningMode,
      "dob": this.dob,
      "gender" : this.intgender,
      "marital_status" : this.intMaritalStat,
      "contact_no_primary" : this.mobnum,
      "contact_no_alternate" : this.altmobnum,
      "referred_by" : this.intempdir,
      "pincode" : this.pincode,
      "experience_level" : this.intexpLevel,
      "education_qualification" : this.inteduQualification,
      "education_specialization" : this.intEduSpecialization,
      "education_institution" : this.inteduInstitution,
      "source" : this.intsource,
      "source_type" : this.intsourceType,
      "years_of_experience" : this.yearsExp,
      "current_employer" : this.currentEmp,
      "current_designation" : this.currentDesig,
      "current_monthly_salary" : this.currentSalary,
      "expected_monthly_salary" : this.expSalary,
      "notice_period" : this.noticePeroid,
      "reason_for_change_id" : this.intreasonForChange,
      "photo_path" : this.photoSrc,
      "resume_path" : this.resumeSrc,
      "address_line":this.address,
 }
    this.service.putData('candidate/candidate_save/', dctData).subscribe((response) => {      
      if(response['status'] == 1) {
        Swal.fire('Success', 'Updated succesfully!','success')
        this.router.navigateByUrl('')
      }else{
        Swal.fire('Warning', response['message'],'warning')
        return
      }
    })
  }

  cancel(){
    this.router.navigateByUrl('')
  }

}
