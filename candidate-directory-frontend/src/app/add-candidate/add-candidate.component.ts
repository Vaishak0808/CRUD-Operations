import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

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
  resume:any | undefined;
  recruiter_alert:any
  

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
  saveData() {
    let dctData = {
      "Id" : localStorage.getItem('candidateId'),
      "event" : this.intEvent,
      "job_position" : this.intjobRequisition,
      "recruiter_alert" : this.recruiter_alert,
      "first_name" : this.first_name,
      "last_name" : this.last_name,
      "email" : this.email,
      "persona_id":this.intpersona,
      "role" : this.role,
      "screening_mode" : this.intscreeningMode,
      "dob": moment(this.dob).format('YYYY-MM-DD'),
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
    this.service.postData('candidate/candidate_save/',dctData).subscribe((response) => {
      if(response['status'] == 1){
        Swal.fire('Success', 'Data saved succesfully!','success')
        this.router.navigateByUrl('')
      }else{
        Swal.fire('Warning',response['message'],'warning')
        return
      }
    })
  }
}
