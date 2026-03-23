import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async navigateToLoginPage() {
    await this.page.goto("");
  }

  async login(username: string, password: string) {
    await this.page.fill("#root_email", username);
    await this.page.fill("#root_password", password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }

    async loginPage(username: string, password: string) {

  }

  async loginWithchangePassword(username: string, password: string, location: string) {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.locator("#root_currentPassword").fill(username);
    await this.page.locator("#root_newPassword").fill(password);
    await this.page.locator("#root_reNewPassword").fill(password);
    await this.page.getByRole('button', { name: 'Reset Password' }).click();
  }

  // async SelectYourBranch(location: string) {
  //   await this.page.click("#demo-simple-select-outlined");
  //   await this.page.getByRole("option", { name: location }).first().click();
  //   await this.page.getByRole("button", { name: "Submit" }).click();
  // }

  async selectRandomBranchAndVerify() {
    // 1️⃣ Open dropdown
    await this.page.click("#demo-simple-select-outlined");

    const options = this.page.getByRole("option");
    await options.first().waitFor({ state: "visible" });

    const count = await options.count();
    if (count === 0) throw new Error("No branch options available");

    // 2️⃣ Pick random option
    const randomIndex = Math.floor(Math.random() * count);
    const randomOption = options.nth(randomIndex);

    // 3️⃣ Capture text BEFORE clicking
    const selectedBranch = (await randomOption.innerText()).trim();

    // 4️⃣ Select branch
    await randomOption.scrollIntoViewIfNeeded();
    await randomOption.click();

    // 5️⃣ Submit
    await this.page.getByRole("button", { name: "Submit" }).click();

    console.log("Selected Branch:", selectedBranch);

    // // 6️⃣ Verify in table
    // const cell = this.page.getByRole("cell", { name: selectedBranch }).first();
    // await expect(cell).toBeVisible();

    return selectedBranch;
  }

  async getErrorMessage(): Promise<string> {
    return (
      (await this.page.locator('//h3[@data-test="error"]').textContent()) ?? ""
    );
  }
}
