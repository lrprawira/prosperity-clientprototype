module.exports = {
    // appProxyHost: `${process.env.SERV_ADDR}` || 'https://prosperity-corsproxy.herokuapp.com',
    appProxyHost: 'http://localhost',
    // appProxyPort: `${process.env.SERV_PORT}` || 80,
    appProxyPort: `3010`,
    appProxySub: '/proxy/getdata',
    appProxySubXhr: '/proxy/getxmldata',
    rootDomain: 'http://web.academic.uph.edu',
    loginPortal: '/psp/ps/index.php?cmd=login&languageCd=ENG',

    studentBalanceSummary: '/psc/ps/EMPLOYEE/HRMS/q/?ICAction=ICQryNameURL=PUBLIC.U_STDNT_BLC_SUM&PortalActualURL=http%3a%2f%2fweb.academic.uph.edu%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fq%2f%3fICAction%3dICQryNameURL%3dPUBLIC.U_STDNT_BLC_SUM&PortalRegistryName=EMPLOYEE&PortalServletURI=http%3a%2f%2fweb.academic.uph.edu%2fpsp%2fps%2f&PortalURI=http%3a%2f%2fweb.academic.uph.edu%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes',
    studentGradeAndProfile: '/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL',
    studentGradeTermDetail: '/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL',
    studentPrivateInformation: '/psc/ps/EMPLOYEE/HRMS/c/CC_PORTFOLIO.SS_CC_DEMOG_DATA.GBL?Page=SS_CC_DEMOG_DATA',
    studentClassSchedule: '/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_LIST.GBL?Page=SSR_SSENRL_LIST',
    studentWeeklySchedule: '/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL',
};
