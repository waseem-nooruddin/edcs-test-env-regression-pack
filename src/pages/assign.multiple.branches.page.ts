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

  async addNewButton() {
    const addNewButton = this.page.getByRole("button", { name: "Add New" });
    await addNewButton.click();
  }

  async selectBranchDeptId() {
    await this.page.locator("#root_brachDeptId").click();
  }

  async slectBranch(value: string) {
    
    const listbox = this.page.getByRole('listbox');
await expect(listbox).toBeVisible();

const options = listbox.getByRole('option');
await expect(options.first()).toBeVisible();

const count = await options.count();

if (count === 0) {
  console.log('No options available to select.');
} else {
  const randomIndex = Math.floor(Math.random() * count);
  const selectedOption = options.nth(randomIndex);

  const selectedText = await selectedOption.textContent();
  console.log(`Randomly selected: ${selectedText}`);

  await selectedOption.click();
}
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async deleteData() {
    await this.page.getByRole("button", { name: "Delete" }).click();
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
