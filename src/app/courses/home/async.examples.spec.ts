import { delay } from 'rxjs/operators';
import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";

describe('Async Testing Example', () => {

  // with done and done()
  it('Asynchronous test example with Jasmine done()', (done: DoneFn)=> {
    
    let test = false;

    // ex. Async operations
    // animationFrame
    // ajax request
    // setInterval
    // etc...

    setTimeout(() => {

      console.log('running assertions', );

      test = true;

      expect(test).toBeTruthy();

      done();

    }, 1000);

  });

  // with fakeAsync
  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    
    let test = false;

    setTimeout(() => {});

    setTimeout(() => {

      console.log('running assertions setTimeout()', );

      test = true;

    }, 1000);

    // execute all the setTimeout Async zone
    // alternative of trick(sum of time passed)
    flush();

    expect(test).toBeTruthy();

  }));


  it('Asynchronous test example - Promise', fakeAsync(() => {
    
    let test = false;

    console.log('Creating promise', )

    Promise.resolve().then(() => {
      console.log('Promise #1 evaluated succesfully', )

      return Promise.resolve();

    }).then(() => {
      console.log('Promise #2 evaluated succesfully', )
      test = true;

    })

    flushMicrotasks();

    console.log('Running test assertions', )

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test example - Promise + setTimeout()', fakeAsync(() => {
    
    let counter = 0;

    Promise.resolve() // Microtask
      .then(() => {

        counter += 10;
        console.log('Promise', counter)
        
        setTimeout(() => { // Majortask

          console.log('setTimeout', counter)
          counter += 1;

        }, 1000);
      })

    expect(counter).toBe(0);
    
    flushMicrotasks(); // trigger Promis without setTimeout
    
    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);

  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {

    let test = false;

    console.log('Creating Observable', )

    const test$ =  of(test).pipe(delay(1000));

    test$.subscribe(() => {

      test = true;

    })

    tick(1000);

    console.log('Running test assertions', )

    expect(test).toBe(true);

  }));

  
});

