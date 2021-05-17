import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from './../courses.module';
import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { setupCourses } from '../common/setup-test-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CourseCardListComponent', () => {

  let component: CoursesCardListComponent;

  // common test like(instance, debugging)
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  // async wait for any async operation trigger
  beforeEach(waitForAsync (() => {

    TestBed.configureTestingModule({
      // declarations: []
      imports: [CoursesModule]
    })
      .compileComponents()
      .then(() => {
        // setup
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
    
  }));

  it('should create the component', () => {
    
    expect(component).toBeTruthy();
  
  });

  it('should display the course list', () => {
    
    component.courses = setupCourses();
    fixture.detectChanges();  // apply changes to the DOM

    // console.log(el.nativeElement.outerHTML);

    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of course")
  });

  it('should display the first name', () => {

    component.courses = setupCourses();

    fixture.detectChanges();

    const course = component.courses[0];
    
    const 
      card = el.query(By.css(".course-card:first-child")),
      title = el.query(By.css("mat-card-title")),
      image = el.query(By.css("img"));
    
    expect(card).toBeTruthy('Could not find the course card');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });

})