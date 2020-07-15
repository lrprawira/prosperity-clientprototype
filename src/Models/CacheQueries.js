const studentInformation = {
    studentName: `#DERIVED_SSTSNAV_PERSON_NAME`,
    studentGpa: `#STATS_CUMS\\$13`,
    studentId: `#HCR_PERSON_I_EMPLID`,
}

const requestModel = {
    "ICAJAX":"1",
    "ICNAVTYPEDROPDOWN":"0",
    "ICType":"Panel",
    "ICElementNum":"0",
    "ICStateNum":"1",
    "ICAction":"DERIVED_SSS_SCT_SSR_PB_GO",
    "ICXPos":"0",
    "ICYPos":"0",
    "ResponsetoDiffFrame":"-1",
    "TargetFrameName":"None",
    "FacetPath":"None",
    "ICFocus":"",
    "ICSaveWarningFilter":"0",
    "ICChanged":"-1",
    "ICAutoSave":"0",
    "ICResubmit":"0",
    "ICSID":"NDM68BSxvi/ChgXsA1hVPY91F57OKCdU36v76jxnhaA=",
    "ICActionPrompt":"false",
    "ICTypeAheadID":"",
    "ICBcDomData":"undefined",
    "ICFind":"",
    "ICAddCount":"",
    "ICAPPCLSDATA":"",
    "DERIVED_SSTSNAV_SSTS_MAIN_GOTO$7$":"9999",
    "DERIVED_SSTSNAV_SSTS_MAIN_GOTO$8$":"9999",
    "ptus_defaultlocalnode":"PSFT_HR",
    "ptus_dbname":"HRCS9",
    "ptus_portal":"EMPLOYEE",
    "ptus_node":"HRMS",
    "ptus_workcenterid":"",
    "ptus_componenturl":"http://web.academic.uph.edu/psp/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL"
};

const requestModelSchedule = {
    ICAJAX: '1',
    ICNAVTYPEDROPDOWN: '0',
    ICType: 'Panel',
    ICElementNum: '0',
    ICStateNum: '',
    ICAction: 'DERIVED_CLASS_S_SSR_REFRESH_CAL',
    ICXPos: '0',
    ICYPos: '0',
    ResponsetoDiffFrame: '-1',
    TargetFrameName: 'None',
    FacetPath: 'None',
    ICFocus: 'DERIVED_CLASS_S_MEETING_TIME_END',
    ICSaveWarningFilter: '0',
    ICChanged: '-1',
    ICAutoSave: '0',
    ICResubmit: '0',
    ICSID: '',
    ICActionPrompt: 'false',
    ICTypeAheadID: '',
    ICBcDomData: 'undefined',
    ICFind: '',
    ICAddCount: '',
    ICAPPCLSDATA: '',
    'DERIVED_SSTSNAV_SSTS_MAIN_GOTO$7$': '9999',
    'DERIVED_REGFRM1_SSR_SCHED_FORMAT$259$': 'W',
    DERIVED_CLASS_S_START_DT: '',
    DERIVED_CLASS_S_MEETING_TIME_START: '12:00AM',
    DERIVED_CLASS_S_MEETING_TIME_END: '11:59PM',
    'DERIVED_CLASS_S_SHOW_AM_PM$chk': 'Y',
    DERIVED_CLASS_S_SHOW_AM_PM: 'Y',
    'DERIVED_CLASS_S_MONDAY_LBL$30$$chk': 'Y',
    'DERIVED_CLASS_S_MONDAY_LBL$30$': 'Y',
    'DERIVED_CLASS_S_THURSDAY_LBL$chk': 'Y',
    DERIVED_CLASS_S_THURSDAY_LBL: 'Y',
    'DERIVED_CLASS_S_SUNDAY_LBL$chk': 'Y',
    DERIVED_CLASS_S_SUNDAY_LBL: 'Y',
    'DERIVED_CLASS_S_SSR_DISP_TITLE$chk': 'N',
    'DERIVED_CLASS_S_TUESDAY_LBL$chk': 'Y',
    DERIVED_CLASS_S_TUESDAY_LBL: 'Y',
    'DERIVED_CLASS_S_FRIDAY_LBL$chk': 'Y',
    DERIVED_CLASS_S_FRIDAY_LBL: 'Y',
    'DERIVED_CLASS_S_SHOW_INSTR$chk': 'N',
    'DERIVED_CLASS_S_WEDNESDAY_LBL$chk': 'Y',
    DERIVED_CLASS_S_WEDNESDAY_LBL: 'Y',
    'DERIVED_CLASS_S_SATURDAY_LBL$chk': 'Y',
    DERIVED_CLASS_S_SATURDAY_LBL: 'Y',
    'DERIVED_SSTSNAV_SSTS_MAIN_GOTO$8$': '9999',
    ptus_defaultlocalnode: 'PSFT_HR',
    ptus_dbname: 'HRCS9',
    ptus_portal: 'EMPLOYEE',
    ptus_node: 'HRMS',
    ptus_workcenterid: '',
    ptus_componenturl: 'http://web.academic.uph.edu/psp/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL'
};

module.exports.studentInformation = studentInformation;
module.exports.requestModel = requestModel;
module.exports.requestModelSchedule = requestModelSchedule;