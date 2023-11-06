from django.urls import path

from  .views  import *  

urlpatterns = [
    path('candidate_save/', CandidateSaveApi.as_view(), name='candidate_api'),
    path('dropdownData/',FilterData.as_view(),name = 'dropdown')
]