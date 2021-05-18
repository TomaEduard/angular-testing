import { tick, waitForAsync } from '@angular/core/testing';
import { fakeAsync, flush } from '@angular/core/testing';
import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';
import { CoursesModule } from './../courses.module';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { click } from '../common/test-utils';
describe('HomeComponent', () => {

  var originalTimeout: number;
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses()
    .filter(course => course.category == "BEGINNER");
  const advancedCourses = setupCourses()
    .filter(course => course.category == "ADVANCED");
  
  beforeEach(waitForAsync (() => {
    
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL; // setTimeout 
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000; // setTimeout 

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        // setup
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.get(CoursesService)
      })

  }));

  // setTimeout 
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only beginner courses', () => {

    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  });

  it('should display only advanced courses', () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  });

  it('should display both tabs', () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(2, "Unexpected number of tabs found");

  });
  
  // fakeAsync not support http request
  it('should display advanced courses when tab clicked - fakeAsync', fakeAsync(() => {
    
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    // el.nativeElement.click(tabs[1]);
    click(tabs[1]);

    fixture.detectChanges();

    // tick(16); // animation frame take 16ms
    flush(); // make sure all the tasks in the maintask/microtask queue are empty

    const cardTitles = el.queryAll(By.css(".mat-tab-body-active"));
  
    expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

  }));

  // alternative of fakeAsync, in waitForAsync not have acces to flush()
  // no have control of time(tick), microtasking/maintask
  // use waitForAsync for integration test with http call
  it("should display advanced courses when tab clicked - async", waitForAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    click(tabs[1]);

    fixture.detectChanges();

    fixture.whenStable().then(() => {

        console.log("called whenStable() ");

        const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

        expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

    });

  }));

});