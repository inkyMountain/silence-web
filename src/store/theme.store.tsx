import {action, observable} from 'mobx';

interface GlobalTheme {
  deepGray: string;
  lightGray: string;
}

type ValueOf<T> = T[keyof T]

class GlobalThemeStore {
  @observable
  globalTheme: GlobalTheme = {
    deepGray: '#666',
    lightGray: '#f2f2f2'
  };

  @action
  updateGlobalTheme = (key: keyof GlobalTheme, value: ValueOf<GlobalTheme>) => {
    this.globalTheme[key] = value;
  };
}

export default new GlobalThemeStore();
