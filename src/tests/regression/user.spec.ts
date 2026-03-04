import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { ProductPage } from "../../pages/product.page";
import { UserManagementPage } from "../../pages/user.management.page";
import { credentials } from "../resources/credentials";
import { NavBarPage } from "../../pages/navbar.page";
import { testdata } from "../resources/testdata";

test.describe("User Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test(
    "Verify successful User ID validation and auto-fetch from HRMS",
    { tag: ["@regression", "@TC_01", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToUserPage();
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID(testdata.Employee_Number);
      const empNumber = await page.locator("#root_empNumber").inputValue();
      expect(empNumber).toBe("");
      await userManagementPage.clickValidateButton();
    },
  );

  test(
    "Verify assigning a valid user role",
    { tag: ["@regression", "@TC_02", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToUserPage();
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID(testdata.Employee_Number);
      await userManagementPage.clickValidateButton();
      await userManagementPage.enterUserRoleId();
      await userManagementPage.enterSubmitButton();
    },
  );

  test(
    "Verify system response for invalid User ID",
    { tag: ["@regression", "@TC_03", "@negative"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToUserPage();
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID(testdata.NegativeEmployee_Number);
      await userManagementPage.clickValidateButton();
      await expect(page.getByRole("heading")).toContainText("Error");
    },
  );

  test(
    "Validate mandatory error when User ID is blank",
    { tag: ["@regression", "@TC_04", "@negative"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToUserPage();
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID("");
      await expect(
        page.getByRole("button", { name: "Validate" }),
      ).toBeDisabled();
    },
  );

  test(
    "Validate the entered User ID and reassign the same role to the user.",
    { tag: ["@regression", "@TC_02", "@positive"] },
    async ({ page }) => {
      await loginPage.login(credentials.username, credentials.password);
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickUserManagement();
      await navBarpage.navigateToUserPage();
      const userManagementPage = new UserManagementPage(page);
      await userManagementPage.clickAddNewUser();
      await userManagementPage.enterLoginID(testdata.Employee_Number);
      await userManagementPage.clickValidateButton();
      await userManagementPage.enterUserRoleId();
      await userManagementPage.enterSubmitButton();
      await expect(page.getByRole("heading")).toContainText("Error");
    },
  );
});
