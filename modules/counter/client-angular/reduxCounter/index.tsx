import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import CounterModule from '../CounterModule';
import { reducer } from './reducers';
import { ReduxCounterButtonComponent, ReduxCounterViewComponent } from './components/ReduxCounterView';

@NgModule({
  imports: [CommonModule],
  declarations: [ReduxCounterButtonComponent, ReduxCounterViewComponent],
  exports: [ReduxCounterButtonComponent, ReduxCounterViewComponent]
})
class ReduxCounterModule {}

export default new CounterModule({
  reducer: [{ counter: reducer }],
  counterModule: [ReduxCounterModule]
});