import { Page, Locator, expect } from "@playwright/test";

export class EmployeeRegistration {
  private readonly registerEmployeeBtn: Locator;
  private readonly addNewBtn: Locator;
  private readonly titleDropdown: Locator;
  private readonly fullNameInput: Locator;
  private readonly surNameInput: Locator;
  private readonly salutationInput: Locator;
  private readonly genderDropdown: Locator;
  private readonly dobInput: Locator;
  private readonly placeOfBirthInput: Locator;
  private readonly bloodGroupDropdown: Locator;

  constructor(private readonly page: Page) {
    this.registerEmployeeBtn = page.getByRole("button", {
      name: "Register Employee",
    });

    this.addNewBtn = page.getByRole("button", { name: "Add New" });

    this.titleDropdown = page.locator("#root_title");
    this.fullNameInput = page.locator("#root_fullName");
    this.surNameInput = page.locator("#root_surName");
    this.salutationInput = page.locator("#root_salName");
    this.genderDropdown = page.locator("#root_gender");
    this.dobInput = page.locator("#root_dob");
    this.placeOfBirthInput = page.locator("#root_placeOfBirth");
    this.bloodGroupDropdown = page.locator("#root_bloodGroup");
  }

  async clickRegisterEmployee(): Promise<void> {
    await expect(this.registerEmployeeBtn).toBeVisible();
    await this.registerEmployeeBtn.click();
  }

  async clickEmployeeRegistrationAddNew(): Promise<void> {
    await expect(this.addNewBtn).toBeEnabled();
    await this.addNewBtn.click();
  }

  async enterEmployeeTitle(title: string): Promise<void> {
    await this.titleDropdown.click();
    await this.page.getByRole("option", { name: title }).click();
  }

  async enterFullName(fullName: string): Promise<void> {
    await expect(this.fullNameInput).toBeVisible();
    await this.fullNameInput.fill(fullName);
  }

  async enterSurName(surName: string): Promise<void> {
    await expect(this.surNameInput).toBeVisible();
    await this.surNameInput.fill(surName);
  }

  async enterSalutation(salutation: string): Promise<void> {
    await this.salutationInput.fill(salutation);
  }

  async selectGender(gender: string): Promise<void> {
    await this.genderDropdown.click();
    await this.page.getByRole("option", { name: gender }).click();
  }

  async enterDOB(dob: string): Promise<void> {
    await this.dobInput.fill(dob);
  }

  async enterPlaceOfBirth(place: string): Promise<void> {
    await this.placeOfBirthInput.fill(place);
  }

  async selectBloodGroup(bloodGroup: string): Promise<void> {
    await this.bloodGroupDropdown.click();
    await this.page.getByRole("option", { name: bloodGroup }).click();
  }
}