import {action, observable} from 'mobx';

interface GlobalTheme {
  deepestGray: string;
  deeperGray: string;
  lighterGray: string;
  lightestGray: string;
}

type ValueOf<T> = T[keyof T]

class GlobalThemeStore {
  @observable
  globalTheme: GlobalTheme = {
    deepestGray: '#2f2f2f',
    deeperGray: '#666666',
    lighterGray: '#d7d7d7',
    lightestGray: '#f2f2f2'
  };

  @action
  updateGlobalTheme = (key: keyof GlobalTheme, value: ValueOf<GlobalTheme>) => {
    this.globalTheme[key] = value;
  };
}

export default new GlobalThemeStore();
