import { Page, Locator, expect } from "@playwright/test";

export class AssignMultipleBranches {
  constructor(private readonly page: Page) {}

  async navigateToAssignMultipleBranches(): Promise<void> {
    await this.page
      .getByRole("button", { name: "Assign Multiple Branches" })
      .click();
  }

  async selectUserId() {
    const userIdInput = this.page.locator("#root_userId input");

    await userIdInput.click();
  }

  async waitUntillUserId() {
    const userIdInput = this.page.getByRole("option");

    await userIdInput.hover();
  }

  async selectUser(loginId: string) {
    await this.page
      .getByRole("option")
      .filter({ hasText: loginId })
      .first()
      .click();
  }

  // async addNewButton() {
  //   const addNewButton = this.page.getByRole("button", { name: "Add New" });
  //   await addNewButton.click();
  // }

  async selectBranchDeptId() {
    await this.page.locator("#root_brachDeptId").click();
  }

  // async slectBranch(value: string) {
  //   const listbox = this.page.getByRole("listbox");
  //   await expect(listbox).toBeVisible();

  //   const options = listbox.getByRole("option");
  //   await expect(options.first()).toBeVisible();

  //   const count = await options.count();

  //   if (count === 0) {
  //     console.log("No options available to select.");
  //   } else {
  //     const randomIndex = Math.floor(Math.random() * count);
  //     const selectedOption = options.nth(randomIndex);

  //     const selectedText = await selectedOption.textContent();
  //     console.log(`Randomly selected: ${selectedText}`);

  //     await selectedOption.click();
  //   }
  // }

  async selectBranch(value: string) {
    await this.page.getByRole("option", { name: value }).first().click();
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async deleteData() {
    await this.page.getByRole("button", { name: "Delete" }).click();
    await this.page.getByRole("button", { name: "Continue" }).click();
  }

  async verifyAssignMultipleBranchesHeading() {
    const heading = this.page.getByRole("heading", {
      name: "Assign Multiple Branches",
      level: 3,
    });

    await expect(heading).toBeVisible();
  }

  async verifyDefaultDivision(expectedDivision: string) {
    const divisionDropdown = this.page.locator("#root_defaultBranch");

    await expect(divisionDropdown).toBeVisible();
    await expect(divisionDropdown).toHaveText(expectedDivision);
  }

  async verifyDivisionsCardLoaded() {
    // Scope to the specific card containing "Divisions Details"
    const divisionsCard = this.page.locator(".MuiCard-root").filter({
      has: this.page.locator(".MuiCardHeader-title p", {
        hasText: "Divisions Details",
      }),
    });

    const cardTitle = divisionsCard.locator(".MuiCardHeader-title p");
    const collapsePanel = divisionsCard.locator(".MuiCollapse-entered");
    const table = divisionsCard.locator('table[aria-label="simple table"]');

    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText("Divisions Details");
    await expect(collapsePanel).toBeVisible();
    await expect(table).toBeVisible();
  }

  async addNewButton() {
    const divisionsCard = this.page.locator(".MuiCard-root").filter({
      has: this.page.locator(".MuiCardHeader-title p", {
        hasText: "Divisions Details",
      }),
    });

    const addNewButton = divisionsCard.locator("button.iil-btn--success");

    await expect(addNewButton).toBeVisible();
    await expect(addNewButton).toBeEnabled();
    await addNewButton.click();
  }

  async verifyDivisionsCardPopUpLoaded() {
    const cardTitle = this.page.getByRole("heading", {
      name: "Division Details",
      level: 1,
    });

    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText("Division Details");
  }

  async fillToDate(date: string) {
    await this.page.locator("#root_to").fill(date);
  }

  async clickEditForRow(branchName: string) {
    await this.page
      .locator("button.orgHierachy-lvlConfigList__actionBtn")
      .first()
      .click();
  }

  async clickDeleteForRow(branchName: string) {
    await this.page.locator('button[title="Delete"]').first().click();
  }
}
