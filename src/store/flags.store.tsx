import {observable, IObservableValue, action} from 'mobx';

type Tab = IObservableValue<'playlist' | 'recommend'>

class FlagsStore {
  @observable
  currentTab: Tab = observable.box('recommend');

  @action
  setCurrentTab(tab: 'recommend' | 'playlist') {
    this.currentTab.set(tab);
  }
}

export default new FlagsStore();
