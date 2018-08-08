import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CustomerComponentsPage, CustomerUpdatePage } from './customer.page-object';

describe('Customer e2e test', () => {
    let navBarPage: NavBarPage;
    let customerUpdatePage: CustomerUpdatePage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle()).toMatch(/storeApp.customer.home.title/);
    });

    it('should load create Customer page', () => {
        customerComponentsPage.clickOnCreateButton();
        customerUpdatePage = new CustomerUpdatePage();
        expect(customerUpdatePage.getPageTitle()).toMatch(/storeApp.customer.home.createOrEditLabel/);
        customerUpdatePage.cancel();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerUpdatePage.setFirstNameInput('firstName');
        expect(customerUpdatePage.getFirstNameInput()).toMatch('firstName');
        customerUpdatePage.setLastNameInput('lastName');
        expect(customerUpdatePage.getLastNameInput()).toMatch('lastName');
        customerUpdatePage.genderSelectLastOption();
        customerUpdatePage.setCityInput('city');
        expect(customerUpdatePage.getCityInput()).toMatch('city');
        customerUpdatePage.save();
        expect(customerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
