import { Component } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';

import COUNTER_QUERY_CLIENT from '../graphql/CounterQuery.client.graphql';
import ADD_COUNTER_CLIENT from '../graphql/AddCounter.client.graphql';

@Component({
  selector: 'client-counter-button',
  template: `
    <button id="apollo-link-button" (click)="increaseCounter()">Click to increase apolloLinkState</button>
  `,
  styles: []
})
export class ClientCounterButtonComponent {
  constructor(private apollo: Apollo) {}

  public increaseCounter() {
    this.apollo
      .mutate({
        mutation: ADD_COUNTER_CLIENT,
        variables: {
          amount: 1
        }
      })
      .subscribe();
  }
}

@Component({
  selector: 'client-counter',
  template: `
    <section>
      <p>Client Counter Amount: {{ counter | async }}</p>
      <client-counter-button></client-counter-button>
    </section>
  `,
  styles: [
    `
      section {
        margin-bottom: 30px;
        text-align: center;
      }
    `
  ]
})
export class ClientCounterViewComponent {
  public counter: any;
  constructor(private apollo: Apollo) {}

  public ngOnInit() {
    this.counter = this.apollo
      .watchQuery<Query>({
        query: COUNTER_QUERY_CLIENT
      })
      .valueChanges.pipe(map((result: any) => result.data.clientCounter.amount));
  }
}