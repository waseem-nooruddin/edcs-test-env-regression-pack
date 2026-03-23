import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { credentials } from "../resources/credentials";
import { testdata } from "../resources/testdata";
import { emplyeedata } from "../resources/emplyeedata";
import { NavBarPage } from "../../pages/navbar.page";
import { BranchDeptMappingPage } from "../../pages/branchdeptmapping.page";

test.describe("Branch Dept Mapping", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test(
    "Verify Branch Dept/Div Mapping page loads successfully",
    { tag: ["@regression", "@TC_001", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();
    },
  );

  test(
    "Verify Branch dropdown displays available branches",
    { tag: ["@regression", "@TC_002", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.IsListOfAllExpectedBranches();
    },
  );

  test(
    "Verify selecting a branch loads mapped Dept/Div records",
    { tag: ["@regression", "@TC_003", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.verifyRandomBranchInTable();
    },
  );

  test(
    "Verify Branch Details grid columns are displayed correctly",
    { tag: ["@regression", "@TC_004", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.verifyAllBranchOccurrences(
        testdata.Branch.Branch,
      );
    },
  );

  test(
    "Verify existing Dept/Div mappings are listed",
    { tag: ["@regression", "@TC_005", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.verifyAllBranchOccurrences(
        testdata.Branch.Branch,
      );
    },
  );

  test(
    "Verify “Add New” button visibility and enablement",
    { tag: ["@regression", "@TC_006", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.verifyAddNewButtonVisible();
    },
  );

  test(
    "Verify clicking “Add New” opens Dept/Div Details modal",
    { tag: ["@regression", "@TC_007", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.AddNewButtonVisible();
      await branchDeptMappingPage.verifyDeptDivDetailsHeading();
    },
  );

  test(
    "Verify Dept/Div dropdown displays available departments/divisions",
    { tag: ["@regression", "@TC_008", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.AddNewButtonVisible();
      await branchDeptMappingPage.selectDeptDivDropdwon();
      await branchDeptMappingPage.verifyDepartmentListLoaded();
    },
  );

  test(
    "Verify user can select a Dept/Div successfully",
    { tag: ["@regression", "@TC_009", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.AddNewButtonVisible();
      await branchDeptMappingPage.selectDeptDivDropdwon();
      await branchDeptMappingPage.verifyDepartmentListLoaded();
      await branchDeptMappingPage.verifySaveButtonVisible();
    },
  );

  test(
    "Verify Save button creates new Branch–Dept/Div mapping",
    { tag: ["@regression", "@TC_010", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.AddNewButtonVisible();
      await branchDeptMappingPage.selectDeptDivDropdwon();
      await branchDeptMappingPage.verifyDepartmentListLoaded();
      await branchDeptMappingPage.clickSaveButton();
    },
  );

  test(
    "Verify Edit icon is visible for each mapping",
    { tag: ["@regression", "@TC_011", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.verifyAllBranchOccurrences(
        testdata.Branch.Branch,
      );
    },
  );

  test(
    "Verify clicking Edit opens modal with selected mapping",
    { tag: ["@regression", "@TC_012", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.clickFirstEditButton();
      await branchDeptMappingPage.verifyDeptDivDetailsHeading();
    },
  );

  test(
    "Verify updating Dept/Div and saving reflects changes",
    { tag: ["@regression", "@TC_013", "@positive"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.clickFirstEditButton();
      await branchDeptMappingPage.verifyDeptDivDetailsHeading();
      await branchDeptMappingPage.clickSaveButton();
    },
  );

  test(
    "Verify Save button behavior without selecting Dept/Div",
    { tag: ["@regression", "@TC_015", "@negative"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.AddNewButtonVisible();
      await branchDeptMappingPage.verifyDeptDivDetailsHeading();
      await branchDeptMappingPage.clickSaveButton();
      await branchDeptMappingPage.verifyRequiredFieldError();
    },
  );

  test(
    "Verify Save without changing Dept/Div",
    { tag: ["@regression", "@TC_017", "@negative"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.clickFirstEditButton();
      await branchDeptMappingPage.verifyDeptDivDetailsHeading();
      await branchDeptMappingPage.clickSaveButton();
    },
  );

  test(
    "Verify Delete operation when only one mapping exists",
    { tag: ["@regression", "@TC_018", "@negative"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.clickFirstDeleteButton();
      await branchDeptMappingPage.verifyDeleteConfirmationMessage();
    },
  );

  test(
    "Verify Delete operation at maximum mapping count",
    { tag: ["@regression", "@TC_018", "@negative"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      await branchDeptMappingPage.selectAssignDepttoBranch();
      await branchDeptMappingPage.selectABranch();
      await branchDeptMappingPage.clickFirstDeleteButton();
      await branchDeptMappingPage.verifyDeleteConfirmationMessage();
      await branchDeptMappingPage.verifyContinueButtonVisible();
    },
  );

  test(
    "Verify page title and breadcrumb display",
    { tag: ["@regression", "@TC_020", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify left navigation menu highlighting",
    { tag: ["@regression", "@TC_021", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify Branch dropdown label and alignment",
    { tag: ["@regression", "@TC_022", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify Branch Details section visibility",
    { tag: ["@regression", "@TC_023", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify grid column headers alignment",
    { tag: ["@regression", "@TC_024", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify modal title and layout",
    { tag: ["@regression", "@TC_025", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify Dept/Div dropdown label and spacing",
    { tag: ["@regression", "@TC_026", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify Save and Cancel button alignment",
    { tag: ["@regression", "@TC_027", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );

  test(
    "Verify Save button color and emphasis",
    { tag: ["@regression", "@TC_028", "@UI"] },
    async ({ page }) => {
      await loginPage.login(
        credentials.admin2.username,
        credentials.admin2.password,
      );
      const navBarpage = new NavBarPage(page);
      await navBarpage.clickOnTheBranchDeptMappingPage();
      const branchDeptMappingPage = new BranchDeptMappingPage(page);
      await branchDeptMappingPage.selectBranchDepartmentMappingPage();
      const pageHeader = page.getByRole("heading", {
        name: "Branch - Dept/Div Mapping",
        level: 3,
      });
      await expect(pageHeader).toBeVisible();

      const BranchDepartmentMapping = page.locator(
        "//main[@class='jss11 jss13']",
      );

      // Mask dynamic elements like footer, timestamps, or logos
      const screenshotBuffer = await BranchDepartmentMapping.screenshot({
        mask: [
          page.locator("footer"),
          page.locator("Branch Department Mapping.png"),
        ],
      });

      // Allow a small tolerance for minor pixel differences
      expect(screenshotBuffer).toMatchSnapshot(
        "Branch Department Mapping.png",
        {
          maxDiffPixelRatio: 0.02,
        },
      );
    },
  );
});
