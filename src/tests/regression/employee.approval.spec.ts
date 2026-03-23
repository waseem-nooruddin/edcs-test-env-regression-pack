import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { credentials } from "../resources/credentials";
import { NavBarPage } from "../../pages/navbar.page";
import { EmployeeApprovePage } from "../../pages/employee.approve.page";
import { testdata } from "../resources/testdata";
import { UserAuthorization } from "../../pages/user.authorization.page";
import { UserManagementPage } from "../../pages/user.management.page";
import { emplyeedata } from "../resources/emplyeedata";
import * as fs from "fs";
import * as path from "path";
import {AssignMultipleBranches} from"../../pages/assign.multiple.branches.page";

test.describe("employee approval test", () => {
  let loginPage: LoginPage;
  let empId: string;

  test.beforeAll(async () => {
    // Load empId from employee.json
    const filePath = path.join(__dirname, '../resources/employee.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      empId = data.empId?.toString() || testdata.employeeIdentifiers.Employee_Number;
    } else {
      empId = testdata.employeeIdentifiers.Employee_Number;
    }
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test(
    "Verify employee approve",
    { tag: ["@regression", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.admin2.username,credentials.admin2.password);
      await page.waitForLoadState("networkidle");
      const navBarpage = new NavBarPage(page);
      await navBarpage.openHrmsModule();
      await navBarpage.clickActivateEmployeeAccount();
      await expect(
        page.getByRole("heading", { name: "Employee Approve" }),
      ).toBeVisible();
      const employeeApprovepage = new EmployeeApprovePage(page);
      await employeeApprovepage.searchEmployeeId(empId);
      await employeeApprovepage.clickApproveButton();
      await expect(page.getByText('Approve Confirm')).toBeVisible();
      await employeeApprovepage.clickApproveConfirm();
      await employeeApprovepage.clickApproveConfirmButton();

    },
  );

    test(
      "Verify assigning a valid user role",
      { tag: ["@regression", "@TC_02", "@positive"] },
      async ({ page }) => {
        await loginPage.login(credentials.admin2.username,credentials.admin2.password);
        const navBarpage = new NavBarPage(page);
        await navBarpage.clickUserManagement();
        await navBarpage.navigateToUserPage();
        const userManagementPage = new UserManagementPage(page);
        await userManagementPage.clickAddNewUser();
        await userManagementPage.enterLoginID(empId);
        await userManagementPage.clickValidateButton();
        await userManagementPage.enterUserRoleId();
        await userManagementPage.selectUserRoleId(testdata.roleConfiguration.User_Role_Id);
        await userManagementPage.enterSubmitButton();
      },
    );

    test(
        "Verify successful authorization of user",
        { tag: ["@regression","@positive"] },
        async ({ page }) => {
          await loginPage.login(credentials.admin2.username,credentials.admin2.password);
          const navBarpage = new NavBarPage(page);
          await navBarpage.clickUserManagement();
          const userAuthorization = new UserAuthorization(page);
          await navBarpage.clickUserAuthorization();
           await userAuthorization.searchingUser(empId)
          await userAuthorization.selectUserRole()
          // await expect(page.getByRole("button", { name: "Authorize" })).toBeVisible();
          //await userAuthorization.verifyPendingUser();
          await userAuthorization.authorizeUser();
        },
      );
    
      test(
    "Verified that all date fields have been cleaned.",
    { tag: ["@regression", "@alternative"] },
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

      // Locator for rows
      const rows = page.locator("table.MuiTable-root tbody tr");

      // Loop until no rows left
      while ((await rows.count()) > 0) {
        await assignMultipleBranches.deleteFirstRow();

        // Wait for UI to update after deletion
        await page.waitForTimeout(500); // better: replace with proper wait if possible
      }
    },
  );

});
