import { Page, Locator, expect } from "@playwright/test";

export class BranchDeptMappingPage {
  constructor(private readonly page: Page) {}

  async selectBranchDepartmentMappingPage() {
    await this.page
      .getByRole("button", { name: "Branch Department Mapping" })
      .click();
  }
  async selectAssignDepttoBranch() {
    // Click the Branch dropdown to expand options
    await this.page.locator("#root_branchId").click();
  }

  async IsListOfAllExpectedBranches() {
    // List of all expected branches
    const expectedBranches = [
      "Head Office - 999-HO",
      "Matara - Matara",
      "Galle - Galle",
      "Kandy - Kandy",
      "Matale - Matale",
      "Nuwara-Eliya - Nuwara-Eliya",
      "Trincomalee - Trincomalee",
      "Batticaloa - Batticaloa",
      "Ampara - Ampara",
      "Jaffna - Jaffna",
      "Kilinochchi - Kilinochchi",
      "Mannar - Mannar",
      "Mullaitivu - Mullaitivu",
      "Vavniya - Vavniya",
      "Colombo - 001",
      "Gampaha - 002",
      "Kalutara001 - Kalutara",
      "Kurunegala - Kurunegala",
      "Puttalama - Puttalama",
      "Polonnaruwa - Polonnaruwa",
      "Anuradhapura - Anuradhapura",
      "Badulla - Badulla",
      "Moneragala - Moneragala",
      "Ratnapura - 056",
      "Kegalle - 028",
      "Hambantota - Hambantota",
    ];

    // Iterate and verify each branch is visible
    for (const branch of expectedBranches) {
      await this.page
        .getByRole("option", { name: branch })
        .scrollIntoViewIfNeeded();
      await expect(
        this.page.getByRole("option", { name: branch }),
      ).toBeVisible();
    }
  }

  async selectABranch() {
    const galleOption = this.page.getByRole("option", {
      name: "Kandy - Kandy",
    });
    await galleOption.click();
  }

  async verifyBranchInTable(branchName: string) {
    // Pick the first table cell matching the branch name
    const cell = this.page.getByRole("cell", { name: branchName }).first();

    // Verify it's visible
    await expect(cell).toBeVisible();
  }

  async verifyAllBranchOccurrences(branchName: string) {
    const cells = this.page.getByRole("cell", { name: branchName });
    const count = await cells.count();

    for (let i = 0; i < count; i++) {
      await expect(cells.nth(i)).toBeVisible();
    }
  }

  async verifyAddNewButtonVisible() {
    const addNewBtn = this.page.getByRole("button", { name: "Add New" });
    await expect(addNewBtn).toBeVisible();
  }

  async AddNewButtonVisible() {
    await this.page.getByRole("button", { name: "Add New" }).click();
  }

  async verifyDeptDivDetailsHeading() {
    const heading = this.page.getByRole("heading", {
      name: "Dept/Div Details",
      level: 1,
    });

    await expect(heading).toBeVisible();
  }

  async selectDeptDivDropdwon() {
    await this.page.locator("#root_departmentId").dblclick();
  }

  async verifyDepartmentListLoaded() {
    const options = this.page.getByRole("listbox").getByRole("option");
    await expect(options.first()).toBeVisible();
  }

  async verifySaveButtonVisible() {
    const saveBtn = this.page.getByRole("button", { name: "Save" });
    await expect(saveBtn).toBeVisible();
  }

  async clickFirstEditButton() {
    const editBtn = this.page.getByRole("button", { name: "Edit" }).first();
    await editBtn.click();
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async verifyRequiredFieldError() {
    const errorMsg = this.page.getByText("is a required property");
    await expect(errorMsg).toBeVisible();
  }

  async clickFirstDeleteButton() {
  const deleteBtn = this.page.getByRole('button', { name: 'Delete' }).first();
  await deleteBtn.click();
}

async verifyDeleteConfirmationMessage() {
  const dialog = this.page.getByRole('dialog');
  const message = dialog.getByText('Are you sure you want to delete?');

  await expect(message).toBeVisible();
}

async verifyContinueButtonVisible() {
  const continueBtn = this.page.getByRole('button', { name: 'Continue' });
  await expect(continueBtn).toBeVisible();
}

}
