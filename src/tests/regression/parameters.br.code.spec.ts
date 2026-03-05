import {test,expect} from "@playwright/test"
import { LoginPage } from "../../pages/login.page";
import { ParametersBranchCodePage } from "../../pages/parameters.br.code.page";
import { credentials } from "../resources/credentials";

test.describe("Parameter Branch Code testing", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(credentials.username, credentials.password);

  //wait till sidebar loads
  await page.waitForSelector('div:has-text("Parameters")', 
    { state: "visible", timeout: 30000 });
  });
  
  test('Parameters branch code',async({page})=>{
    const parameterBranchCode = new ParametersBranchCodePage(page);

    //testcase 1
    await test.step("Open parameters dropdown", async () => {
      await parameterBranchCode.openParametersMenu();
    });

    await test.step("click branch code submenu", async () => {
      await parameterBranchCode.navigateToBranchCode();
    });

    await test.step("verify navigation to branch code page", async () => {
      await parameterBranchCode.verifyNavigationToBranchCode();
    }); 

    //testcase 2
    await test.step("Verify branch code grid columns", async () => {
      await parameterBranchCode.verifyBranchCodeGridColumns();
   });

   //testcase 3
  });
});
