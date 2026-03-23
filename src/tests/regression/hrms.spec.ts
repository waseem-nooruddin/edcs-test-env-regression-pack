import { test, expect, APIRequestContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Helpers – mirrors the Postman pre-request script
// ---------------------------------------------------------------------------

function generateNIC(): string {
  const year = Math.floor(Math.random() * (99 - 70 + 1)) + 70; // 70-99
  const randomPart = Math.floor(1_000_000 + Math.random() * 9_000_000); // 7 digits
  return `${year}${randomPart}`; // 9 digits total
}

function generateNumericId(length = 5): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE_URL =
  'http://qa-edcs-v1-1604665350.ap-southeast-1.elb.amazonaws.com';

const ENDPOINT =
  '/edcs-be-hrms/api/v1/hrms-center/employees/Update-employee-data';

// ---------------------------------------------------------------------------
// Build the request body (same structure as Postman collection)
// ---------------------------------------------------------------------------

function buildPayload(empNumber: string, epfNumber: string, nicNo: string) {
  return {
    personalDetailDTO: {
      id: null,
      personalDetailEmpId: null,
      initials: 'Nooruddin',
      surName: 'W',
      fullName: 'Waseem nooruddin',
      dob: '1999-10-24',
      placeOfBirth: '',
      age: '26',
      gender: 'male',
      nicNo,
      passportNo: '',
      nicIssuedDate: '2026-02-11',
      passportIssuedDate: null,
      passportIssuedPlace: '',
      nicIssuedPlace: '',
      bloodGroup: '',
      civilStatus: 'Unmarried',
      marriedDate: null,
      divorcedDate: null,
      religion: '',
      nationality: '',
      date: null,
      userExpDate: null,
      title: 'Mr',
      documentUpload: '',
      drivingLicenceNumber: '',
      drivingLicenceNumberIssuedDate: null,
      passportExpireDate: null,
      drivingLicenceExpireDate: null,
      salName: ' Nooruddin',
      spouseName: '',
      idNumber: '',
      address: '',
      addressTwo: '',
      addressThree: '',
    },
    employmentDetailDTO: {
      dateOfJoined: '2026-02-01',
      confirmationdueon: '2026-02-11',
      id: null,
      employmentDetailEmpId: null,
      personalGrade: '2',
      corporateTitle: '',
      designation: '',
      functionalRole: '',
      costCenter: 'Head office-finance',
      groupJoinedDate: null,
      joinedDate: null,
      isWagesBoard: '',
      isShopAndOffice: '',
      employeeType: 'Probation',
      startDate: null,
      endDate: null,
      statutoryClassification: '',
      employeeCategory: '',
      employeeGroup: '',
      barcodeNo: '',
      isTimeAndAttendanceActive: '',
      payrollNo: '',
      isPayRollActive: '',
      isConfirm: '',
      isProbation: '',
      dateOfConfirmation: null,
      dateOfConfirmed: null,
      contractToPermanentDate: null,
      isContractToPermanent: '',
      jobPreference: '',
      jobPreferenceLocation: '',
      jobPreferenceSubLocation: '',
      location: '',
      exitDate: null,
      dateOfRetirement: null,
      exitType: '',
      reasonForLeave: '',
      workShipCategoryId: 'NORMAL',
      guarantorDepositAmount: '',
      empNumber,
      epfNumber,
      etfNumber: epfNumber,
      isResignedTerrminated: 'RESIGNED',
      organizationDetails: '26-025',
      department: '2-IT',
      priorNotiePeriod: 'THREE MONTH',
    },
    employeePositionDTOS: [
      {
        id: null,
        employmentDetailEmpId: null,
        jobCategory: 'TEMPORARY',
        currentDesignation: 'fat',
        reportingPerson: '',
        dateofDesignation: '2026-02-11',
        endDate: null,
        currentEmployment: true,
      },
    ],
    locationDetailsDTOS: [
      {
        id: null,
        employmentDetailEmpId: null,
        permanenetLocation: 'Head office ',
        temporaryLocation: '',
        fromDate: '2026-02-11',
        toDate: '2026-02-21',
      },
    ],
    contactDetailDTO: {
      id: null,
      contactDetailEmpId: '',
      permanentHouseNo: '',
      permanentEmail: 'waseemnooruddin@gmail.com',
      permanentStreet1: '',
      permanentStreet2: '',
      permanentCountry: '',
      permanentProvince: 'North Central',
      permanentCityOrTown: 'Giritale',
      permanentDistrict: 'Polonnaruwa',
      permanentPostalCode: '51026',
      permanentElectorate: '',
      permanentTelephone: '',
      permanentDsDivision: '',
      permanentMobile: '0766395531',
      permanentFax: '',
      permanentGnDivision: '',
      workingHouseNo: '',
      workingEmail: '',
      workingStreet1: '',
      workingStreet2: '',
      workingCountry: '',
      workingProvince: '',
      workingCityOrTown: '',
      workingDistrict: '',
      workingPostalCode: '',
      workingElectorate: '',
      workingTelephone: '',
      workingDsDivision: '',
      workingMobile: '',
      workingFax: '',
      workingGnDivision: '',
      officialGeneralLine: '',
      officialDirectLineExtension: '',
      officialMobileNo: '',
      officialEMail: 'waseemnooruddin@gmail.com',
      emergencyGeneralLine: '',
      emergencyDirectLineExtension: '',
      emergencyMobileNo: '0766395535',
      emergencyEMail: '',
      blogOrWeb: '',
      linkedInLink: '',
      skypeId: '',
      faceBookLink: '',
      twitter: '',
      privateAddressLine1: '150 Railway Road Udahamulla, Nugegoda.',
      privateAddressLine2: '',
      privateAddressLine3: 'Nugegoda',
      cityTown: 'Giritale',
      district: 'Polonnaruwa',
      postalCode: '51026',
      residentialprovince: 'North Central',
      electorate: '',
      distanceToWorkplace: '',
      email: 'waseemnooruddin@gmail.com',
      mobile: '0766395531',
      fax: '',
      telephone: '',
      permanentPrivateAddressLine1: '150 Railway Road Udahamulla, Nugegoda.',
      permanentPrivateAddressLine2: '02 Nawam Mawatha',
      permanentPrivateAddressLine3: 'Nugegoda',
      permanantdistanceToWorkplace: '',
      emergrncyName: 'asma',
      emergrncyRelationship: 'mom',
      emergencyTelephone: '0766395545',
      residentialOrPermanantAddrs: '',
    },
    qualificationDTOS: [
      {
        id: null,
        qualificationEmpId: null,
        qualificationType: 'Education qualification',
        qualification: 'Dip',
        school: '',
        highestQualifications: '',
        status: '',
        fieldofstudy: '',
        durationOfCource: 'THREE YEAR',
        yearOfQualification: '',
        notjobRelated: '',
        comments: '',
        documentUpload: '',
        expertiseDomain: '',
        expertiseArea: '',
        description: '',
        qualificationsEffectiveStartDate: null,
        qualificationsEffectiveEndDate: null,
      },
    ],
    manageExpertiseProfileDTOS: [],
    employeeDocRefDTOS: [
      {
        docDesc: 'Profile Picture',
        requiredDoc: 'YES',
        docUploadStatus: 'YES',
        document: 'Gemini_Generated_Image_wyvqpfwyvqpfwyvq.png',
        isUploaded: true,
        uploadedType: 'image/png',
        backendId: 619,
        base64: null,
        orderById: '1',
      },
      {
        docDesc: 'Birth Certificate ',
        requiredDoc: 'NO',
        docUploadStatus: 'NO',
        document: 'Documents',
        isUploaded: false,
        uploadedType: null,
        backendId: null,
        base64: null,
        orderById: '2',
      },
      {
        docDesc: 'Curriculum Vitae',
        requiredDoc: 'NO',
        docUploadStatus: 'NO',
        document: 'Documents',
        isUploaded: false,
        uploadedType: null,
        backendId: null,
        base64: null,
        orderById: '3',
      },
      {
        docDesc: 'NIC Copy',
        requiredDoc: 'YES',
        docUploadStatus: 'YES',
        document: 'Gemini_Generated_Image_inajq2inajq2inaj.png',
        isUploaded: true,
        uploadedType: 'image/png',
        backendId: 620,
        base64: null,
        orderById: '4',
      },
      {
        docDesc: 'Driving License',
        requiredDoc: 'NO',
        docUploadStatus: 'NO',
        document: 'Documents',
        isUploaded: false,
        uploadedType: null,
        backendId: null,
        base64: null,
        orderById: '5',
      },
      {
        docDesc: 'Degree Certificate',
        requiredDoc: 'NO',
        docUploadStatus: 'NO',
        document: 'Documents',
        isUploaded: false,
        uploadedType: null,
        backendId: null,
        base64: null,
        orderById: '6',
      },
      {
        docDesc: 'Police Report',
        requiredDoc: 'NO',
        docUploadStatus: 'NO',
        document: 'Documents',
        isUploaded: false,
        uploadedType: null,
        backendId: null,
        base64: null,
        orderById: '7',
      },
    ],
    employeeSalaryDetail: {
      id: null,
      basicAmount: '',
      totalPackage: null,
      employeeId: '',
      allowanceMasterId: null,
      amount: '',
      employeeNominatedRefs: [
        {
          id: null,
          fullName: 'Nooruddin',
          relationship: 'MOTHER',
          nic: '199029810097',
          percentage: '100',
          employeeId: '',
          employeeSalaryDetailId: '',
        },
      ],
      allowanceDetails: [
        {
          id: null,
          basicAmount: '150000.00',
          employeeId: null,
          allowanceTblId: null,
          allowanceMasterId: 2,
          allowanceCode: 'C002',
          allowanceDec: 'TV ALLOWANCE',
          isFixedAllowance: true,
          epfFlag: 'YES',
          status: '',
          amount: '120000.00',
          isFixedAllowanceDisplay: 'YES',
        },
      ],
      fixedAllowance: false,
    },
    bankAccountDTOS: [
      {
        id: null,
        bankId: '7083',
        bankName: 'Hatton National Bank PLC',
        branchName: 'Green Path',
        accountNo: '199956',
        nameGivenToBank: 'commercial bank',
        accountType: 'SAVING ACCOUNT',
        amountPercentageOrder: '',
        startDate: null,
        endDate: null,
        isActive: 'ACTIVE',
        deleteYes: '',
        employeeId: null,
        branchCode: '5',
        bankCode: '7083',
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('HRMS Employee Creation – Update Employee Data API', () => {
  let request: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'content-type': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  test('should successfully submit employee creation payload (PATCH)', async () => {
    // Generate dynamic values – mirrors Postman pre-request script
    const empNumber = generateNumericId(5);
    const epfNumber = empNumber;
    const nicNo = generateNIC();

    console.log(`Generated empNumber: ${empNumber}`);
    console.log(`Generated nicNo:     ${nicNo}`);

    const payload = buildPayload(empNumber, epfNumber, nicNo);

    const response = await request.patch(ENDPOINT, {
      data: payload,
    });

    // Log response for debugging
    const body = await response.text();
    console.log(`Response status: ${response.status()}`);
    console.log(`Response body:   ${body}`);

    // Assert success status (2xx)
    expect(
      response.ok(),
      `Expected 2xx but got ${response.status()}: ${body}`
    ).toBeTruthy();

    // Capture employee ID from response
    try {
      const responseJson = JSON.parse(body);
      const employeeId = responseJson?.id || responseJson?.employeeId || responseJson?.data?.id || responseJson?.personalDetailDTO?.id;
      const empId = responseJson?.personalDetailDTO?.empId;
      
      if (employeeId || empId) {
        if (employeeId) console.log(`✓ Captured Employee ID: ${employeeId}`);
        if (empId) console.log(`✓ Captured EmpId: ${empId}`);
        
        // Save employee ID and empId to JSON file
        const resourcesDir = 'C:\\Users\\WaseemNooruddin\\IdeaProjects\\Edcs-User Registration_QA - Regraession Testing - 3\\src\\tests\\resources';
        if (!fs.existsSync(resourcesDir)) {
          fs.mkdirSync(resourcesDir, { recursive: true });
        }
        
        const filePath = path.join(resourcesDir, 'employee.json');
        const employeeData = { 
          employeeId: employeeId || null,
          empId: empId || null
        };
        fs.writeFileSync(filePath, JSON.stringify(employeeData, null, 2));
        console.log(`✓ Employee data saved to: ${filePath}`);
      } else {
        console.log(`⚠ Employee ID not found in response. Response structure:`, JSON.stringify(responseJson, null, 2));
      }
    } catch (e) {
      console.log(`⚠ Failed to parse response as JSON:`, e);
    }
  });

  test('NIC should be exactly 9 digits', () => {
    const nic = generateNIC();
    expect(nic).toMatch(/^\d{9}$/);
  });

  test('empNumber should be exactly 5 digits', () => {
    const id = generateNumericId(5);
    expect(id).toMatch(/^\d{5}$/);
  });

  test('payload should contain required top-level keys', () => {
    const payload = buildPayload('12345', '12345', '991234567');
    const requiredKeys = [
      'personalDetailDTO',
      'employmentDetailDTO',
      'employeePositionDTOS',
      'locationDetailsDTOS',
      'contactDetailDTO',
      'qualificationDTOS',
      'employeeDocRefDTOS',
      'employeeSalaryDetail',
      'bankAccountDTOS',
    ];
    for (const key of requiredKeys) {
      expect(payload).toHaveProperty(key);
    }
  });
});