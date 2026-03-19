import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { credentials } from "../resources/credentials";
import { testdata } from "../resources/testdata";
import { emplyeedata } from "../resources/emplyeedata";
import { NavBarPage } from "../../pages/navbar.page";
import { BranchDeptMappingPage } from "../../pages/branchdeptmapping.page";
import { AssignMultipleBranches } from "../../pages/assign.multiple.branches.page";

test.describe("Assign Multipl eBranches", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });
  test(
    "Verify Assign Multiple Branches page loads successfully",
    { tag: ["@regression", "@TC_001", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
    },
  );
  test(
    "Verify user can select a Login ID",
    { tag: ["@regression", "@TC_002", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
    },
  );

  test(
    "Verify default division is displayed correctly",
    { tag: ["@regression", "@TC_003", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.verifyDefaultDivision(
        testdata.Branch.Branch,
      );
    },
  );

  test(
    "Verify division details grid loads successfully",
    { tag: ["@regression", "@TC_004", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.verifyDivisionsCardLoaded();
    },
  );

  test(
    "Verify Add New button opens Division Details popup",
    { tag: ["@regression", "@TC_005", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.addNewButton();
      await assignMultipleBranches.verifyDivisionsCardPopUpLoaded();
    },
  );

  test(
    "Verify user can add a new division successfully",
    { tag: ["@regression", "@TC_006", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.addNewButton();
      await assignMultipleBranches.selectBranchDeptId();
      await assignMultipleBranches.selectBranch(testdata.Branch.Branch);
      await assignMultipleBranches.fillToDate(testdata.Date.Date);
      await assignMultipleBranches.clickSaveButton();
    },
  );

  test(
    "Verify saved division details are displayed correctly",
    { tag: ["@regression", "@TC_007", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.verifyDivisionsCardLoaded();
    },
  );

  test(
    "Verify user can edit an existing division",
    { tag: ["@regression", "@TC_008", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.clickEditForRow(testdata.Branch.Branch);
      await assignMultipleBranches.clickSaveButton();
    },
  );

  test(
    "Verify user can delete a division",
    { tag: ["@regression", "@TC_009", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToAssignMultipleBranches();
      const assignMultipleBranches = new AssignMultipleBranches(page);
      await assignMultipleBranches.verifyAssignMultipleBranchesHeading();
      await assignMultipleBranches.selectUserId();
      await assignMultipleBranches.selectUser(testdata.userDetails.selectUser);
      await assignMultipleBranches.clickDeleteForRow(testdata.Branch.Branch);
    },
  );

  

});
