import { Page, Locator, expect } from "@playwright/test";
import { testdata } from "../tests/resources/testdata";

export class UserAuthorization {
  constructor(private readonly page: Page) {}

  async clickUserAuthorization(): Promise<void> {
    await this.page.getByRole("button", { name: "User Authorization" }).click();
  }

  async searchingUser(userId: string): Promise<void> {
    await this.page.locator("#outlined-basic").fill(userId);
  }

  async clicksearchButton(userId: string): Promise<void> {
    await this.page.getByRole("button", { name: "Search" }).click();
  }

    async selectUserRole(): Promise<void> {
    await this.page.locator("#root_departmentId").click();
    await this.page.getByRole('option', { name: '05' }).click();
  }

  async verifyUserAuthorizationPage(): Promise<boolean> {
    return await this.page
      .getByRole("heading", { name: "User Authorization" })
      .isVisible();
  }

  // async hoverPendingUser(): Promise<void> {
  //   await this.page.getByRole("row", { name: /Pending/i }).hover();
  // }

  async verifyPendingUser(): Promise<boolean> {
    return await this.page.getByRole("row", { name: /Pending/i }).isVisible();
  }

  async authorizeUser(): Promise<void> {
  // Get all rows
  const rows = this.page.getByRole("row");

  // Filter rows that contain "Pending" or "Pending authorization"
  const pendingRows = rows.filter({
    hasText: /Pending/,
  });

  // Ensure at least one exists
  await expect(pendingRows.first()).toBeVisible();

  // Pick a random row
  const count = await pendingRows.count();
  const randomIndex = Math.floor(Math.random() * count);
  const selectedRow = pendingRows.nth(randomIndex);

  // Scope inside the row → find authorize button
  const authorizeButton = selectedRow.locator('button[title="Authorize"], span[title="Authorize"] button');

  await expect(authorizeButton).toBeVisible();
  await expect(authorizeButton).toBeEnabled();

  await authorizeButton.click();
}


  async RejectUser(): Promise<void> {
    await this.page.getByRole("button", { name: "Cancel" }).first().click();
  }
}
